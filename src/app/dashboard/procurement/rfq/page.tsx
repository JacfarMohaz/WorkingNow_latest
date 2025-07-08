"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  FileText,
  Calendar,
  User,
  Building,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Minus,
  Upload,
  PenTool,
  Stamp,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SignatureUpload } from "@/components/ui/signature-upload";
import { SignatureSection, SingleSignatureSection } from "@/components/ui/signature-section";

type RFQ = {
  id: string;
  title: string;
  description: string;
  status: "draft" | "published" | "closed" | "awarded";
  category: string;
  budget: number;
  deadline: string;
  createdBy: string;
  createdDate: string;
  responses: number;
  supplierCount: number;
};

type RFQItem = {
  id: string;
  description: string;
  quantity: string;
  unitPrice: string;
  totalCost: string;
  remark: string;
};

const mockRFQs: RFQ[] = [
  {
    id: "RFQ-001",
    title: "IT Equipment Supply",
    description: "Supply of laptops, desktops, and networking equipment for office expansion",
    status: "published",
    category: "IT Equipment",
    budget: 50000,
    deadline: "2024-02-15",
    createdBy: "Sarah Johnson",
    createdDate: "2024-01-10",
    responses: 8,
    supplierCount: 12,
  },
  {
    id: "RFQ-002",
    title: "Office Furniture",
    description: "Supply of ergonomic office furniture and accessories",
    status: "closed",
    category: "Furniture",
    budget: 25000,
    deadline: "2024-01-30",
    createdBy: "Mike Chen",
    createdDate: "2024-01-05",
    responses: 5,
    supplierCount: 8,
  },
  {
    id: "RFQ-003",
    title: "Software Licenses",
    description: "Annual software licenses for development and design tools",
    status: "awarded",
    category: "Software",
    budget: 15000,
    deadline: "2024-01-20",
    createdBy: "David Wilson",
    createdDate: "2023-12-15",
    responses: 3,
    supplierCount: 5,
  },
  {
    id: "RFQ-004",
    title: "Marketing Services",
    description: "Digital marketing and advertising services for Q2 campaign",
    status: "draft",
    category: "Services",
    budget: 35000,
    deadline: "2024-03-01",
    createdBy: "Lisa Anderson",
    createdDate: "2024-01-15",
    responses: 0,
    supplierCount: 0,
  },
];

const statusColors = {
  draft: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  published: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  closed: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  awarded: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

const statusIcons = {
  draft: AlertCircle,
  published: Clock,
  closed: CheckCircle,
  awarded: CheckCircle,
};

// Mock NGO data
const mockNGO = {
  name: "Name of the NGO",
  address: "Adress of the Ngo",
  email: "ngo@email.com",
  website: "www.ngowebsite.com",
  logo: "/public/logo.png", // Place a logo in public folder or use a placeholder
};

export default function RFQPage() {
  const [rfqs, setRfqs] = useState<RFQ[]>(mockRFQs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [autoRFQNo, setAutoRFQNo] = useState("");
  const [instructions, setInstructions] = useState(
    `Please quote for supply of the item(s)/Services listed below and send to NGO's email or drop at NGO's name Quotation Box located at NGO's name Programs Office xxxxxxx. Quotation should be received on or before xxxxxx on xxxxxxx. Ensure your quote is on your letter head/stamped and signed.`
  );
  const [items, setItems] = useState<RFQItem[]>([
    { id: "1", description: "", quantity: "", unitPrice: "", totalCost: "", remark: "" },
    { id: "2", description: "", quantity: "", unitPrice: "", totalCost: "", remark: "" },
  ]);
  const [quotationOpenedBy, setQuotationOpenedBy] = useState([
    { id: "1", name: "", signature: null as File | null },
    { id: "2", name: "", signature: null as File | null },
    { id: "3", name: "", signature: null as File | null },
  ]);
  const [supplierSignature, setSupplierSignature] = useState({
    name: "",
    signature: "",
    stamp: "",
  });

  useEffect(() => {
    if (isDialogOpen) {
      // Generate RFQ No: RFQ-YYYYMMDD-XXX
      const now = new Date();
      const yyyymmdd = now.getFullYear().toString() + (now.getMonth()+1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0');
      const rand = Math.floor(100 + Math.random() * 900); // 3 digit random
      setAutoRFQNo(`RFQ-${yyyymmdd}-${rand}`);
    }
  }, [isDialogOpen]);

  const filteredRFQs = rfqs.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || rfq.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || rfq.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDeleteRFQ = (rfqId: string) => {
    setRfqs(rfqs.filter(rfq => rfq.id !== rfqId));
  };

  const addItem = () => {
    const newId = (items.length + 1).toString();
    setItems([...items, { id: newId, description: "", quantity: "", unitPrice: "", totalCost: "", remark: "" }]);
  };

  const removeItem = (itemId: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  const updateItem = (itemId: string, field: keyof RFQItem, value: string) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, [field]: value };
        
        // Calculate total cost if quantity and unit price are both filled
        if (field === 'quantity' || field === 'unitPrice') {
          const qty = field === 'quantity' ? value : item.quantity;
          const price = field === 'unitPrice' ? value : item.unitPrice;
          if (qty && price) {
            const total = parseFloat(qty) * parseFloat(price);
            updatedItem.totalCost = isNaN(total) ? "" : total.toFixed(2);
          } else {
            updatedItem.totalCost = "";
          }
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const handleQuotationOpenedByUpdate = (id: string, field: 'name' | 'signature', value: string | File | null) => {
    setQuotationOpenedBy(quotationOpenedBy.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleSupplierSignatureUpdate = (field: 'name' | 'signature' | 'stamp', value: string) => {
    setSupplierSignature({ ...supplierSignature, [field]: value });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request for Quotation (RFQ)</h1>
          <p className="text-muted-foreground">
            Create and manage requests for quotations from suppliers
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New RFQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl w-full p-0 bg-background">
            <div className="overflow-y-auto max-h-[90vh] rounded-lg shadow-lg bg-background p-6">
              {/* NGO Branding */}
              <div className="flex flex-col items-center gap-2 mb-4">
                {mockNGO.logo && (
                  <img src={mockNGO.logo} alt="NGO Logo" className="h-12 w-12 object-contain mb-1" />
                )}
                <div className="text-lg font-semibold text-center">{mockNGO.name}</div>
                <div className="text-xs text-muted-foreground text-center">{mockNGO.address}</div>
                <div className="text-xs text-muted-foreground text-center">Email: {mockNGO.email}</div>
                <div className="text-xs text-muted-foreground text-center">Website: {mockNGO.website}</div>
              </div>
              <div className="text-center font-bold text-lg mb-2">Request for Quotation</div>
              {/* Form Fields - match image layout strictly */}
              <form className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Date:</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>RFQ No:</Label>
                    <Input value={autoRFQNo} readOnly className="bg-muted/50 cursor-not-allowed" />
                  </div>
                </div>
                  <div className="flex-1">
                    <Label>RFQ Name:</Label>
                    <Input placeholder="Enter RFQ title or project name" />
                  </div>
                <div>
                  <Label>Supplier Name:</Label>
                  <Input placeholder="Enter supplier or company name" />
                </div>
                <div>
                  <Label>Instructions:</Label>
                  <Textarea 
                    rows={3} 
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="resize-none" 
                    placeholder="Enter instructions for suppliers..."
                  />
                </div>
                {/* Table for items */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Items</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addItem}
                      className="h-7 text-xs"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Item
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border text-xs">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border p-1">No</th>
                          <th className="border p-1">Item Description</th>
                          <th className="border p-1">Qty</th>
                          <th className="border p-1">Unit Price</th>
                          <th className="border p-1">Total Cost</th>
                          <th className="border p-1">Remark/Comment</th>
                          <th className="border p-1">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, index) => (
                          <tr key={item.id}>
                            <td className="border p-1 text-center">{index + 1}</td>
                            <td className="border p-1">
                              <Input 
                                className="h-7 text-xs" 
                                value={item.description}
                                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                placeholder="Item description"
                              />
                            </td>
                            <td className="border p-1">
                              <Input 
                                className="h-7 text-xs" 
                                value={item.quantity}
                                onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                                placeholder="Qty"
                                type="number"
                              />
                            </td>
                            <td className="border p-1">
                              <Input 
                                className="h-7 text-xs" 
                                value={item.unitPrice}
                                onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
                                placeholder="Price"
                                type="number"
                              />
                            </td>
                            <td className="border p-1">
                              <Input 
                                className="h-7 text-xs bg-muted/50" 
                                value={item.totalCost}
                                readOnly 
                              />
                            </td>
                            <td className="border p-1">
                              <Input 
                                className="h-7 text-xs" 
                                value={item.remark}
                                onChange={(e) => updateItem(item.id, 'remark', e.target.value)}
                                placeholder="Remark"
                              />
                            </td>
                            <td className="border p-1 text-center">
                              {items.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Instructions List */}
                <div className="mt-2">
                  <Label>Instructions:</Label>
                  <ol className="list-decimal pl-5 text-xs text-muted-foreground space-y-1">
                    <li>All Quoted Prices should be inclusive of VAT (local, state or federal tax)</li>
                    <li>The quotation should include all costs for the delivery of goods/services to user destination.</li>
                    <li>The quotation should be dully filled and signed by an authorized officer.</li>
                    <li>Return the original copy of the quotation before the closing date and time indicated.</li>
                    <li>Please quote: <span className="font-semibold">project code</span> as the subject of your email or drop it in the quotation box.</li>
                    <li>Our payment terms are xxxx-day credit term.</li>
                  </ol>
                </div>
                {/* Quotation Opened By & Supplier Signature */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                  <SignatureSection
                    title="Quotation Opened by"
                    people={quotationOpenedBy}
                    onPersonUpdate={handleQuotationOpenedByUpdate}
                  />
                  
                  <SingleSignatureSection
                    title="Supplier Signature & Stamp"
                    name={supplierSignature.name}
                    signature={supplierSignature.signature}
                    stamp={supplierSignature.stamp}
                    showStamp={true}
                    onUpdate={handleSupplierSignatureUpdate}
                  />
                </div>
                {/* Save/Cancel Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
                placeholder="Search RFQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="awarded">Awarded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="IT Equipment">IT Equipment</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Software">Software</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setCategoryFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* RFQs List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All RFQs ({filteredRFQs.length})
          </CardTitle>
          <CardDescription>
            View and manage your requests for quotations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRFQs.map((rfq) => {
              const StatusIcon = statusIcons[rfq.status];
              
              return (
                <div
                  key={rfq.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{rfq.title}</span>
                        <Badge className={statusColors[rfq.status]}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {rfq.status}
                        </Badge>
                        <Badge variant="outline">
                          {rfq.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rfq.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ${rfq.budget.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Due: {rfq.deadline}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {rfq.createdBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {rfq.responses} responses
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteRFQ(rfq.id)}
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

