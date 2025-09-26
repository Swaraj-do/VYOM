import { Certificate, DashboardStats, VerificationLog } from '../types';

export const sampleCertificates: Certificate[] = [
  {
    id: 'CERT-2023-001',
    name: 'John Smith',
    rollNo: 'CS2023001',
    course: 'Bachelor of Computer Science',
    marks: '85.5%',
    issueDate: '2023-06-15',
    institution: 'State University',
    status: 'VERIFIED'
  },
  {
    id: 'CERT-2023-002',
    name: 'Sarah Johnson',
    rollNo: 'EE2023045',
    course: 'Bachelor of Electrical Engineering',
    marks: '78.2%',
    issueDate: '2023-06-20',
    institution: 'Tech Institute',
    status: 'SUSPECT',
    tamperedFields: ['marks', 'issueDate']
  },
  {
    id: 'CERT-2023-003',
    name: 'Michael Brown',
    rollNo: 'ME2023089',
    course: 'Bachelor of Mechanical Engineering',
    marks: '92.1%',
    issueDate: '2023-05-30',
    institution: 'Engineering College',
    status: 'INVALID',
    tamperedFields: ['name', 'marks']
  }
];

export const mockDashboardStats: DashboardStats = {
  totalVerifications: 1247,
  validPercentage: 78.5,
  invalidPercentage: 15.2,
  suspectPercentage: 6.3,
  recentActivity: [
    {
      id: '1',
      certificateId: 'CERT-2024-001',
      studentName: 'Alice Cooper',
      status: 'VERIFIED',
      timestamp: '2024-01-15 14:30',
      institution: 'State University'
    },
    {
      id: '2',
      certificateId: 'CERT-2024-002',
      studentName: 'Bob Wilson',
      status: 'SUSPECT',
      timestamp: '2024-01-15 13:45',
      institution: 'Tech Institute'
    },
    {
      id: '3',
      certificateId: 'CERT-2024-003',
      studentName: 'Carol Davis',
      status: 'INVALID',
      timestamp: '2024-01-15 12:20',
      institution: 'Engineering College'
    },
    {
      id: '4',
      certificateId: 'CERT-2024-004',
      studentName: 'David Miller',
      status: 'VERIFIED',
      timestamp: '2024-01-15 11:10',
      institution: 'State University'
    }
  ]
};