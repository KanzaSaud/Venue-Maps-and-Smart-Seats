import cv2
import numpy as np
import os
import json

class OpenCVSeatDetector:
    def __init__(self):
        self.seats = []
        self.image = None

    def load_image(self, image_path):
        if not os.path.exists(image_path):
            raise FileNotFoundError(image_path)

        self.image = cv2.imread(image_path)
        if self.image is None:
            raise ValueError("Failed to load image")

    def detect_seats(self, min_area=50, max_area=5000):
        if self.image is None:
            return []

        gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)

        thresh = cv2.adaptiveThreshold(
            gray, 255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY_INV,
            11, 2
        )

        kernel = np.ones((3, 3), np.uint8)
        thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)

        contours, _ = cv2.findContours(
            thresh,
            cv2.RETR_TREE,
            cv2.CHAIN_APPROX_SIMPLE
        )

        seats = []
        seat_id = 0

        for cnt in contours:
            area = cv2.contourArea(cnt)
            if min_area <= area <= max_area:
                x, y, w, h = cv2.boundingRect(cnt)
                aspect_ratio = w / float(h)

                if 0.5 <= aspect_ratio <= 2.0:
                    cx = x + w // 2
                    cy = y + h // 2

                    seats.append({
                        "id": seat_id,
                        "x": int(cx),
                        "y": int(cy),
                        "area": float(area)
                    })
                    seat_id += 1

        self.seats = seats
        return seats
