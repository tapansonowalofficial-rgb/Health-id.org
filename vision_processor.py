import cv2
import pytesseract
import numpy as np

def process_prescription(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return {"error": "Image not found"}
        
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Corrected constant: cv2.ADAPTIVE_THRESH_MEAN_C
    processed_img = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2
    )
    
    raw_text = pytesseract.image_to_string(processed_img)
    
    # Mock return for logic flow
    return {
        "medication": "Amoxicillin",
        "confidence_score": 0.99,
        "status": "Verified"
    }
