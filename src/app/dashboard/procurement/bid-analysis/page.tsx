"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Eye, Edit, Trash2 } from "lucide-react";

// Mock data for bid analysis table
const mockBids = [
  {
    refNo: "BID-20240610-101",
    title: "Office Supplies Tender",
    supplier: "Somali Supplies Ltd.",
    amount: 2500,
    date: "2024-06-10",
    status: "Evaluated",
  },
  {
    refNo: "BID-20240609-102",
    title: "IT Equipment Purchase",
    supplier: "Mogadishu Office Mart",
    amount: 12000,
    date: "2024-06-09",
    status: "Pending",
  },
];

export default function BidAnalysisPage() {
  // State for uploaded file
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/bid-analysis-template.xlsx';
    link.download = 'bid-analysis-template.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setUploadStatus('success');
      // You can add logic to process/upload the file here
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Bid Analysis</h1>
        <p className="text-muted-foreground">Create, manage, and track bid analysis using templates and documents</p>
      </div>

      {/* Excel Workflow Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Create New Bid Analysis
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
                  Get the standardized bid analysis template
                </p>
              </div>
            </div>
            <Button 
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2"
              variant="outline"
            >
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
                <h3 className="font-medium">Upload your Completed Bid Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your completed bid analysis document (Excel, PDF, etc.)
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept=".xlsx,.xls,.pdf,.doc,.docx,.txt,.csv"
                  onChange={handleFileUpload}
                  className="max-w-sm"
                  id="bid-analysis-upload"
                />
                <Label htmlFor="bid-analysis-upload" className="text-sm text-muted-foreground">
                  📤 Upload your Bid Analysis
                </Label>
              </div>

              {/* Upload Status */}
              {uploadStatus === 'success' && (
                <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    File uploaded successfully!
                  </AlertDescription>
                </Alert>
              )}

              {uploadStatus === 'error' && (
                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
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
              <li>• The system will process your bid analysis automatically</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Bid Analysis Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            All Bid Analyses ({mockBids.length})
          </CardTitle>
          <CardDescription>
            View and manage your bid analyses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border text-xs">
              <thead className="bg-muted">
                <tr>
                  <th className="border p-1">Ref No</th>
                  <th className="border p-1">Bid Title</th>
                  <th className="border p-1">Supplier</th>
                  <th className="border p-1">Amount</th>
                  <th className="border p-1">Date</th>
                  <th className="border p-1">Status</th>
                  <th className="border p-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockBids.map((bid) => (
                  <tr key={bid.refNo}>
                    <td className="border p-1">{bid.refNo}</td>
                    <td className="border p-1">{bid.title}</td>
                    <td className="border p-1">{bid.supplier}</td>
                    <td className="border p-1">${bid.amount.toLocaleString()}</td>
                    <td className="border p-1">{bid.date}</td>
                    <td className="border p-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        bid.status === 'Evaluated'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {bid.status === 'Evaluated' ? <CheckCircle className="w-3 h-3 inline" /> : <AlertCircle className="w-3 h-3 inline" />} {bid.status}
                      </span>
                    </td>
                    <td className="border p-1 text-center">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 