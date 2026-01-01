from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from db import get_db_connection

app = FastAPI()

# Allow requests from your frontend (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # adjust port if different
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_image(image_path: str):
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("Image not found or invalid")
    return img

def preprocess(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (9, 9), 1.5)
    return blur

def detect_seats(preprocessed_img):
    circles = cv2.HoughCircles(
        preprocessed_img,
        cv2.HOUGH_GRADIENT,
        dp=1.2,
        minDist=20,
        param1=50,
        param2=30,
        minRadius=5,
        maxRadius=15
    )

    if circles is None:
        return []

    circles = np.uint16(np.around(circles[0]))
    return circles

def normalize_seats(circles, img_width, img_height, svg_width=1200, svg_height=800):
    seats = []

    for (x, y, r) in circles:
        nx = int((x / img_width) * svg_width)
        ny = int((y / img_height) * svg_height)

        seats.append({
            "x": nx,
            "y": ny,
            "radius": r
        })

    return seats

from sklearn.cluster import KMeans

def assign_rows(seats):
    y_coords = np.array([[s["y"]] for s in seats])

    # Estimate number of rows (heuristic)
    k = max(1, len(seats) // 10)

    kmeans = KMeans(n_clusters=k, n_init=10)
    labels = kmeans.fit_predict(y_coords)

    for seat, label in zip(seats, labels):
        seat["row_index"] = label

    return seats

def finalize_seats(seats):
    # Sort rows top → bottom
    rows = {}
    for s in seats:
        rows.setdefault(s["row_index"], []).append(s)

    sorted_rows = sorted(rows.items(), key=lambda r: np.mean([s["y"] for s in r[1]]))

    final_seats = []
    row_letter = ord("A")

    for _, row_seats in sorted_rows:
        row_seats.sort(key=lambda s: s["x"])

        for i, seat in enumerate(row_seats, start=1):
            final_seats.append({
                "id": f"{chr(row_letter)}{i}",
                "x": seat["x"],
                "y": seat["y"],
                "row": chr(row_letter),
                "number": i,
                "category": "standard",
                "price": 3000,
                "available": True
            })

        row_letter += 1

    return final_seats

@app.post("/process-venue-image/{venue_id}")
async def process_venue_image(venue_id: str, image: UploadFile = File(...)):
    try:
        # Optionally save uploaded image if needed
        # content = await image.read()
        # with open(f"temp_{venue_id}.jpg", "wb") as f:
        #     f.write(content)

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Fetch seats for the venue
        cursor.execute("SELECT * FROM seats WHERE venue_id = %s", (venue_id,))
        seats = cursor.fetchall()

        conn.close()

        return {
            "venue_id": venue_id,
            "seats": seats,
            "width": 1200,  # adjust as per your design
            "height": 800
        }

    except Exception as e:
        print("Error fetching seats:", e)
        return {"error": "Internal server error"}
    
    
# @app.post("/process-venue-image/{venue_id}")
# async def process_image(venue_id: int, image: UploadFile):
#     path = save_temp_image(image)

#     img = load_image(path)
#     h, w = img.shape[:2]

#     pre = preprocess(img)
#     circles = detect_seats(pre)

#     raw_seats = normalize_seats(circles, w, h)
#     rowed = assign_rows(raw_seats)
#     final_seats = finalize_seats(rowed)

#     return {
#         "width": 1200,
#         "height": 800,
#         "seats": final_seats
#     }




# # Fake seats endpoint
# @app.post("/process-venue-image/{venue_id}")
# async def process_venue_image(venue_id: str, image: UploadFile = File(...)):
#     # For now, we ignore the image and return fake seat data
#     fake_seats = [
#         {"id": "A1", "row": "A", "number": 1, "section": "Front", "category": "standard", "price": 500, "available": True, "x": 50, "y": 100},
#         {"id": "A2", "row": "A", "number": 2, "section": "Front", "category": "standard", "price": 500, "available": True, "x": 80, "y": 100},
#         {"id": "D1", "row": "D", "number": 1, "section": "Premium", "category": "vip", "price": 1000, "available": False, "x": 50, "y": 150},
#     ]
#     return {
#         "venue_id": venue_id,
#         "seats": fake_seats,
#         "width": 600,
#         "height": 400
#     }
