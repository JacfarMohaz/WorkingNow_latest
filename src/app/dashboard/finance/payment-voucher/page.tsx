"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  FileText,
  Calendar,
  Filter,
  Download,
  Send,
  Printer,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
} from "lucide-react";

// Mock data for payment vouchers (matching modal fields)
const mockVouchers = [
  {
    id: "PV-001",
    serialNumber: "PV-2025-0012",
    paidTo: "Abdi Ali",
    date: "2024-06-01",
    amount: 1200.00,
    currency: "USD",
    chequeNo: "CHQ-12345",
    being: "Office supplies purchase",
    status: "paid",
  },
  {
    id: "PV-002",
    serialNumber: "PV-2025-0013",
    paidTo: "Maryan Hassan",
    date: "2024-06-03",
    amount: 800.00,
    currency: "USD",
    chequeNo: "CHQ-12346",
    being: "Travel reimbursement",
    status: "pending",
  },
  {
    id: "PV-003",
    serialNumber: "PV-2025-0014",
    paidTo: "Ahmed Noor",
    date: "2024-06-05",
    amount: 500.00,
    currency: "USD",
    chequeNo: "CHQ-12347",
    being: "Consultancy fee",
    status: "draft",
  },
];

const statusColors = {
  paid: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  draft: "bg-muted/10 text-muted-foreground border-muted/20",
  cancelled: "bg-error/10 text-error border-error/20",
};

// --- MOCK DATA FOR NGO & USER ---
const mockNgo = {
  name: "Sample NGO Organization",
  logoUrl: "/window.svg", // Use a public asset or placeholder
  address: "ABC Road, P.O. Box 000000, XYZ",
  email: "ngo@example.com",
  phone: "+0000 0 000000",
  fax: "+0000 0 000000",
  website: "www.ngo-website.com",
};
const mockUser = {
  name: "Amina Yusuf",
  role: "Finance Officer",
};

export default function InvoiceManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // Signature upload state
  const [preparedSignature, setPreparedSignature] = useState<File | null>(null);
  const [approvedSignature, setApprovedSignature] = useState<File | null>(null);

  // Use mockVouchers for table
  const [vouchers] = useState(mockVouchers);

  // Filter invoices based on search and filters
  const filteredInvoices = mockVouchers.filter((invoice) => {
    const matchesSearch = 
      invoice.paidTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.being.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    const matchesType = typeFilter === "all" || invoice.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-error" />;
      case "draft":
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-error" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Dropzone component
  function SignatureDropzone({ label, file, setFile }: { label: string, file: File | null, setFile: (f: File | null) => void }) {
    const inputId = label.replace(/\s+/g, '-').toLowerCase();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) setFile(f);
    };
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        setFile(e.dataTransfer.files[0]);
      }
    };
    const handleRemove = () => setFile(null);
    return (
      <div className="flex flex-col gap-1 w-full">
        <Label className="text-xs mb-1 flex items-center gap-1"><Upload className="w-4 h-4 text-primary" /> {label}</Label>
        <label
          htmlFor={inputId}
          className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/40 rounded-lg p-4 cursor-pointer transition hover:border-primary focus-within:border-primary bg-muted/30 min-h-[120px] text-center"
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          {file ? (
            <div className="flex flex-col items-center gap-2">
              {file.type.startsWith('image') ? (
                <img src={URL.createObjectURL(file)} alt="Signature preview" className="h-16 object-contain rounded border" />
              ) : (
                <span className="text-sm font-medium">{file.name}</span>
              )}
              <Button type="button" size="sm" variant="ghost" onClick={handleRemove}>Remove</Button>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm font-medium">Click to upload or drag and drop</span>
              <span className="text-xs text-muted-foreground">PNG, JPG, JPEG up to 5MB</span>
            </>
          )}
          <input
            id={inputId}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Payment Voucher</h1>
        <p className="text-muted-foreground">Create, manage, and track all payment vouchers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Payment Vouchers</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockVouchers.length}</div>
            <div className="flex items-center text-xs text-success mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              +3 this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${mockVouchers.reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-success mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              +15% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid Payment Vouchers</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockVouchers.filter(invoice => invoice.status === "paid").length}
            </div>
            <div className="flex items-center text-xs text-success mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              67% paid rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockVouchers.filter(invoice => invoice.status === "overdue").length}
            </div>
            <div className="flex items-center text-xs text-error mt-1">
              <AlertCircle className="h-3 w-3 mr-1" />
              Requires attention
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Payment Voucher Dialog */}
      <div className="flex justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Payment Voucher
            </Button>
          </DialogTrigger>
          <DialogContent
            className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl w-full p-0 bg-background flex items-center justify-center"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '0',
            }}
          >
            <div
              className="w-full overflow-y-auto max-h-[90vh] rounded-lg shadow-lg bg-background"
              style={{
                // Ensures modal content is scrollable and not cut off
                minHeight: 0,
              }}
            >
              <form className="w-full" onSubmit={e => { e.preventDefault(); setIsAddDialogOpen(false); }}>
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b px-6 pt-6 pb-2 gap-4">
                  <div className="flex items-center gap-4">
                    <img src={mockNgo.logoUrl} alt="NGO Logo" className="h-12 w-12 rounded bg-muted object-contain" />
                    <div>
                      <h2 className="text-xl font-bold text-foreground leading-tight">{mockNgo.name}</h2>
                      <div className="text-xs text-muted-foreground">{mockNgo.address}</div>
                      <div className="text-xs text-muted-foreground">Email: {mockNgo.email} | Tel: {mockNgo.phone}</div>
                      <div className="text-xs text-muted-foreground">Fax: {mockNgo.fax} | Web: {mockNgo.website}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                    <Label htmlFor="invoice-date" className="text-xs">Date</Label>
                    <Input id="invoice-date" type="date" className="w-36" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
                {/* SERIAL NUMBER FIELD */}
                <div className="px-6 pt-4 flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-2 max-w-xs">
                    <Label htmlFor="serial-number">Serial Number</Label>
                    <Input id="serial-number" value="INV-2025-0012" readOnly className="bg-muted-foreground/5 cursor-not-allowed" />
                  </div>
                </div>
                {/* PAID TO FIELD */}
                <div className="px-6 pt-4">
                  <Label htmlFor="payee">Paid to</Label>
                  <Input id="payee" placeholder="Enter payee name" />
                </div>
                {/* AMOUNT FIELD */}
                <div className="px-6 pt-4">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="flex gap-2">
                    <Input id="amount" type="number" min="0" step="0.01" placeholder="0.00" className="w-2/3" />
                    <Select>
                      <SelectTrigger className="w-1/3">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD – US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR – Euro</SelectItem>
                        <SelectItem value="GBP">GBP – British Pound</SelectItem>
                        <SelectItem value="AED">AED – UAE Dirham</SelectItem>
                        <SelectItem value="SOS">SOS – Somali Shilling</SelectItem>
                        <SelectItem value="KES">KES – Kenyan Shilling</SelectItem>
                        <SelectItem value="NGN">NGN – Nigerian Naira</SelectItem>
                        <SelectItem value="INR">INR – Indian Rupee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* MAIN FORM FIELDS */}
                <div className="px-6 pt-6 grid gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="cheque-no">By Cash/Cheque No.</Label>
                      <Input id="cheque-no" placeholder="Cheque or payment reference" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="being">Being</Label>
                    <Textarea id="being" placeholder="Payment reason or description" />
                  </div>
                </div>
                {/* FOOTER SIGNATURES & PROJECT STAMP - ALL IN ONE LINE */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 pt-8 pb-6 border-t mt-8">
                  {/* Prepared By */}
                  <div className="flex flex-col items-center w-full">
                    <Label className="text-xs mb-1">Prepared By</Label>
                    <div className="text-sm font-medium text-foreground border-b border-dashed border-muted-foreground w-32 text-center pb-1">{mockUser.name}</div>
                    <div className="w-full mt-2">
                      <SignatureDropzone label="Upload Signature" file={preparedSignature} setFile={setPreparedSignature} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{mockUser.role}</div>
                  </div>
                  {/* Approved By */}
                  <div className="flex flex-col items-center w-full">
                    <Label className="text-xs mb-1">Approved By</Label>
                    <div className="text-sm font-medium text-foreground border-b border-dashed border-muted-foreground w-32 text-center pb-1">Finance Head</div>
                    <div className="w-full mt-2">
                      <SignatureDropzone label="Upload Signature" file={approvedSignature} setFile={setApprovedSignature} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">(No input required)</div>
                  </div>
                  {/* Received By (Customer Name) */}
                  <div className="flex flex-col items-center">
                    <Label className="text-xs mb-1">Received By</Label>
                    <div className="w-32 mt-4">
                      <div className="border-b border-dashed border-muted-foreground h-6 flex items-end justify-center">
                        <span className="text-xs text-muted-foreground">Name</span>
                      </div>
                    </div>
                    <div className="w-32 mt-4">
                      <div className="border-b border-dashed border-muted-foreground h-6 flex items-end justify-center">
                        <span className="text-xs text-muted-foreground">Signature</span>
                      </div>
                    </div>
                  </div>
                  {/* Project Stamp */}
                  <div className="flex flex-col items-center">
                    <Label className="text-xs mb-1">Project Stamp</Label>
                    <Input id="project-stamp" type="file" accept=".pdf,image/*" className="w-32 mt-1" />
                  </div>
                </div>
                {/* ACTION BUTTONS */}
                <div className="flex justify-end gap-2 px-6 pb-6">
                  <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Payment Voucher
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by payee name or serial number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type-filter">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="subscription">Subscription</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Vouchers Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Payment Voucher ({vouchers.length})
              </CardTitle>
              <CardDescription>
                All payment vouchers and their current status
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="vuexy-table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serial #</TableHead>
                  <TableHead>Paid To</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Cheque No</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vouchers.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell>{voucher.serialNumber}</TableCell>
                    <TableCell>{voucher.paidTo}</TableCell>
                    <TableCell>{new Date(voucher.date).toLocaleDateString()}</TableCell>
                    <TableCell>{voucher.currency} {voucher.amount.toLocaleString()}</TableCell>
                    <TableCell>{voucher.chequeNo}</TableCell>
                    <TableCell>{voucher.being}</TableCell>
                    <TableCell>
                      <Badge className={`capitalize ${statusColors[voucher.status as keyof typeof statusColors]}`}>
                        {voucher.status}
                      </Badge>
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
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
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
          {vouchers.length === 0 && (
            <div className="vuexy-table-empty">
              <FileText className="vuexy-table-empty-icon" />
              <p>No payment vouchers found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 