"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  File, 
  FileImage, 
  FileSpreadsheet, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
} from "lucide-react";

type Document = {
  id: string;
  title: string;
  description: string;
  category: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedBy: string;
  uploadDate: string;
  status: "active" | "archived" | "pending";
  tags: string[];
};

const mockDocuments: Document[] = [
  {
    id: "DOC-001",
    title: "Annual Financial Report 2024",
    description: "Complete annual financial report for the year 2024",
    category: "Financial Reports",
    fileName: "annual_report_2024.pdf",
    fileSize: "2.5 MB",
    fileType: "pdf",
    uploadedBy: "Sarah Johnson",
    uploadDate: "2024-01-15",
    status: "active",
    tags: ["annual", "financial", "report"],
  },
  {
    id: "DOC-002",
    title: "Budget Allocation Q1",
    description: "First quarter budget allocation document",
    category: "Budget Documents",
    fileName: "budget_q1_2024.xlsx",
    fileSize: "1.2 MB",
    fileType: "xlsx",
    uploadedBy: "Mike Chen",
    uploadDate: "2024-01-10",
    status: "active",
    tags: ["budget", "q1", "allocation"],
  },
  {
    id: "DOC-003",
    title: "Bank Statement March 2024",
    description: "Bank statement for March 2024",
    category: "Bank Documents",
    fileName: "bank_statement_march.pdf",
    fileSize: "3.1 MB",
    fileType: "pdf",
    uploadedBy: "Lisa Anderson",
    uploadDate: "2024-03-01",
    status: "active",
    tags: ["bank", "statement", "march"],
  },
  {
    id: "DOC-004",
    title: "Invoice Template",
    description: "Standard invoice template for the organization",
    category: "Templates",
    fileName: "invoice_template.docx",
    fileSize: "0.8 MB",
    fileType: "docx",
    uploadedBy: "David Wilson",
    uploadDate: "2024-02-20",
    status: "active",
    tags: ["template", "invoice"],
  },
  {
    id: "DOC-005",
    title: "Expense Receipts Q1",
    description: "Scanned expense receipts for Q1 2024",
    category: "Receipts",
    fileName: "expense_receipts_q1.zip",
    fileSize: "15.2 MB",
    fileType: "zip",
    uploadedBy: "Fatima Mohamed",
    uploadDate: "2024-04-01",
    status: "pending",
    tags: ["expense", "receipts", "q1"],
  },
];

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

const statusIcons = {
  active: CheckCircle,
  archived: AlertCircle,
  pending: Clock,
};

const fileTypeIcons = {
  pdf: FileText,
  xlsx: FileSpreadsheet,
  docx: FileText,
  jpg: FileImage,
  png: FileImage,
  zip: File,
  default: FileText,
};

export default function GeneralDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [documentCategory, setDocumentCategory] = useState("");
  const [documentTags, setDocumentTags] = useState("");

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories for filter dropdown
  const uniqueCategories = Array.from(new Set(documents.map(doc => doc.category)));

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleUploadDocument = () => {
    if (uploadedFile && documentTitle && documentCategory) {
      const newDocument: Document = {
        id: `DOC-${Date.now()}`,
        title: documentTitle,
        description: documentDescription,
        category: documentCategory,
        fileName: uploadedFile.name,
        fileSize: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        fileType: uploadedFile.name.split('.').pop()?.toLowerCase() || 'default',
        uploadedBy: "Current User",
        uploadDate: new Date().toISOString().split('T')[0],
        status: "active",
        tags: documentTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };

      setDocuments([newDocument, ...documents]);
      
      // Reset form
      setUploadedFile(null);
      setDocumentTitle("");
      setDocumentDescription("");
      setDocumentCategory("");
      setDocumentTags("");
      setIsDialogOpen(false);
    }
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
  };

  const getFileTypeIcon = (fileType: string) => {
    const IconComponent = fileTypeIcons[fileType as keyof typeof fileTypeIcons] || fileTypeIcons.default;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">General Documents</h1>
          <p className="text-muted-foreground">
            Upload and manage all finance-related documents
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Select File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
                />
                {uploadedFile && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Selected: {uploadedFile.name}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="title">Document Title</Label>
                <Input
                  id="title"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  placeholder="Enter document title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={documentDescription}
                  onChange={(e) => setDocumentDescription(e.target.value)}
                  placeholder="Enter document description"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={documentCategory} onValueChange={setDocumentCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Financial Reports">Financial Reports</SelectItem>
                    <SelectItem value="Budget Documents">Budget Documents</SelectItem>
                    <SelectItem value="Bank Documents">Bank Documents</SelectItem>
                    <SelectItem value="Templates">Templates</SelectItem>
                    <SelectItem value="Receipts">Receipts</SelectItem>
                    <SelectItem value="Invoices">Invoices</SelectItem>
                    <SelectItem value="Contracts">Contracts</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={documentTags}
                  onChange={(e) => setDocumentTags(e.target.value)}
                  placeholder="e.g., annual, financial, report"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleUploadDocument} disabled={!uploadedFile || !documentTitle || !documentCategory}>
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All Documents ({filteredDocuments.length})
          </CardTitle>
          <CardDescription>
            View and manage all uploaded finance documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>File Info</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => {
                  const StatusIcon = statusIcons[doc.status];
                  
                  return (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {getFileTypeIcon(doc.fileType)}
                          </div>
                          <div>
                            <div className="font-medium">{doc.title}</div>
                            <div className="text-sm text-muted-foreground">{doc.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{doc.fileName}</div>
                          <div className="text-muted-foreground">{doc.fileSize}</div>
                        </div>
                      </TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[doc.status]}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {doc.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{doc.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0 text-error hover:text-error"
                            onClick={() => handleDeleteDocument(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {filteredDocuments.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <FileText className="mx-auto mb-2 h-8 w-8" />
              <p>No documents found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 