import React, { useState } from 'react';
import { Shield, Plus, Search, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table } from '../../components/ui/Table';

interface BlacklistEntry {
  id: string;
  certificateId: string;
  reason: string;
  addedBy: string;
  addedDate: string;
}

export const BlacklistPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blacklist] = useState<BlacklistEntry[]>([
    {
      id: '1',
      certificateId: 'CERT-FAKE-001',
      reason: 'Fraudulent document - confirmed fake',
      addedBy: 'Admin',
      addedDate: '2024-01-10'
    },
    {
      id: '2',
      certificateId: 'CERT-FAKE-002',
      reason: 'Tampered marks field',
      addedBy: 'Supervisor',
      addedDate: '2024-01-08'
    },
    {
      id: '3',
      certificateId: 'CERT-FAKE-003',
      reason: 'Invalid institution signature',
      addedBy: 'Admin',
      addedDate: '2024-01-05'
    }
  ]);

  const filteredBlacklist = blacklist.filter(entry =>
    entry.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableColumns = [
    { key: 'certificateId', label: 'Certificate ID' },
    { key: 'reason', label: 'Reason' },
    { key: 'addedBy', label: 'Added By' },
    { key: 'addedDate', label: 'Date Added' },
    { key: 'actions', label: 'Actions' }
  ];

  const tableData = filteredBlacklist.map(entry => ({
    certificateId: (
      <span className="font-mono text-sm bg-red-50 text-red-700 px-2 py-1 rounded">
        {entry.certificateId}
      </span>
    ),
    reason: entry.reason,
    addedBy: entry.addedBy,
    addedDate: entry.addedDate,
    actions: (
      <Button size="sm" variant="danger">
        <Trash2 className="w-4 h-4" />
      </Button>
    )
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Certificate Blacklist
          </h1>
          <p className="text-gray-600">
            Manage flagged and invalid certificates
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add to Blacklist
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Search and Filters */}
        <Card>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="sm">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-red-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Blacklisted</p>
                <p className="text-xl font-bold text-gray-900">{blacklist.length}</p>
              </div>
            </div>
          </Card>

          <Card padding="sm">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-amber-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </Card>

          <Card padding="sm">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Prevention Rate</p>
                <p className="text-xl font-bold text-gray-900">98.5%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Blacklist Table */}
        <Card>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Blacklisted Certificates
            </h2>
            <p className="text-sm text-gray-600">
              {filteredBlacklist.length} certificate(s) found
            </p>
          </div>

          {filteredBlacklist.length > 0 ? (
            <Table columns={tableColumns} data={tableData} />
          ) : (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No blacklisted certificates found</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};