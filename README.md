
# ValidX-Authenticity Validator for Academia: A Fake Degree/Certificate Recognition System <br>

## Background<br>
In an increasingly digital world, the issue of forged academic certificates and fake degrees has become a significant problem. This project, commissioned by the Government of Jharkhand, aims to create a secure, scalable, and efficient digital platform to verify the authenticity of educational credentials issued by colleges and universities. The goal is to safeguard academic integrity, protect the reputation of institutions, and restore public trust.

## Problem Statement<br>
The platform is designed to combat fraudulent academic documents by cross-verifying uploaded certificates (both legacy and new digital documents) with official institutional records. It detects and flags various anomalies, such as tampered grades, forged signatures, invalid certificate numbers, and non-existent institutions or courses.

## Key Features<br>
Intelligent Document Processing: Uses an advanced OCR model to accurately extract key details like student name, roll number, marks, and certificate ID from a wide range of document types, including low-resolution images and PDFs.<br>

Advanced Image Preprocessing: A robust preprocessing pipeline (using techniques like upscaling, bilateral filtering, and adaptive binarization) ensures high accuracy even with poor-quality or damaged documents.<br>

Anomaly Detection: A machine learning model analyzes extracted data for statistical anomalies and inconsistencies, assigning a risk score to each document.<br>

Forgery Detection: Computer vision models are used to detect visual tampering, such as altered photos, forged signatures, and fake university seals.<br>

Admin Dashboard: A central dashboard for authorized bodies (e.g., Higher Education Department) to monitor verification activity, analyze forgery trends, and manage user accounts.<br>

Technology Stack
Core Language: Python

OCR: Tesseract with pytesseract

Image Processing: OpenCV, NumPy, Pillow, and imutils

Machine Learning: scikit-learn for anomaly detection, deep learning frameworks like TensorFlow/Keras for forgery detection (to be implemented).

Development Environment: Google Colab for prototyping and model training.

Production Environment: Cloud platforms like AWS or GCP for scalable and secure deployment.

Getting Started (OCR Model)
To get started with the OCR model, you can run the provided Python script in a Google Colab notebook.

Open the Notebook: Open the ocr_model_colab.py file in Google Colab.

Install Dependencies: Run the first code cell to install the necessary libraries and the Tesseract OCR engine.

Upload Image: The script will prompt you to upload an image of a certificate.

View Output: The notebook will display the preprocessed image, the raw text extracted by Tesseract, and the final structured data.

Future Enhancements
The project is a multi-phase effort. Future work will focus on:

Building the Anomaly Detection Model: An unsupervised model will be trained on authentic data to automatically flag suspicious records.

Building the Image Forgery Detection Model: A CNN will be trained on a dataset of genuine and forged documents to detect pixel-level tampering.

Integration with Blockchain: Implementing a blockchain-based verification system for newly issued certificates to ensure an immutable, tamper-proof record of credentials.

## Contact<br>
This project is being developed for the Government of Jharkhand. For inquiries or collaboration opportunities, please contact the Department of Higher Education.