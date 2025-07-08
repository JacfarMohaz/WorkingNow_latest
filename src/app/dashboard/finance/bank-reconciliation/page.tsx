"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2, FileText, Download, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock data for reconciliation records
const mockReconciliations = [
  {
    id: "BR-001",
    bankName: "ABC Bank",
    accountNo: "1234567890",
    statementDate: "2024-05-01",
    journalDate: "2024-05-01",
    balanceBank: 10000.0,
    balanceJournal: 9500.0,
    status: "Completed",
  },
  {
    id: "BR-002",
    bankName: "XYZ Bank",
    accountNo: "9876543210",
    statementDate: "2024-04-01",
    journalDate: "2024-04-01",
    balanceBank: 20000.0,
    balanceJournal: 19800.0,
    status: "Pending",
  },
];

export default function BankReconciliationPage() {
  const [reconciliations, setReconciliations] = useState(mockReconciliations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDownloadTemplate = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = '/bank-reconciliation-template.xlsx';
    link.download = 'bank-reconciliation-template.xlsx';
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
      
      // Mock: Add a new reconciliation record
      setTimeout(() => {
        setReconciliations([
          {
            id: `BR-${Date.now()}`,
            bankName: "Uploaded Bank",
            accountNo: "UPLOAD-001",
            statementDate: new Date().toISOString().split('T')[0],
            journalDate: new Date().toISOString().split('T')[0],
            balanceBank: 15000.0,
            balanceJournal: 14800.0,
            status: "Pending",
          },
          ...reconciliations,
        ]);
        setIsDialogOpen(false);
        setUploadedFile(null);
        setUploadStatus('idle');
      }, 2000);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Bank Reconciliation</h1>
        <p className="text-muted-foreground">Create, manage, and track bank reconciliation statements using templates and documents</p>
      </div>

      {/* Excel Workflow Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Create New Reconciliation
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
              📥 Download Template
            </Button>
          </div>

          {/* Step 2: Upload Completed File */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
              </div>
              <div>
                <h3 className="font-medium">Upload your Bank Reconciliation Form and Bank Statement</h3>
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
                  📤 Upload your Bank Reconciliation Form and Bank Statement
                </Label>
              </div>

              {/* Upload Status */}
              {uploadStatus === 'success' && (
                <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    File uploaded successfully! Processing your reconciliation...
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
              <li>• The system will process your reconciliation automatically</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Records Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Bank Reconciliation Records ({reconciliations.length})
              </CardTitle>
              <CardDescription>
                All reconciliation statements and their status
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Bank Name</TableHead>
                  <TableHead>Account No.</TableHead>
                  <TableHead>Statement Date</TableHead>
                  <TableHead>Journal Date</TableHead>
                  <TableHead>Bank Balance</TableHead>
                  <TableHead>Journal Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reconciliations.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell>{rec.id}</TableCell>
                    <TableCell>{rec.bankName}</TableCell>
                    <TableCell>{rec.accountNo}</TableCell>
                    <TableCell>{rec.statementDate}</TableCell>
                    <TableCell>{rec.journalDate}</TableCell>
                    <TableCell>{rec.balanceBank.toLocaleString()}</TableCell>
                    <TableCell>{rec.balanceJournal.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        rec.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {rec.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
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
          {reconciliations.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <FileText className="mx-auto mb-2 h-8 w-8" />
              <p>No reconciliation records found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 