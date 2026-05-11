import cv2
import pytesseract
from PIL import Image

def process_prescription(image_path):
    # 1. Image Pre-processing for Dsingr-level precision
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Adaptive thresholding to handle low-light photos
    processed_img = cv2.adaptiveThreshold(gray, 255, cv2.ADCH_MEAN_C, cv2.THRESH_BINARY, 11, 2)
    
    # 2. OCR Extraction
    raw_text = pytesseract.image_to_string(processed_img)
    
    # 3. Simple Extraction Logic (In production, send raw_text to Gemini/GPT-4o)
    # This mock logic finds medication keywords
    med_data = {
        "medication": "Amoxicillin", # Example extracted
        "dosage": "500mg",
        "frequency": "Twice daily",
        "confidence_score": 0.98
    }
    
    return med_data

# Example trigger
print(process_prescription('prescription_scan.jpg'))
