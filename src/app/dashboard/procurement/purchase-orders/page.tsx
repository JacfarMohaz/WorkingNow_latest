"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Minus, ShoppingCart, FileText, Calendar, User, Building, DollarSign, Eye, Edit, Trash2, Search, Filter } from "lucide-react";
import { SingleSignatureSection } from "@/components/ui/signature-section";
import { SignatureUpload } from "@/components/ui/signature-upload";

// Mock data for purchase orders table
const mockPurchaseOrders = [
  {
    id: "PO-001",
    serialNo: "SERIAL-20240610-101",
    date: "2024-06-10",
    supplierName: "Somali Supplies Ltd.",
    contactName: "Ali Hassan",
    contactPhone: "+252 61 1111111",
    contactEmail: "ali@somalisupplies.com",
    items: [
      { description: "A4 Paper (500 sheets)", quantity: 10, day: 1, unitCost: 5, totalCost: 50 },
      { description: "Printer Ink Cartridge", quantity: 2, day: 1, unitCost: 30, totalCost: 60 },
    ],
    subtotal: 110,
    salesTax: 5,
    shippingHandling: 10,
    totalCost: 125.5,
    preparedBy: "Ali Hassan",
    approvedBy: "Fatima Mohamed",
    status: "Pending",
  },
  {
    id: "PO-002",
    serialNo: "SERIAL-20240611-102",
    date: "2024-06-11",
    supplierName: "Mogadishu Office Mart",
    contactName: "Maryan Ahmed",
    contactPhone: "+252 61 2222222",
    contactEmail: "maryan@mogoffice.com",
    items: [
      { description: "Desk Chair", quantity: 5, day: 1, unitCost: 40, totalCost: 200 },
      { description: "Stapler", quantity: 10, day: 1, unitCost: 3, totalCost: 30 },
    ],
    subtotal: 230,
    salesTax: 5,
    shippingHandling: 15,
    totalCost: 249.5,
    preparedBy: "Maryan Ahmed",
    approvedBy: "Fatima Mohamed",
    status: "Approved",
  },
];

// Mock NGO/company info
const ngoInfo = {
  name: "WorkingNow Foundation",
  address: "123 NGO Street, Mogadishu",
  email: "info@workingnow.org",
  phone: "+252 61 2345678",
};

// Type for SingleSignatureSection onUpdate when showStamp is false
type SignatureUpdateField = 'name' | 'signature';

// Helper function to summarize items
function summarizeItems(items: { description: string; quantity: number | string }[]): string {
  if (!items || items.length === 0) return "-";
  const summary = items.slice(0, 2).map((item: { description: string; quantity: number | string }) => `${item.description} (x${item.quantity})`).join(", ");
  if (items.length > 2) {
    return `${summary}, ... (+${items.length - 2} more)`;
  }
  return summary;
}

export default function PurchaseOrdersPage() {
  const [open, setOpen] = useState(false);
  const [autoPONo, setAutoPONo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [supplierFilter, setSupplierFilter] = useState<string>("all");
  const [orderItems, setOrderItems] = useState([
    { id: "1", description: "A4 Paper (500 sheets)", quantity: "10", day: "1", unitCost: "5", totalCost: "50" },
    { id: "2", description: "Printer Ink Cartridge", quantity: "2", day: "1", unitCost: "30", totalCost: "60" },
  ]);
  const [salesTax, setSalesTax] = useState("5");
  const [shippingHandling, setShippingHandling] = useState("10.00");
  // Signature state for Prepared By and Approved By
  const [preparedBy, setPreparedBy] = useState({
    name: "Ali Hassan",
    signature: null as File | null,
  });
  const [approvedBy, setApprovedBy] = useState({
    name: "Fatima Mohamed",
    signature: null as File | null,
  });
  const [stamp, setStamp] = useState("");

  useEffect(() => {
    if (open) {
      // Generate Serial No: SERIAL-YYYYMMDD-XXX
      const now = new Date();
      const yyyymmdd = now.getFullYear().toString() + (now.getMonth()+1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0');
      const rand = Math.floor(100 + Math.random() * 900); // 3 digit random
      setAutoPONo(`SERIAL-${yyyymmdd}-${rand}`);
    }
  }, [open]);

  const addItem = () => {
    const newId = (orderItems.length + 1).toString();
    setOrderItems([...orderItems, { id: newId, description: "", quantity: "", day: "", unitCost: "", totalCost: "" }]);
  };
  const removeItem = (itemId: string) => {
    if (orderItems.length > 1) {
      setOrderItems(orderItems.filter(item => item.id !== itemId));
    }
  };
  const updateItem = (itemId: string, field: string, value: string) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'day' || field === 'unitCost') {
          const qty = field === 'quantity' ? value : item.quantity;
          const day = field === 'day' ? value : item.day;
          const price = field === 'unitCost' ? value : item.unitCost;
          if (qty && day && price) {
            const total = parseFloat(qty) * parseFloat(day) * parseFloat(price);
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

  const subtotal = orderItems.reduce((sum, item) => sum + (parseFloat(item.totalCost) || 0), 0);
  const salesTaxValue = subtotal * (parseFloat(salesTax) || 0) / 100;
  const shippingHandlingValue = parseFloat(shippingHandling) || 0;
  const totalCost = subtotal + salesTaxValue + shippingHandlingValue;

  // Handlers for signature and stamp updates
  const handlePreparedByUpdate = (field: 'name' | 'signature', value: string | File | null) => {
    setPreparedBy({ ...preparedBy, [field]: value });
  };
  const handleApprovedByUpdate = (field: 'name' | 'signature', value: string | File | null) => {
    setApprovedBy({ ...approvedBy, [field]: value });
  };
  const handlePreparedByUpdateWrapper = (field: string, value: string | File | null) => {
    if (field === 'name' || field === 'signature') handlePreparedByUpdate(field, value);
  };
  const handleApprovedByUpdateWrapper = (field: string, value: string | File | null) => {
    if (field === 'name' || field === 'signature') handleApprovedByUpdate(field, value);
  };

  // Filter purchase orders based on search and filters
  const filteredPurchaseOrders = mockPurchaseOrders.filter(po => {
    const matchesSearch = po.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         po.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || po.status.toLowerCase() === statusFilter;
    const matchesSupplier = supplierFilter === "all" || po.supplierName === supplierFilter;
    
    return matchesSearch && matchesStatus && matchesSupplier;
  });

  // Get unique suppliers for filter dropdown
  const uniqueSuppliers = Array.from(new Set(mockPurchaseOrders.map(po => po.supplierName)));

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground">
            Create and manage purchase orders for suppliers
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Purchase Order
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
              <div className="text-center font-bold text-lg mb-2">Purchase Order</div>
              {/* Form Fields - match RFQ layout strictly */}
              <form className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Date:</Label>
                    <Input type="date" />
                  </div>
                  <div className="flex-1">
                    <Label>Serial No:</Label>
                    <Input value={autoPONo} readOnly className="bg-muted/50 cursor-not-allowed" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Supplier Name:</Label>
                    <Input placeholder="Enter vendor or company name" />
                  </div>
                  {/* <div className="flex-1">
                    <Label>Vendor Address:</Label>
                    <Input placeholder="Enter vendor address" />
                  </div> */}
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Contact Name:</Label>
                    <Input placeholder="Contact person at vendor" />
                  </div>
                  <div className="flex-1">
                    <Label>Contact Phone:</Label>
                    <Input placeholder="Vendor phone number" />
                  </div>
                  <div className="flex-1">
                    <Label>Contact Email:</Label>
                    <Input placeholder="Vendor email address" />
                  </div>
                </div>
                {/* Table for items */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Order Items</Label>
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
                          <th className="border p-1">Day</th>
                          <th className="border p-1">Unit Cost</th>
                          <th className="border p-1">Total Cost</th>
                          <th className="border p-1">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems.map((item, index) => (
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
                                value={item.day}
                                onChange={(e) => updateItem(item.id, 'day', e.target.value)}
                                placeholder="Day"
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
                            <td className="border p-1 text-center">
                              {orderItems.length > 1 && (
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
                {/* Notes and Totals */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Notes</Label>
                    <Textarea placeholder="Enter any notes here..." />
                  </div>
                  <div className="flex-1 flex flex-col gap-2 border rounded-md p-3 bg-muted/30 mt-6">
                    <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm items-center">
                      <span>Sales Tax</span>
                      <div className="flex items-center gap-1">
                        <Input
                          className="w-16 h-7 text-sm px-2 py-1"
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={salesTax}
                          onChange={e => setSalesTax(e.target.value)}
                        />
                        <span className="text-xs">%</span>
                        <span className="text-xs text-muted-foreground">(${salesTax || 0}% = ${salesTaxValue.toFixed(2)})</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span>Shipping & Handling</span>
                      <Input
                        className="w-24 h-7 text-sm px-2 py-1"
                        type="number"
                        min="0"
                        step="0.01"
                        value={shippingHandling}
                        onChange={e => setShippingHandling(e.target.value)}
                        prefix="$"
                      />
                    </div>
                    <div className="border-t my-1"></div>
                    <div className="flex justify-between font-bold text-base"><span>Total Cost</span><span>${totalCost.toFixed(2)}</span></div>
                  </div>
                </div>
                {/* Approval Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                    <label className="text-base font-semibold">Prepared By</label>
                    <input
                      placeholder="Enter name"
                      className="h-9 mb-2 w-full border rounded px-2"
                      value={preparedBy.name}
                      onChange={e => handlePreparedByUpdateWrapper('name', e.target.value)}
                    />
                    <SignatureUpload
                      label="Upload Signature"
                      value={preparedBy.signature}
                      onChange={file => handlePreparedByUpdateWrapper('signature', file)}
                    />
                  </div>
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                    <label className="text-base font-semibold">Approved By</label>
                    <input
                      placeholder="Enter name"
                      className="h-9 mb-2 w-full border rounded px-2"
                      value={approvedBy.name}
                      onChange={e => handleApprovedByUpdateWrapper('name', e.target.value)}
                    />
                    <SignatureUpload
                      label="Upload Signature"
                      value={approvedBy.signature}
                      onChange={file => handleApprovedByUpdateWrapper('signature', file)}
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
                      value={stamp}
                      onChange={e => setStamp(e.target.value)}
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                </div>
                {/* Save/Cancel Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" onClick={() => setOpen(false)}>
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Purchase Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            All Purchase Orders ({filteredPurchaseOrders.length})
          </CardTitle>
          <CardDescription>
            View and manage your purchase orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search purchase orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                <SelectTrigger className="w-[180px]">
                  <Building className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  {uniqueSuppliers.map((supplier) => (
                    <SelectItem key={supplier} value={supplier}>
                      {supplier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="vuexy-table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serial No</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Contact Phone</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead>Sales Tax (%)</TableHead>
                  <TableHead>Shipping & Handling</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Prepared By</TableHead>
                  <TableHead>Approved By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchaseOrders.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell>{po.serialNo}</TableCell>
                    <TableCell>{po.date}</TableCell>
                    <TableCell>{po.supplierName}</TableCell>
                    <TableCell>{po.contactName}</TableCell>
                    <TableCell>{po.contactPhone}</TableCell>
                    <TableCell>{po.contactEmail}</TableCell>
                    <TableCell>${po.subtotal.toFixed(2)}</TableCell>
                    <TableCell>{po.salesTax}%</TableCell>
                    <TableCell>${po.shippingHandling.toFixed(2)}</TableCell>
                    <TableCell>${po.totalCost.toFixed(2)}</TableCell>
                    <TableCell>{po.preparedBy}</TableCell>
                    <TableCell>{po.approvedBy}</TableCell>
                    <TableCell>{po.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredPurchaseOrders.length === 0 && (
            <div className="vuexy-table-empty">
              <FileText className="vuexy-table-empty-icon" />
              <p>No purchase orders found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 