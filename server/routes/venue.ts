// server/routes/venue.ts
import { Request, Response, Router } from "express";
import FormData from "form-data";
import fs from "fs";
import fetch from "node-fetch"; // if Node < 18, else native fetch
import multer from "multer";
import { db } from "../lib/db";

const router = Router();
const upload = multer({ dest: "../server/uploads/" });

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

// Type returned from Python API
interface PythonSeat {
  id: string;
  row: string;
  number: number;
  section: string;
  category: string;
  price: number;
  x: number;
  y: number;
  available: boolean;
}

interface PythonResponse {
  venue_id: string;
  seats: PythonSeat[];
  width: number;
  height: number;
}

// POST /api/venues/:id/process-image
router.post("/:id/process-image", upload.single("image"), async (req: MulterRequest, res: Response) => {
  try {
    const venueId = Number(req.params.id);
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Send image to Python API
    const formData = new FormData();
    formData.append("image", fs.createReadStream(req.file.path));

    const pythonResponse = await fetch(`http://localhost:8000/process-venue-image/${req.params.id}`, {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    // const aiData = await pythonResponse.json();
    // const aiData: PythonResponse = await pythonResponse.json();
    const aiData = (await pythonResponse.json()) as PythonResponse;

    if (!aiData.seats) {
      return res.status(500).json({ error: "Python API did not return seat data" });
        }

        // delete old seats
        await db.query("DELETE FROM seats WHERE venue_id = ?", [venueId]);

        for (const seat of aiData.seats) {
            await db.query(
                `INSERT INTO seats
     (venue_id, seat_code, seat_row, seat_number, section,
      category, price, x, y, available)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    venueId,
                    seat.id,
                    seat.row,
                    seat.number,
                    seat.section,
                    seat.category,
                    seat.price,
                    seat.x,
                    seat.y,
                    seat.available,
                ]
            );
        }

        res.json({
      status: "ok",
      message: "Seats processed and saved successfully",
      seats: aiData.seats,
    });
        // const data = await pythonResponse.json();
        // res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to process image" });
    }
});

router.get("venues/:id/seats", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const venueId = Number(req.params.id);

    const [rows] = await db.query(
      "SELECT * FROM seats WHERE venue_id = ?",
      [venueId]
    );

    res.json({
      width: 1200,
      height: 800,
      seats: rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch seats" });
  }
});


// GET /api/venues/:id/seats

// router.get("/venues/:id/seats", async (req, res) => {
//     const venueId = Number(req.params.id);

//   const [rows] = await db.query(
//     "SELECT * FROM seats WHERE venue_id = ?",
//     [venueId]
//   );

//   res.json({
//     width: 1200,
//     height: 800,
//     seats: rows,
//   });
// });

// router.get("/venues/:id/seats", (req, res) => {
//   res.json({
//     width: 1200,
//     height: 800,
//     seats: [
//       {
//         id: "A1",
//         x: 120,
//         y: 100,
//         row: "A",
//         number: 1,
//         category: "vip",
//         price: 15000,
//         available: true
//       },
//       {
//         id: "A2",
//         x: 160,
//         y: 100,
//         row: "A",
//         number: 2,
//         category: "vip",
//         price: 15000,
//         available: false
//       }
//     ]
//   });
// });


export default router;
