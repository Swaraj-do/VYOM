import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, XCircle, Download, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Toast } from '../components/ui/Toast';
import { Certificate } from '../types';
import { sampleCertificates } from '../data/mockData';

export const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (id === 'demo') {
        setCertificate(sampleCertificates[0]); // VERIFIED certificate
      } else {
        // Randomly select a certificate for uploaded files
        const randomIndex = Math.floor(Math.random() * sampleCertificates.length);
        setCertificate(sampleCertificates[randomIndex]);
      }
      setIsLoading(false);
    }, 1500);
  }, [id]);

  const getStatusConfig = (status: Certificate['status']) => {
    const configs = {
      VERIFIED: {
        icon: CheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        title: 'Certificate Verified',
        description: 'This certificate is authentic and has passed all verification checks.'
      },
      SUSPECT: {
        icon: AlertTriangle,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        title: 'Certificate Suspect',
        description: 'This certificate shows signs of tampering or inconsistencies that require further review.'
      },
      INVALID: {
        icon: XCircle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        title: 'Certificate Invalid',
        description: 'This certificate is fraudulent or has been significantly tampered with.'
      }
    };
    return configs[status];
  };

  const getFieldClassName = (fieldName: string, tamperedFields?: string[]) => {
    if (tamperedFields && tamperedFields.includes(fieldName)) {
      return 'bg-red-50 text-red-800 font-medium';
    }
    return '';
  };

  const handleDownloadReport = () => {
    setShowToast(true);
    // In a real app, this would generate and download a PDF report
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-lg text-gray-600">Analyzing certificate...</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Certificate Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested certificate could not be found or verified.
          </p>
          <Link to="/upload">
            <Button>Try Another Certificate</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const statusConfig = getStatusConfig(certificate.status);
  const StatusIcon = statusConfig.icon;

  const tableData = [
    { field: 'Name', value: certificate.name, className: getFieldClassName('name', certificate.tamperedFields) },
    { field: 'Roll Number', value: certificate.rollNo, className: getFieldClassName('rollNo', certificate.tamperedFields) },
    { field: 'Course', value: certificate.course, className: getFieldClassName('course', certificate.tamperedFields) },
    { field: 'Marks', value: certificate.marks, className: getFieldClassName('marks', certificate.tamperedFields) },
    { field: 'Issue Date', value: certificate.issueDate, className: getFieldClassName('issueDate', certificate.tamperedFields) },
    { field: 'Institution', value: certificate.institution, className: getFieldClassName('institution', certificate.tamperedFields) }
  ];

  const tableColumns = [
    { key: 'field', label: 'Field' },
    { key: 'value', label: 'Value' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link to="/upload" className="mr-4">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Verification Results
          </h1>
        </div>

        {/* Status Banner */}
        <Card className={`mb-6 ${statusConfig.bg} ${statusConfig.border} border`}>
          <div className="flex items-center">
            <StatusIcon className={`w-12 h-12 ${statusConfig.color} mr-4`} />
            <div>
              <h2 className={`text-xl font-bold ${statusConfig.color} mb-1`}>
                {statusConfig.title}
              </h2>
              <p className="text-gray-700">
                {statusConfig.description}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Certificate Details */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Certificate Details
                </h3>
                <span className="text-sm text-gray-500">
                  ID: {certificate.id}
                </span>
              </div>

              <Table 
                columns={tableColumns} 
                data={tableData.map(item => ({
                  field: <span className="font-medium text-gray-700">{item.field}</span>,
                  value: <span className={item.className || 'text-gray-900'}>{item.value}</span>
                }))} 
              />

              {certificate.tamperedFields && certificate.tamperedFields.length > 0 && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-medium text-red-800 mb-2">
                    Tampered Fields Detected:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {certificate.tamperedFields.map((field) => (
                      <span 
                        key={field}
                        className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Actions */}
          <div>
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actions
              </h3>
              
              <div className="space-y-3">
                <Button
                  onClick={handleDownloadReport}
                  className="w-full"
                  variant="success"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>

                <Link to="/upload" className="block">
                  <Button variant="secondary" className="w-full">
                    Verify Another
                  </Button>
                </Link>

                <Link to="/dashboard" className="block">
                  <Button variant="secondary" className="w-full">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Verification Info */}
            <Card className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Verification Info
              </h4>
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Verified:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Confidence:</span>
                  <span className="font-medium">
                    {certificate.status === 'VERIFIED' ? '98.5%' : 
                     certificate.status === 'SUSPECT' ? '65.2%' : '12.1%'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <span>2.3s</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message="Verification report downloaded successfully!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};