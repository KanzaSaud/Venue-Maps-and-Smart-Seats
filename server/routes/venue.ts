// server/routes/venue.ts
import { Router } from "express";

const router = Router();

router.get("/venues/:id/seats", (req, res) => {
  res.json({
    width: 1200,
    height: 800,
    seats: [
      {
        id: "A1",
        x: 120,
        y: 100,
        row: "A",
        number: 1,
        category: "vip",
        price: 15000,
        available: true
      },
      {
        id: "A2",
        x: 160,
        y: 100,
        row: "A",
        number: 2,
        category: "vip",
        price: 15000,
        available: false
      }
    ]
  });
});

export default router;
