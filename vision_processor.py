import cv2
import pytesseract

def process_prescription(image_path):
    img = cv2.imread(image_path)
    if img is None: return {"error": "File not found"}
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Corrected constant for Termux/OpenCV environments
    processed_img = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2
    )
    
    raw_text = pytesseract.image_to_string(processed_img)
    return {"raw_text": raw_text, "status": "processed"}
