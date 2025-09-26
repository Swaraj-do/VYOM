# This script demonstrates how to build a basic OCR model for certificate data
# within a Google Colab notebook. It uses OpenCV for image preprocessing,
# Tesseract for OCR, and regular expressions for structured data extraction.

import cv2
import pytesseract
import numpy as np
from PIL import Image
import re
from io import BytesIO
from google.colab import files




# --- 1. Image Loading via File Upload ---
# This function allows you to upload a file directly from your local machine
# to the Colab notebook.
def upload_and_load_image():
    uploaded = files.upload()
    file_name = next(iter(uploaded))
    print(f"\nUploaded file: {file_name}")
    
    # Read the image bytes and convert to a numpy array for OpenCV
    img_bytes = uploaded[file_name]
    image = np.array(Image.open(BytesIO(img_bytes)))
    
    # Convert from RGB to BGR for OpenCV
    if image.shape[2] == 4: # Handle PNG with alpha channel
        image = cv2.cvtColor(image, cv2.COLOR_RGBA2BGR)
    else:
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    return image, file_name

# Use the function to upload an image and get the file name
print("Please upload your certificate image now:")
uploaded_image, uploaded_file_name = upload_and_load_image()

# Display the original image in the notebook
print("\n--- Original Image ---")
display(Image.fromarray(cv2.cvtColor(uploaded_image, cv2.COLOR_BGR2RGB)))

# --- 2. Image Preprocessing with OpenCV ---
# This new preprocessing pipeline is more robust for low-quality images.

def advanced_preprocessing(img):
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Upscale the image to improve resolution
    # This is useful for very low-resolution photos
    upscaled = cv2.resize(gray, None, fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC)
    
    # Apply a bilateral filter for noise removal while keeping edges sharp
    denoised = cv2.bilateralFilter(upscaled, 9, 75, 75)
    
    # Use adaptive thresholding to handle uneven lighting
    thresh = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
    
    # Invert colors for Tesseract
    inverted = cv2.bitwise_not(thresh)

    # Optional: Apply dilation to thicken text if it's too thin
    kernel = np.ones((1, 1), np.uint8)
    dilated = cv2.dilate(inverted, kernel, iterations=1)
    
    return dilated

# Process the image and display the result
preprocessed_image = advanced_preprocessing(uploaded_image)
print("\n--- Preprocessed Image (for OCR) ---")
display(Image.fromarray(preprocessed_image))

# --- 3. Text Extraction with pytesseract ---
# Now we'll use pytesseract to get the text from the preprocessed image.
# Setting the Tesseract command path might be necessary in some environments.
# On Colab, the installation handles this automatically.

# Extract text using Tesseract
raw_text = pytesseract.image_to_string(preprocessed_image)

print("\n--- Extracted Raw Text ---")
print(raw_text)

# --- 4. Structured Data Extraction with Regex ---
# The raw text is unstructured. We'll use regular expressions to parse it
# and extract specific, meaningful fields.

def extract_structured_data(text):
    data = {}
    
    # Define regex patterns for key fields
    patterns = {
        "Name": r"(?:Student Name|Name|Candidate Name):\s*(.*)",
        "Roll Number": r"(?:Roll Number|Roll No|Enrollment No):\s*(\S+)",
        "Serial Number": r"(?:Serial Number|Serial No|Sr\. No):\s*(\S+)",
        "Marks Obtained": r"(?:Marks Obtained|Marks):\s*(\S+)"
    }
    
    for key, pattern in patterns.items():
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            # Clean the extracted value
            data[key] = match.group(1).strip()
    
    return data

# Extract and display the structured data
structured_data = extract_structured_data(raw_text)
print("\n--- Extracted Structured Data ---")
for key, value in structured_data.items():
    print(f"{key}: {value}")
