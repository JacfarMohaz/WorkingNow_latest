"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileSpreadsheet,
  Calendar,
  User,
  HardDrive,
} from "lucide-react";

type Document = {
  id: string;
  name: string;
  type: "pdf" | "doc" | "xlsx" | "ppt" | "image" | "video" | "audio" | "archive" | "other";
  size: string;
  uploadDate: string;
  uploadedBy: string;
  description: string;
  tags: string[];
  downloadCount: number;
};

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Project_Requirements.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    uploadedBy: "Sarah Johnson",
    description: "Detailed project requirements and specifications",
    tags: ["requirements", "project", "specifications"],
    downloadCount: 15,
  },
  {
    id: "2",
    name: "Budget_Report_2024.xlsx",
    type: "xlsx",
    size: "1.8 MB",
    uploadDate: "2024-01-14",
    uploadedBy: "Mike Chen",
    description: "Annual budget report and financial analysis",
    tags: ["budget", "finance", "report"],
    downloadCount: 8,
  },
  {
    id: "3",
    name: "Team_Meeting_Notes.docx",
    type: "doc",
    size: "0.5 MB",
    uploadDate: "2024-01-13",
    uploadedBy: "David Wilson",
    description: "Minutes from the weekly team meeting",
    tags: ["meeting", "notes", "team"],
    downloadCount: 12,
  },
  {
    id: "4",
    name: "Product_Presentation.pptx",
    type: "ppt",
    size: "5.2 MB",
    uploadDate: "2024-01-12",
    uploadedBy: "Lisa Anderson",
    description: "Product launch presentation slides",
    tags: ["presentation", "product", "launch"],
    downloadCount: 25,
  },
  {
    id: "5",
    name: "Logo_Design.png",
    type: "image",
    size: "0.8 MB",
    uploadDate: "2024-01-11",
    uploadedBy: "John Smith",
    description: "Company logo design files",
    tags: ["design", "logo", "branding"],
    downloadCount: 6,
  },
  {
    id: "6",
    name: "Database_Backup.zip",
    type: "archive",
    size: "15.7 MB",
    uploadDate: "2024-01-10",
    uploadedBy: "Admin User",
    description: "Weekly database backup archive",
    tags: ["backup", "database", "archive"],
    downloadCount: 3,
  },
];

const fileTypeColors = {
  pdf: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  doc: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  xlsx: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  ppt: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  image: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  video: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  audio: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  archive: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

const fileTypeIcons = {
  pdf: FileText,
  doc: FileText,
  xlsx: FileSpreadsheet,
  ppt: FileText,
  image: FileImage,
  video: FileVideo,
  audio: FileAudio,
  archive: FileArchive,
  other: FileText,
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [uploaderFilter, setUploaderFilter] = useState<string>("all");

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadName, setUploadName] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadTags, setUploadTags] = useState("");
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadName(file.name.replace(/\.[^/.]+$/, ""));
      setUploadStatus('idle');
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !uploadName) {
      setUploadStatus('error');
      return;
    }
    // Determine file type
    const ext = selectedFile.name.split('.').pop()?.toLowerCase() || 'other';
    let type: Document['type'] = 'other';
    if (["pdf"].includes(ext)) type = "pdf";
    else if (["doc", "docx"].includes(ext)) type = "doc";
    else if (["xlsx", "xls", "csv"].includes(ext)) type = "xlsx";
    else if (["ppt", "pptx"].includes(ext)) type = "ppt";
    else if (["png", "jpg", "jpeg", "gif", "bmp", "svg"].includes(ext)) type = "image";
    else if (["mp4", "avi", "mov", "wmv", "mkv"].includes(ext)) type = "video";
    else if (["mp3", "wav", "ogg", "aac"].includes(ext)) type = "audio";
    else if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) type = "archive";
    // Add document to list
    setDocuments([
      {
        id: Date.now().toString(),
        name: selectedFile.name,
        type,
        size: (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB",
        uploadDate: new Date().toISOString().split('T')[0],
        uploadedBy: "Current User",
        description: uploadDescription,
        tags: uploadTags.split(",").map(t => t.trim()).filter(Boolean),
        downloadCount: 0,
      },
      ...documents,
    ]);
    setUploadStatus('success');
    setSelectedFile(null);
    setUploadName("");
    setUploadDescription("");
    setUploadTags("");
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === "all" || document.type === typeFilter;
    const matchesUploader = uploaderFilter === "all" || document.uploadedBy === uploaderFilter;
    return matchesSearch && matchesType && matchesUploader;
  });

  const handleDeleteDocument = (documentId: string) => {
    setDocuments(documents.filter(document => document.id !== documentId));
  };

  const handleDownload = (documentId: string) => {
    // Simulate download
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      setDocuments(documents.map(doc => 
        doc.id === documentId 
          ? { ...doc, downloadCount: doc.downloadCount + 1 }
          : doc
      ));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">
          Upload, manage, and organize your documents
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Document
          </CardTitle>
          <CardDescription>
            Select a file and fill in the details to upload a new document
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.xlsx,.xls,.csv,.ppt,.pptx,.png,.jpg,.jpeg,.gif,.bmp,.svg,.mp4,.avi,.mov,.wmv,.mkv,.mp3,.wav,.ogg,.aac,.zip,.rar,.7z,.tar,.gz"
              onChange={handleFileChange}
              className="max-w-xs"
            />
            {selectedFile && (
              <span className="text-sm text-muted-foreground">Selected file: {selectedFile.name}</span>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              placeholder="Document name"
              value={uploadName}
              onChange={e => setUploadName(e.target.value)}
              disabled={!selectedFile}
            />
            <Input
              placeholder="Tags (comma separated)"
              value={uploadTags}
              onChange={e => setUploadTags(e.target.value)}
              disabled={!selectedFile}
            />
            <Input
              placeholder="Description"
              value={uploadDescription}
              onChange={e => setUploadDescription(e.target.value)}
              disabled={!selectedFile}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleUpload} disabled={!selectedFile || !uploadName}>
              <Upload className="w-4 h-4" />
              Upload
            </Button>
            {uploadStatus === 'success' && (
              <span className="text-green-600 text-sm">Upload successful!</span>
            )}
            {uploadStatus === 'error' && (
              <span className="text-red-600 text-sm">Please select a file and enter a name.</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">Word</SelectItem>
                <SelectItem value="xlsx">Excel</SelectItem>
                <SelectItem value="ppt">PowerPoint</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="archive">Archives</SelectItem>
              </SelectContent>
            </Select>
            <Select value={uploaderFilter} onValueChange={setUploaderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by uploader" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Uploaders</SelectItem>
                <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                <SelectItem value="Mike Chen">Mike Chen</SelectItem>
                <SelectItem value="David Wilson">David Wilson</SelectItem>
                <SelectItem value="Lisa Anderson">Lisa Anderson</SelectItem>
                <SelectItem value="John Smith">John Smith</SelectItem>
                <SelectItem value="Admin User">Admin User</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setTypeFilter("all");
              setUploaderFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All Documents ({filteredDocuments.length})
          </CardTitle>
          <CardDescription>
            View and manage your uploaded documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((document) => {
              const FileIcon = fileTypeIcons[document.type];
              
              return (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{document.name}</span>
                        <Badge className={fileTypeColors[document.type]}>
                          {document.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{document.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3" />
                          {document.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {document.uploadedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {document.uploadDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {document.downloadCount} downloads
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {document.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDownload(document.id)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteDocument(document.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
