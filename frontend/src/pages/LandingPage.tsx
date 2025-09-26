import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Clock, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Authenticity Validator
            <span className="block text-blue-600">for Academia</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Verify academic certificates instantly and securely. Protect institutions 
            from fraudulent credentials with our advanced verification technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" className="w-full sm:w-auto">
                Start Verification
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Educational Institutions Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform provides comprehensive certificate validation with 
            industry-leading accuracy and security standards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Instant Verification
            </h3>
            <p className="text-gray-600">
              Get verification results in seconds with our advanced AI-powered 
              document analysis technology.
            </p>
          </Card>

          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tamper Detection
            </h3>
            <p className="text-gray-600">
              Advanced algorithms detect document tampering and highlight 
              suspicious modifications in real-time.
            </p>
          </Card>

          <Card className="text-center">
            <div className="flex justify-center mb-4">
              <FileText className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Detailed Reports
            </h3>
            <p className="text-gray-600">
              Generate comprehensive verification reports with detailed analysis 
              and downloadable documentation.
            </p>
          </Card>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">99.7%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Certificates Verified</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Institutions</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};