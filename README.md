# VYOM

## Optical Character Recognition(OCR)
Building an OCR model for this project is a multi-step process that combines image preprocessing, a powerful OCR engine, and post-processing logic to ensure accurate data extraction from academic certificates. 
### 1. Setup the Environment 🛠️<br>
You need to install the core libraries that will handle image processing and text recognition.
Tesseract OCR Engine: This is the most widely used open-source OCR engine. You must install the Tesseract executable on your system.
pytesseract: A Python wrapper for the Tesseract engine. This library allows you to call Tesseract functions from within your Python code. Install it using pip install pytesseract.
OpenCV: An open-source computer vision library. It is essential for all the image preprocessing steps. Install it using pip install opencv-python.
Pillow: A powerful image processing library that works well with pytesseract. Install it using pip install Pillow.
### 2. Image Preprocessing with OpenCV 🖼️<br>
The quality of your OCR output depends heavily on the quality of the input image. You must clean and enhance the image before sending it to the OCR engine.
Load the Image: Use OpenCV's cv2.imread() function to load the certificate image.
Grayscale Conversion: Convert the image to grayscale using cv2.cvtColor(). This simplifies the image and improves accuracy.
Deskewing: Scanned documents are often slightly tilted. Deskewing corrects this by rotating the image to ensure the text lines are perfectly horizontal.
Thresholding/Binarization: Convert the image to pure black and white to separate the text (foreground) from the background. Adaptive thresholding (cv2.adaptiveThreshold()) is a great choice as it adjusts the threshold for different lighting conditions across the image.
Noise Removal: Remove any small dots or artifacts that could interfere with OCR. Filters like cv2.medianBlur() are very effective for this.
### 3. Text Extraction with Tesseract ⚙️<br>
After preprocessing, you can use pytesseract to extract the text.
Configure Tesseract: You may need to specify the path to your Tesseract executable.
Extract Text: Use pytesseract.image_to_string() to get the text from the preprocessed image. The output will be a single string containing all the text.
Extract Data with Bounding Boxes: For more structured data, use pytesseract.image_to_data(). This function returns a dictionary with information for each detected word, including its bounding box coordinates, text, and confidence score. This is extremely useful for locating specific fields on the certificate.
### 4. Post-processing and Structured Data Extraction 📝<br>
The raw text from Tesseract is often messy. You need to parse it to get structured information.
Define a Template: Create a template that specifies the location and format of the data you need to extract (e.g., student name, roll number, marks).
Use Regular Expressions (Regex): Write regex patterns to find and extract specific information from the raw text. For example, a pattern like Roll No can find the roll number, while Name can extract the student's name.
Bounding Box-based Extraction: Since the layout of academic certificates can vary, a more robust method is to use the bounding box data from Tesseract. You can define a "region of interest" (ROI) on the certificate and extract text only from within that box, making the extraction more accurate.
### 5. Fine-tuning for Academic Documents 🎯<br>
Out-of-the-box Tesseract is good, but for the specific fonts, layouts, and data types found on university certificates, you'll get better results by fine-tuning it.
Generate Training Data: Create a dataset of your academic documents and their corresponding ground truth text. Tesseract's training tools allow you to create .box files that specify the coordinates of each character and its corresponding text.
Train a Custom Model: Use Tesseract's tesstrain tool to train a new model specifically on your .box files. This model will learn to recognize the specific fonts and character patterns unique to academic certificates.
Iterate and Improve: The process is iterative. You'll need to continuously test your model on new documents, identify errors, and retrain the model with more data to improve its performance over time.
