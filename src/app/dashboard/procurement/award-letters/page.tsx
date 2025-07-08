"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Eye, Edit, Trash2, FileText } from "lucide-react";

const mockAwards = [
  {
    id: "1",
    name: "Award_Letter_ProjectA.pdf",
    type: "pdf",
    size: "0.7 MB",
    uploadDate: "2024-06-01",
    uploadedBy: "Admin User",
    description: "Award letter for Project A",
    tags: ["award", "projectA"],
    downloadCount: 2,
  },
  {
    id: "2",
    name: "Regret_Letter_ProjectB.docx",
    type: "doc",
    size: "0.5 MB",
    uploadDate: "2024-06-02",
    uploadedBy: "Admin User",
    description: "Regret letter for Project B",
    tags: ["regret", "projectB"],
    downloadCount: 1,
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
  xlsx: FileText,
  ppt: FileText,
  image: FileText,
  video: FileText,
  audio: FileText,
  archive: FileText,
  other: FileText,
};

export default function AwardLettersPage() {
  const [awards, setAwards] = useState(mockAwards);
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
    const ext = selectedFile.name.split('.').pop()?.toLowerCase() || 'other';
    let type = 'other';
    if (["pdf"].includes(ext)) type = "pdf";
    else if (["doc", "docx"].includes(ext)) type = "doc";
    else if (["xlsx", "xls", "csv"].includes(ext)) type = "xlsx";
    else if (["ppt", "pptx"].includes(ext)) type = "ppt";
    setAwards([
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
      ...awards,
    ]);
    setUploadStatus('success');
    setSelectedFile(null);
    setUploadName("");
    setUploadDescription("");
    setUploadTags("");
  };

  const handleDownload = (id: string) => {
    setAwards(awards.map(a => a.id === id ? { ...a, downloadCount: a.downloadCount + 1 } : a));
  };

  const handleDelete = (id: string) => {
    setAwards(awards.filter(a => a.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Award & Regret Letters</h1>
        <p className="text-muted-foreground">Upload, manage, and organize award and regret letters</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Award/Regret Letter
          </CardTitle>
          <CardDescription>
            Select a file and fill in the details to upload a new award or regret letter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.xlsx,.xls,.csv,.ppt,.pptx"
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All Award/Regret Letters ({awards.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {awards.map((doc) => {
              const FileIcon = fileTypeIcons[doc.type] || FileText;
              return (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{doc.name}</span>
                        <Badge className={fileTypeColors[doc.type] || fileTypeColors.other}>
                          {doc.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{doc.size}</span>
                        <span>{doc.uploadedBy}</span>
                        <span>{doc.uploadDate}</span>
                        <span>{doc.downloadCount} downloads</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {doc.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleDownload(doc.id)}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
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