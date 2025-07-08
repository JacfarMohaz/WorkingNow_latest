"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  ShoppingCart,
  Minus,
} from "lucide-react";
import { SignatureUpload } from "@/components/ui/signature-upload";

type PurchaseRequisition = {
  id: string;
  title: string;
  description: string;
  status: "draft" | "submitted" | "approved" | "rejected" | "completed";
  category: string;
  estimatedCost: number;
  requestedBy: string;
  department: string;
  requestDate: string;
  priority: "low" | "medium" | "high" | "urgent";
  items: number;
  justification: string;
  urgency: string;
  budgetSource: string;
  approvedBy?: string;
  approvedDate?: string;
};

// Mock data for purchase requisitions
const mockRequisitions: PurchaseRequisition[] = [
  {
    id: "PR-001",
    title: "Office Supplies Request",
    description: "Monthly office supplies including paper, pens, and stationery",
    status: "approved",
    category: "Office Supplies",
    estimatedCost: 2500,
    requestedBy: "Sarah Johnson",
    department: "Administration",
    requestDate: "2024-01-15",
    priority: "medium",
    items: 15,
    justification: "Monthly office supplies needed for daily operations",
    urgency: "Normal",
    budgetSource: "Administrative Budget",
    approvedBy: "Fatima Mohamed",
    approvedDate: "2024-01-16",
  },
  {
    id: "PR-002",
    title: "IT Equipment Purchase",
    description: "New laptops and monitors for the development team",
    status: "submitted",
    category: "IT Equipment",
    estimatedCost: 45000,
    requestedBy: "Mike Chen",
    department: "Engineering",
    requestDate: "2024-01-14",
    priority: "high",
    items: 8,
    justification: "Development team needs new equipment for upcoming projects",
    urgency: "High",
    budgetSource: "Project Budget",
  },
  {
    id: "PR-003",
    title: "Marketing Materials",
    description: "Printing materials for Q1 marketing campaign",
    status: "draft",
    category: "Marketing",
    estimatedCost: 8000,
    requestedBy: "Lisa Anderson",
    department: "Marketing",
    requestDate: "2024-01-13",
    priority: "low",
    items: 5,
    justification: "Q1 marketing campaign requires printed materials",
    urgency: "Normal",
    budgetSource: "Marketing Budget",
  },
  {
    id: "PR-004",
    title: "Software Licenses",
    description: "Annual renewal of development software licenses",
    status: "completed",
    category: "Software",
    estimatedCost: 12000,
    requestedBy: "David Wilson",
    department: "Engineering",
    requestDate: "2024-01-10",
    priority: "high",
    items: 3,
    justification: "Annual software license renewal required for development tools",
    urgency: "High",
    budgetSource: "IT Budget",
    approvedBy: "Fatima Mohamed",
    approvedDate: "2024-01-11",
  },
];

// Mock NGO/company info
const ngoInfo = {
  name: "WorkingNow Foundation",
  address: "123 NGO Street, Mogadishu",
  email: "info@workingnow.org",
  phone: "+252 61 2345678",
};

const statusColors = {
  draft: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  submitted: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  completed: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

const priorityColors = {
  low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  urgent: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const statusIcons = {
  draft: AlertCircle,
  submitted: Clock,
  approved: CheckCircle,
  rejected: AlertCircle,
  completed: CheckCircle,
};

export default function PurchaseRequisitionPage() {
  const [requisitions, setRequisitions] = useState<PurchaseRequisition[]>(mockRequisitions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [autoPRNo, setAutoPRNo] = useState("");
  const [requisitionItems, setRequisitionItems] = useState([
    { id: "1", description: "A4 Paper (500 sheets)", quantity: "10", unitCost: "5", totalCost: "50", remark: "" },
    { id: "2", description: "Printer Ink Cartridge", quantity: "2", unitCost: "30", totalCost: "60", remark: "" },
  ]);
  const [requestedBy, setRequestedBy] = useState({
    name: "Ali Hassan",
    signature: null as File | null,
  });
  const [approvedBy, setApprovedBy] = useState({
    name: "Fatima Mohamed",
    signature: null as File | null,
  });

  useEffect(() => {
    if (isDialogOpen) {
      // Generate PR No: PR-YYYYMMDD-XXX
      const now = new Date();
      const yyyymmdd = now.getFullYear().toString() + (now.getMonth() + 1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0');
      const rand = Math.floor(100 + Math.random() * 900); // 3 digit random
      setAutoPRNo(`PR-${yyyymmdd}-${rand}`);
    }
  }, [isDialogOpen]);

  const filteredRequisitions = requisitions.filter(requisition => {
    const matchesSearch = requisition.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      requisition.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      requisition.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || requisition.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || requisition.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDeleteRequisition = (requisitionId: string) => {
    setRequisitions(requisitions.filter(requisition => requisition.id !== requisitionId));
  };

  const addItem = () => {
    const newId = (requisitionItems.length + 1).toString();
    setRequisitionItems([...requisitionItems, { id: newId, description: "", quantity: "", unitCost: "", totalCost: "", remark: "" }]);
  };

  const removeItem = (itemId: string) => {
    if (requisitionItems.length > 1) {
      setRequisitionItems(requisitionItems.filter(item => item.id !== itemId));
    }
  };

  const updateItem = (itemId: string, field: string, value: string) => {
    setRequisitionItems(requisitionItems.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitCost') {
          const qty = field === 'quantity' ? value : item.quantity;
          const price = field === 'unitCost' ? value : item.unitCost;
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

  const totalEstimatedCost = requisitionItems.reduce((sum, item) => sum + (parseFloat(item.totalCost) || 0), 0);

  // Handlers for signature updates
  const handleRequestedByUpdate = (field: 'name' | 'signature', value: string | File | null) => {
    setRequestedBy({ ...requestedBy, [field]: value });
  };

  const handleApprovedByUpdate = (field: 'name' | 'signature', value: string | File | null) => {
    setApprovedBy({ ...approvedBy, [field]: value });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Requisition Forms</h1>
          <p className="text-muted-foreground">
            Create and manage purchase requisition requests
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New Requisition
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl w-full p-0 bg-background">
            <div className="overflow-y-auto max-h-[90vh] rounded-lg shadow-lg bg-background p-6">
              {/* NGO Branding */}
              <div className="flex flex-col items-center gap-2 mb-4">
                <Avatar className="h-12 w-12 mb-1"><AvatarFallback>WN</AvatarFallback></Avatar>
                <div className="text-lg font-semibold text-center">{ngoInfo.name}</div>
                <div className="text-xs text-muted-foreground text-center">{ngoInfo.address}</div>
                <div className="text-xs text-muted-foreground text-center">Email: {ngoInfo.email}</div>
                <div className="text-xs text-muted-foreground text-center">Phone: {ngoInfo.phone}</div>
              </div>
              <div className="text-center font-bold text-lg mb-2">Purchase Requisition Form</div>

              {/* Form Fields */}
              <form className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Date:</Label>
                    <Input type="date" />
                  </div>
                  <div className="flex-1">
                    <Label>Requisition No:</Label>
                    <Input value={autoPRNo} readOnly className="bg-muted/50 cursor-not-allowed" />
                  </div>
                </div>

                <div className="flex gap-4">
                <div className="flex-1">
                    <Label>Department:</Label>
                    <Input placeholder="Enter department" />
                  </div>
                  <div className="flex-1">
                    <Label>Category:</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office-supplies">Office Supplies</SelectItem>
                        <SelectItem value="it-equipment">IT Equipment</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                                 {/* Table for items */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Requisition Items</Label>
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
                          <th className="border p-1">Unit Cost</th>
                          <th className="border p-1">Total Cost</th>
                          <th className="border p-1">Remark</th>
                          <th className="border p-1">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requisitionItems.map((item, index) => (
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
                                value={item.unitCost}
                                onChange={(e) => updateItem(item.id, 'unitCost', e.target.value)}
                                placeholder="Unit Cost"
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
                              {requisitionItems.length > 1 && (
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

                                 {/* Total Cost */}
                 <div className="flex justify-end">
                   <div className="flex flex-col gap-2 border rounded-md p-3 bg-muted/30">
                     <div className="flex justify-between font-bold text-base">
                       <span>Total Estimated Cost:</span>
                       <span>${totalEstimatedCost.toFixed(2)}</span>
                     </div>
                   </div>
                 </div>

                 <div>
                   <Label>Description:</Label>
                   <Textarea placeholder="Enter detailed description of the requisition" />
                 </div>

                {/* Approval Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                    <label className="text-base font-semibold">Requested By</label>
                    <input
                      placeholder="Enter name"
                      className="h-9 mb-2 w-full border rounded px-2"
                      value={requestedBy.name}
                      onChange={e => handleRequestedByUpdate('name', e.target.value)}
                    />
                    <SignatureUpload
                      label="Upload Signature"
                      value={requestedBy.signature}
                      onChange={file => handleRequestedByUpdate('signature', file)}
                    />
                  </div>
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                    <label className="text-base font-semibold">Approved By</label>
                    <input
                      placeholder="Enter name"
                      className="h-9 mb-2 w-full border rounded px-2"
                      value={approvedBy.name}
                      onChange={e => handleApprovedByUpdate('name', e.target.value)}
                    />
                    <SignatureUpload
                      label="Upload Signature"
                      value={approvedBy.signature}
                      onChange={file => handleApprovedByUpdate('signature', file)}
                    />
                  </div>
                </div>
                {/* Stamp Section (centered) */}
                <div className="flex justify-center my-6">
                  <div className="space-y-2 flex flex-col items-center">
                    <label className="text-base font-semibold">Stamp</label>
                    <input
                      type="text"
                      className="w-32 h-32 border-2 border-dashed border-gray-400 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm text-center font-semibold flex items-center justify-center text-base"
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                </div>

                {/* Save/Cancel Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" onClick={() => setIsDialogOpen(false)}>
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
                placeholder="Search requisitions..."
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
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setPriorityFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requisitions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            All Requisitions ({filteredRequisitions.length})
          </CardTitle>
          <CardDescription>
            View and manage purchase requisition requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequisitions.map((requisition) => {
              const StatusIcon = statusIcons[requisition.status];

              return (
                <div
                  key={requisition.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{requisition.title}</span>
                        <Badge className={statusColors[requisition.status]}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {requisition.status}
                        </Badge>
                        <Badge className={priorityColors[requisition.priority]}>
                          {requisition.priority}
                        </Badge>
                        <Badge variant="outline">
                          {requisition.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{requisition.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ${requisition.estimatedCost.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {requisition.requestedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {requisition.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {requisition.requestDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {requisition.items} items
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
                      onClick={() => handleDeleteRequisition(requisition.id)}
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

