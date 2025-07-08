"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Eye,
  Edit,
  Trash2,
  Mail,
  Calendar,
  DollarSign,
  Building,
  FileText,
  Send,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock data for reimbursement letters
const mockReimbursements = [
  {
    id: "RL-001",
    letterNumber: "RL2024-001",
    employeeName: "John Smith",
    employeeId: "EMP001",
    department: "Sales",
    amount: 850.00,
    currency: "USD",
    date: "2024-01-15",
    status: "approved",
    category: "travel",
    description: "Business travel expenses for client meeting in New York",
    approvedBy: "Sarah Johnson",
    expenses: [
      { item: "Flight Tickets", amount: 450.00 },
      { item: "Hotel Accommodation", amount: 300.00 },
      { item: "Meals", amount: 100.00 },
    ],
  },
  {
    id: "RL-002",
    letterNumber: "RL2024-002",
    employeeName: "Emily Davis",
    employeeId: "EMP002",
    department: "Marketing",
    amount: 1250.00,
    currency: "USD",
    date: "2024-01-14",
    status: "pending",
    category: "training",
    description: "Professional development course fees and materials",
    approvedBy: "Mike Chen",
    expenses: [
      { item: "Course Registration", amount: 800.00 },
      { item: "Study Materials", amount: 300.00 },
      { item: "Certification Exam", amount: 150.00 },
    ],
  },
  {
    id: "RL-003",
    letterNumber: "RL2024-003",
    employeeName: "David Wilson",
    employeeId: "EMP003",
    department: "IT",
    amount: 650.00,
    currency: "USD",
    date: "2024-01-13",
    status: "rejected",
    category: "equipment",
    description: "Home office equipment for remote work",
    approvedBy: "Lisa Rodriguez",
    expenses: [
      { item: "Monitor Stand", amount: 200.00 },
      { item: "Ergonomic Chair", amount: 350.00 },
      { item: "Desk Lamp", amount: 100.00 },
    ],
  },
];

const statusColors = {
  approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  draft: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

const categoryColors = {
  travel: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  training: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  equipment: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  supplies: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  services: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
};

export default function ReimbursementLetterPage() {
  const [reimbursements, setReimbursements] = useState(mockReimbursements);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDownloadTemplate = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = '/reimbursement-letter-template.xlsx';
    link.download = 'reimbursement-letter-template.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Accept all document types
      setUploadedFile(file);
      setUploadStatus('success');
      
      // Mock: Add a new reimbursement record
      setTimeout(() => {
        setReimbursements([
          {
            id: `RL-${Date.now()}`,
            letterNumber: `RL${new Date().getFullYear()}-${String(reimbursements.length + 1).padStart(3, '0')}`,
            employeeName: "Uploaded Employee",
            employeeId: "UPLOAD-001",
            department: "Finance",
            amount: 1200.00,
            currency: "USD",
            date: new Date().toISOString().split('T')[0],
            status: "pending",
            category: "travel",
            description: "Uploaded reimbursement request",
            approvedBy: "System",
            expenses: [
              { item: "Uploaded Expense", amount: 1200.00 },
            ],
          },
          ...reimbursements,
        ]);
        setUploadedFile(null);
        setUploadStatus('idle');
      }, 2000);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
  };

  const handleStatusChange = (reimbursementId: string, newStatus: string) => {
    setReimbursements(reimbursements.map(reimbursement => 
      reimbursement.id === reimbursementId ? { ...reimbursement, status: newStatus } : reimbursement
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Reimbursement Letter</h1>
        <p className="text-muted-foreground">Create, manage, and track employee reimbursement letters using templates and documents</p>
      </div>

      {/* File Upload Workflow Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create New Reimbursement Letter
          </CardTitle>
          <CardDescription>
            Download the template, fill it out, and upload your completed document
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Download Template */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                1
              </div>
              <div>
                <h3 className="font-medium">Download Template</h3>
                <p className="text-sm text-muted-foreground">
                  Get the standardized template with all required fields
                </p>
              </div>
            </div>
            <Button 
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Download className="h-4 w-4" />
              📥 Download Reimbursement Template
            </Button>
          </div>

          {/* Step 2: Upload Completed File */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
              </div>
              <div>
                <h3 className="font-medium">Upload your Reimbursement Form and Supporting Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your completed document (Excel, PDF, Word, images, etc.)
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept=".xlsx,.xls,.pdf,.doc,.docx,.txt,.csv,.jpg,.jpeg,.png,.gif"
                  onChange={handleFileUpload}
                  className="max-w-sm"
                  id="document-upload"
                />
                <Label htmlFor="document-upload" className="text-sm text-muted-foreground">
                  📤 Upload your Reimbursement Form and Supporting Documents
                </Label>
              </div>

              {/* Upload Status */}
              {uploadStatus === 'success' && (
                <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    Document uploaded successfully! Processing your reimbursement request...
                  </AlertDescription>
                </Alert>
              )}

              {uploadStatus === 'error' && (
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800 dark:text-red-200">
                    Please upload a valid document file
                  </AlertDescription>
                </Alert>
              )}

              {uploadedFile && uploadStatus === 'idle' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Selected file: {uploadedFile.name}</span>
                  <Button variant="ghost" size="sm" onClick={resetUpload}>
                    Change
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <h4 className="font-medium mb-2">📋 Instructions:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Download the template using the button above</li>
              <li>• Fill out all required fields in the template</li>
              <li>• Save your document in any supported format</li>
              <li>• Upload the completed document using the upload button</li>
              <li>• Include all supporting documents (receipts, invoices, etc.)</li>
              <li>• The system will process your reimbursement request automatically</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Reimbursement Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Reimbursement Statistics
          </CardTitle>
          <CardDescription>
            Overview of reimbursement letters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {reimbursements.filter(r => r.status === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {reimbursements.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {reimbursements.filter(r => r.status === 'rejected').length}
              </div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                ${reimbursements.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Amount</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reimbursements List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Reimbursement Letters ({reimbursements.length})
          </CardTitle>
          <CardDescription>
            All created reimbursement letters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Letter #</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reimbursements.map((reimbursement) => (
                  <TableRow key={reimbursement.id}>
                    <TableCell>
                      <div className="font-mono text-sm">{reimbursement.letterNumber}</div>
                      <div className="text-xs text-muted-foreground">{reimbursement.id}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{reimbursement.employeeName}</div>
                        <div className="text-xs text-muted-foreground">ID: {reimbursement.employeeId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Building className="h-3 w-3 text-muted-foreground" />
                        {reimbursement.department}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-muted-foreground" />
                        {reimbursement.currency} {reimbursement.amount.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {new Date(reimbursement.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`capitalize ${categoryColors[reimbursement.category as keyof typeof categoryColors]}`}>
                        {reimbursement.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={`capitalize ${statusColors[reimbursement.status as keyof typeof statusColors]}`}>
                          {reimbursement.status}
                        </Badge>
                        {reimbursement.status === 'pending' && (
                          <Select value={reimbursement.status} onValueChange={(value) => handleStatusChange(reimbursement.id, value)}>
                            <SelectTrigger className="w-20 h-6 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="approved">Approve</SelectItem>
                              <SelectItem value="rejected">Reject</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-error hover:text-error">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {reimbursements.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <FileText className="mx-auto mb-2 h-8 w-8" />
              <p>No reimbursement letters found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 