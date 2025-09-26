import React, { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const BulkUploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowToast(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Bulk Certificate Upload
        </h1>
        <p className="text-gray-600">
          Upload multiple certificates for batch verification
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upload Certificates
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            {file ? (
              <div className="flex items-center justify-center space-x-2">
                <FileText className="w-8 h-8 text-blue-600" />
                <span className="text-sm text-gray-900">{file.name}</span>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Select a CSV or JSON file containing certificate data
                </p>
                <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
                  Browse files
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv,.json"
                    onChange={handleFileChange}
                  />
                </label>
              </>
            )}
          </div>

          {isUploading && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={!file || isUploading}
            className="w-full"
          >
            {isUploading ? 'Uploading...' : 'Start Upload'}
          </Button>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            File Format Requirements
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">CSV Format</h3>
              <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                certificate_id,name,roll_no,course,marks,issue_date,institution
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">JSON Format</h3>
              <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                {`[
  {
    "certificate_id": "CERT-001",
    "name": "John Doe",
    "roll_no": "CS001",
    "course": "Computer Science",
    "marks": "85%",
    "issue_date": "2023-06-15",
    "institution": "State University"
  }
]`}
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                <div className="text-sm text-blue-800">
                  <strong>Tip:</strong> Ensure all required fields are included 
                  for accurate verification results.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {showToast && (
        <Toast
          message="Certificates uploaded successfully! Verification will begin shortly."
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};