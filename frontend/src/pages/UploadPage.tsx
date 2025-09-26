import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [certificateId, setCertificateId] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (file.type.includes('pdf') || file.type.includes('image')) {
        setFile(file);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file && !demoMode) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to results with demo data
    const resultId = demoMode ? 'demo' : 'uploaded';
    navigate(`/results/${resultId}`);
  };

  const loadDemoData = () => {
    setDemoMode(true);
    setCertificateId('CERT-2023-001');
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Certificate Verification
          </h1>
          <p className="text-lg text-gray-600">
            Upload a certificate file or enter a certificate ID to begin verification
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate File
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <span className="text-sm text-gray-900">{file.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drag and drop your certificate here, or{' '}
                        <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
                          browse files
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileChange}
                          />
                        </label>
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports PDF, JPG, PNG files up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate ID / Roll Number (Optional)
                </label>
                <input
                  type="text"
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter certificate ID or roll number"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={(!file && !demoMode) || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner size="sm" />
                    <span>Verifying Certificate...</span>
                  </div>
                ) : (
                  'Verify Certificate'
                )}
              </Button>
            </form>
          </Card>

          {/* Demo Section */}
          <Card>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle className="w-12 h-12 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Demo Mode
              </h3>
              <p className="text-gray-600 mb-6">
                Try our verification system with sample certificates. 
                This will demonstrate the verification process without 
                uploading your own files.
              </p>
              
              <Button
                onClick={loadDemoData}
                variant="warning"
                className="w-full mb-4"
              >
                Load Sample Certificate
              </Button>

              {demoMode && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
                  <p className="text-sm text-amber-800">
                    <strong>Demo Mode Active:</strong> Using sample certificate 
                    data for demonstration purposes.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};