"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Trash2,
  Eye,
  Calendar,
  UserCircle,
  Database,
} from "lucide-react";

type UploadedFile = {
  id: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  uploadedBy: string;
  status: "processed" | "processing" | "error" | "pending";
  recordCount: number;
  type: "expense_data" | "budget_data" | "invoice_data" | "payment_data";
};

// Mock data for uploaded files
const mockUploadedFiles = [
  {
    id: "1",
    fileName: "financial_data_2024.xlsx",
    fileSize: "2.4 MB",
    uploadDate: "2024-01-15",
    uploadedBy: "John Smith",
    status: "processed" as const,
    recordCount: 1250,
    type: "expense_data" as const,
  },
  {
    id: "2",
    fileName: "budget_allocation_q1.xlsx",
    fileSize: "1.8 MB",
    uploadDate: "2024-01-14",
    uploadedBy: "Sarah Johnson",
    status: "processing" as const,
    recordCount: 890,
    type: "budget_data" as const,
  },
  {
    id: "3",
    fileName: "invoice_records.xlsx",
    fileSize: "3.2 MB",
    uploadDate: "2024-01-13",
    uploadedBy: "Mike Chen",
    status: "error" as const,
    recordCount: 0,
    type: "invoice_data" as const,
  },
];

const statusColors = {
  processed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  processing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  pending: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

const fileTypeColors = {
  expense_data: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  budget_data: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  invoice_data: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  payment_data: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
};

export default function ExcelUploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(mockUploadedFiles);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState("expense_data");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid Excel file (.xlsx)");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        fileName: selectedFile.name,
        fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedBy: "Current User",
        status: "processed",
        recordCount: Math.floor(Math.random() * 1000) + 100,
        type: fileType as "expense_data" | "budget_data" | "invoice_data" | "payment_data",
      };

      setUploadedFiles([newFile, ...uploadedFiles]);
      setSelectedFile(null);
      setIsUploading(false);
    }, 2000);
  };

  const handleDelete = (fileId: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <AlertCircle className="w-4 h-4" />;
      case "error":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Excel Upload & Download</h1>
          <p className="text-muted-foreground">
            Upload Excel files for financial data processing and download processed reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Excel File
            </CardTitle>
            <CardDescription>
              Select an Excel file to upload for processing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fileType">File Type</Label>
              <Select value={fileType} onValueChange={setFileType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select file type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense_data">Expense Data</SelectItem>
                  <SelectItem value="budget_data">Budget Data</SelectItem>
                  <SelectItem value="invoice_data">Invoice Data</SelectItem>
                  <SelectItem value="payment_data">Payment Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Select Excel File</Label>
              <Input
                id="file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileSpreadsheet className="w-4 h-4" />
                  {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
                </div>
              )}
            </div>

            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload File
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Reports
            </CardTitle>
            <CardDescription>
              Download processed financial reports and templates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Button variant="outline" className="justify-start">
                <Download className="w-4 h-4 mr-2" />
                Financial Summary Report
              </Button>
              <Button variant="outline" className="justify-start">
                <Download className="w-4 h-4 mr-2" />
                Budget Allocation Template
              </Button>
              <Button variant="outline" className="justify-start">
                <Download className="w-4 h-4 mr-2" />
                Expense Tracking Template
              </Button>
              <Button variant="outline" className="justify-start">
                <Download className="w-4 h-4 mr-2" />
                Invoice Processing Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Files Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Uploaded Files
          </CardTitle>
          <CardDescription>
            View and manage your uploaded Excel files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileSpreadsheet className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{file.fileName}</span>
                      <Badge className={statusColors[file.status]}>
                        {getStatusIcon(file.status)}
                        <span className="ml-1">{file.status}</span>
                      </Badge>
                      <Badge className={fileTypeColors[file.type]}>
                        {file.type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{file.fileSize}</span>
                      <span>•</span>
                      <span>{file.recordCount} records</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {file.uploadDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <UserCircle className="w-3 h-3" />
                        {file.uploadedBy}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
