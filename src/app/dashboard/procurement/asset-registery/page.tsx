"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2, Download, CheckCircle, AlertCircle, Package } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

// Mock data for asset registry records
const mockAssets = [
  {
    id: "AST-001",
    assetName: "Laptop Dell XPS 13",
    assetCode: "LAP001",
    category: "Electronics",
    location: "Office A",
    purchaseDate: "2024-01-15",
    purchasePrice: 1200.0,
    currentValue: 900.0,
    status: "In Use",
    assignedTo: "John Doe",
    supplier: "Tech Solutions Ltd",
  },
  {
    id: "AST-002",
    assetName: "Office Desk",
    assetCode: "FUR001",
    category: "Furniture",
    location: "Office B",
    purchaseDate: "2024-02-20",
    purchasePrice: 500.0,
    currentValue: 450.0,
    status: "In Use",
    assignedTo: "Jane Smith",
    supplier: "Office Furniture Co",
  },
  {
    id: "AST-003",
    assetName: "Projector Epson",
    assetCode: "PRJ001",
    category: "Electronics",
    location: "Conference Room",
    purchaseDate: "2024-03-10",
    purchasePrice: 800.0,
    currentValue: 600.0,
    status: "Maintenance",
    assignedTo: "IT Department",
    supplier: "AV Equipment Ltd",
  },
];

export default function AssetRegistryPage() {
  const [assets, setAssets] = useState(mockAssets);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleDownloadTemplate = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = '/asset-registry-template.xlsx';
    link.download = 'asset-registry-template.xlsx';
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
      
      // Mock: Add a new asset record
      setTimeout(() => {
        setAssets([
          {
            id: `AST-${Date.now()}`,
            assetName: "New Asset",
            assetCode: `AST${Date.now()}`,
            category: "Equipment",
            location: "Main Office",
            purchaseDate: new Date().toISOString().split('T')[0],
            purchasePrice: 1000.0,
            currentValue: 950.0,
            status: "In Use",
            assignedTo: "New Employee",
            supplier: "General Supplier",
          },
          ...assets,
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Asset Registry</h1>
        <p className="text-muted-foreground">Create, manage, and track organizational assets using templates and documents</p>
      </div>

      {/* Excel Workflow Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Create New Asset Record
          </CardTitle>
          <CardDescription>
            Download the template, fill it out, and upload your completed asset registry document
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
                  Get the standardized asset registry template with all required fields
                </p>
              </div>
            </div>
            <Button 
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Download className="h-4 w-4" />
              📥 Download Asset Registry Template
            </Button>
          </div>

          {/* Step 2: Upload Completed File */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
              </div>
              <div>
                <h3 className="font-medium">Upload your Asset Registry Form</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your completed asset registry document (Excel, PDF, Word, images, etc.)
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
                  📤 Upload your Asset Registry Form
                </Label>
              </div>

              {/* Upload Status */}
              {uploadStatus === 'success' && (
                <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    File uploaded successfully! Processing your asset registry...
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
              <li>• Download the asset registry template using the button above</li>
              <li>• Fill out all required asset information in the template</li>
              <li>• Include asset details like name, code, category, location, purchase details</li>
              <li>• Save your document in any supported format</li>
              <li>• Upload the completed document using the upload button</li>
              <li>• The system will process your asset registry automatically</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Asset Registry Records Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Asset Registry Records ({assets.length})
              </CardTitle>
              <CardDescription>
                All registered assets and their current status
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Asset Code</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Purchase Price</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.assetName}</TableCell>
                    <TableCell>{asset.assetCode}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>{asset.purchaseDate}</TableCell>
                    <TableCell>${asset.purchasePrice.toLocaleString()}</TableCell>
                    <TableCell>${asset.currentValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        asset.status === 'In Use' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : asset.status === 'Maintenance'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {asset.status}
                      </span>
                    </TableCell>
                    <TableCell>{asset.assignedTo}</TableCell>
                    <TableCell>{asset.supplier}</TableCell>
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
          {assets.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <Package className="mx-auto mb-2 h-8 w-8" />
              <p>No asset registry records found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 