import React from 'react';
import { BarChart3, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Table } from '../components/ui/Table';
import { mockDashboardStats } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const stats = mockDashboardStats;

  const statsCards = [
    {
      title: 'Total Verifications',
      value: stats.totalVerifications.toLocaleString(),
      icon: BarChart3,
      color: 'text-blue-600'
    },
    {
      title: 'Valid Certificates',
      value: `${stats.validPercentage}%`,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Suspect Certificates',
      value: `${stats.suspectPercentage}%`,
      icon: AlertTriangle,
      color: 'text-amber-600'
    },
    {
      title: 'Invalid Certificates',
      value: `${stats.invalidPercentage}%`,
      icon: Users,
      color: 'text-red-600'
    }
  ];

  const tableColumns = [
    { key: 'certificateId', label: 'Certificate ID' },
    { key: 'studentName', label: 'Student Name' },
    { key: 'institution', label: 'Institution' },
    { key: 'status', label: 'Status' },
    { key: 'timestamp', label: 'Verified At' }
  ];

  const tableData = stats.recentActivity.map(log => ({
    certificateId: log.certificateId,
    studentName: log.studentName,
    institution: log.institution,
    status: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        log.status === 'VERIFIED' ? 'bg-green-100 text-green-800' :
        log.status === 'SUSPECT' ? 'bg-amber-100 text-amber-800' :
        'bg-red-100 text-red-800'
      }`}>
        {log.status}
      </span>
    ),
    timestamp: log.timestamp
  }));

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Institution Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor certificate verification activity and system performance
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} padding="sm">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color} mr-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Recent Verification Activity
          </h2>
          <p className="text-sm text-gray-600">
            Latest certificate verifications processed by the system
          </p>
        </div>

        <Table columns={tableColumns} data={tableData} />
      </Card>
    </div>
  );
};