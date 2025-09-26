import React, { useState } from 'react';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';
import { mockDashboardStats } from '../../data/mockData';

export const LogsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const logs = mockDashboardStats.recentActivity;
  
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.institution.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const tableColumns = [
    { key: 'timestamp', label: 'Date & Time' },
    { key: 'certificateId', label: 'Certificate ID' },
    { key: 'studentName', label: 'Student Name' },
    { key: 'institution', label: 'Institution' },
    { key: 'status', label: 'Status' }
  ];

  const tableData = filteredLogs.map(log => ({
    timestamp: log.timestamp,
    certificateId: (
      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
        {log.certificateId}
      </span>
    ),
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
    )
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verification Logs
          </h1>
          <p className="text-gray-600">
            Complete history of certificate verification activities
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Filters */}
        <Card>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by certificate ID, student name, or institution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="VERIFIED">Verified</option>
                <option value="SUSPECT">Suspect</option>
                <option value="INVALID">Invalid</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
              <p className="text-sm text-gray-600">Total Logs</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {logs.filter(l => l.status === 'VERIFIED').length}
              </p>
              <p className="text-sm text-gray-600">Verified</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">
                {logs.filter(l => l.status === 'SUSPECT').length}
              </p>
              <p className="text-sm text-gray-600">Suspect</p>
            </div>
          </Card>
          <Card padding="sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {logs.filter(l => l.status === 'INVALID').length}
              </p>
              <p className="text-sm text-gray-600">Invalid</p>
            </div>
          </Card>
        </div>

        {/* Logs Table */}
        <Card>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Recent Activity
            </h2>
            <p className="text-sm text-gray-600">
              {filteredLogs.length} record(s) found
            </p>
          </div>

          {filteredLogs.length > 0 ? (
            <Table columns={tableColumns} data={tableData} />
          ) : (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No logs match your current filters</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};