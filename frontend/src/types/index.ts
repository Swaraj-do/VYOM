export interface Certificate {
  id: string;
  name: string;
  rollNo: string;
  course: string;
  marks: string;
  issueDate: string;
  institution: string;
  status: 'VERIFIED' | 'SUSPECT' | 'INVALID';
  tamperedFields?: string[];
}

export interface VerificationResult {
  certificate: Certificate;
  confidence: number;
  verificationDate: string;
}

export interface DashboardStats {
  totalVerifications: number;
  validPercentage: number;
  invalidPercentage: number;
  suspectPercentage: number;
  recentActivity: VerificationLog[];
}

export interface VerificationLog {
  id: string;
  certificateId: string;
  studentName: string;
  status: Certificate['status'];
  timestamp: string;
  institution: string;
}