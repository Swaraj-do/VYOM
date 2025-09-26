import React, { useState } from 'react';
import { Save, Bell, Shield, Database, Mail } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const SettingsPage: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      suspiciousActivity: true,
      dailyReports: false,
      systemUpdates: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      apiAccess: true,
      auditLogs: true
    },
    verification: {
      confidenceThreshold: '75',
      autoBlacklist: true,
      batchSize: '100',
      retentionDays: '365'
    }
  });

  const handleSave = () => {
    setShowToast(true);
  };

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const updateSecuritySetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: value
      }
    }));
  };

  const updateVerificationSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      verification: {
        ...prev.verification,
        [key]: value
      }
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            System Settings
          </h1>
          <p className="text-gray-600">
            Configure system preferences and security settings
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Notification Settings */}
        <Card>
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">
              Notification Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Email Alerts</h3>
                <p className="text-sm text-gray-600">Receive email notifications for important events</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.emailAlerts}
                onChange={(e) => updateNotificationSetting('emailAlerts', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Suspicious Activity</h3>
                <p className="text-sm text-gray-600">Alert when suspicious certificates are detected</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.suspiciousActivity}
                onChange={(e) => updateNotificationSetting('suspiciousActivity', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Daily Reports</h3>
                <p className="text-sm text-gray-600">Receive daily summary reports</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.dailyReports}
                onChange={(e) => updateNotificationSetting('dailyReports', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">System Updates</h3>
                <p className="text-sm text-gray-600">Notifications about system updates and maintenance</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.systemUpdates}
                onChange={(e) => updateNotificationSetting('systemUpdates', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card>
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-green-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">
              Security Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => updateSecuritySetting('twoFactorAuth', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Session Timeout</h3>
                <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
              </div>
              <select
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSecuritySetting('sessionTimeout', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">API Access</h3>
                <p className="text-sm text-gray-600">Allow API access to verification services</p>
              </div>
              <input
                type="checkbox"
                checked={settings.security.apiAccess}
                onChange={(e) => updateSecuritySetting('apiAccess', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Audit Logs</h3>
                <p className="text-sm text-gray-600">Enable detailed audit logging</p>
              </div>
              <input
                type="checkbox"
                checked={settings.security.auditLogs}
                onChange={(e) => updateSecuritySetting('auditLogs', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        {/* Verification Settings */}
        <Card>
          <div className="flex items-center mb-6">
            <Database className="w-6 h-6 text-purple-600 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">
              Verification Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Confidence Threshold</h3>
                <p className="text-sm text-gray-600">Minimum confidence level for verification</p>
              </div>
              <select
                value={settings.verification.confidenceThreshold}
                onChange={(e) => updateVerificationSetting('confidenceThreshold', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="50">50%</option>
                <option value="65">65%</option>
                <option value="75">75%</option>
                <option value="85">85%</option>
                <option value="95">95%</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Auto-Blacklist</h3>
                <p className="text-sm text-gray-600">Automatically blacklist certificates below threshold</p>
              </div>
              <input
                type="checkbox"
                checked={settings.verification.autoBlacklist}
                onChange={(e) => updateVerificationSetting('autoBlacklist', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Batch Processing Size</h3>
                <p className="text-sm text-gray-600">Number of certificates to process simultaneously</p>
              </div>
              <select
                value={settings.verification.batchSize}
                onChange={(e) => updateVerificationSetting('batchSize', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Data Retention</h3>
                <p className="text-sm text-gray-600">How long to keep verification records</p>
              </div>
              <select
                value={settings.verification.retentionDays}
                onChange={(e) => updateVerificationSetting('retentionDays', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="90">90 days</option>
                <option value="180">6 months</option>
                <option value="365">1 year</option>
                <option value="730">2 years</option>
                <option value="1825">5 years</option>
              </select>
            </div>
          </div>
        </Card>
      </div>

      {showToast && (
        <Toast
          message="Settings saved successfully!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};