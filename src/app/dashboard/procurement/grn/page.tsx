"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for GRN table
const mockGRNs = [
  {
    id: "GRN-001",
    date: "2024-06-01",
    supplier: "Somali Supplies Ltd.",
    poNumber: "PO-001",
    totalItems: 5,
    status: "Received",
    receivedBy: "Ahmed Hassan",
  },
  {
    id: "GRN-002",
    date: "2024-06-03",
    supplier: "Mogadishu Office Mart",
    poNumber: "PO-002",
    totalItems: 3,
    status: "Pending",
    receivedBy: "Fatima Ali",
  },
];

// Mock NGO/company info
const ngoInfo = {
  name: "WorkingNow Foundation",
  address: "123 NGO Street, Mogadishu",
  email: "info@workingnow.org",
  phone: "+252 61 2345678",
};

export default function GRNPage() {
  const [open, setOpen] = useState(false);
  const [autoGRNNo, setAutoGRNNo] = useState("");
  const [autoRefNo, setAutoRefNo] = useState("");
  const [receivedItems, setReceivedItems] = useState([
    { id: "1", description: "", size: "", quantity: "", specifications: "" },
    { id: "2", description: "", size: "", quantity: "", specifications: "" },
  ]);
  const [notes, setNotes] = useState("");
  // Signature state for Received By and Verified By
  const [receivedBy, setReceivedBy] = useState({
    name: "Ahmed Hassan",
    signature: null as File | null,
  });
  const [verifiedBy, setVerifiedBy] = useState({
    name: "Fatima Mohamed",
    signature: null as File | null,
  });
  const [stamp, setStamp] = useState("");

  useEffect(() => {
    if (open) {
      // Generate Serial No: GRN-YYYYMMDD-XXX
      const now = new Date();
      const yyyymmdd = now.getFullYear().toString() + (now.getMonth()+1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0');
      const rand = Math.floor(100 + Math.random() * 900); // 3 digit random
      setAutoGRNNo(`GRN-${yyyymmdd}-${rand}`);
      setAutoRefNo(`REF-${yyyymmdd}-${rand}`);
    }
  }, [open]);

  const addItem = () => {
    const newId = (receivedItems.length + 1).toString();
    setReceivedItems([
      ...receivedItems,
      { id: newId, description: "", size: "", quantity: "", specifications: "" },
    ]);
  };
  const removeItem = (itemId: string) => {
    if (receivedItems.length > 1) {
      setReceivedItems(receivedItems.filter(item => item.id !== itemId));
    }
  };
  const updateItem = (itemId: string, field: string, value: string) => {
    setReceivedItems(receivedItems.map(item => {
      if (item.id === itemId) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Handlers for signature and stamp updates
  const handleReceivedByUpdate = (field: 'name' | 'signature', value: string | File | null) => {
    setReceivedBy({ ...receivedBy, [field]: value });
  };
  const handleVerifiedByUpdate = (field: 'name' | 'signature', value: string | File | null) => {
    setVerifiedBy({ ...verifiedBy, [field]: value });
  };
  const handleReceivedByUpdateWrapper = (field: string, value: string | File | null) => {
    if (field === 'name' || field === 'signature') handleReceivedByUpdate(field, value);
  };
  const handleVerifiedByUpdateWrapper = (field: string, value: string | File | null) => {
    if (field === 'name' || field === 'signature') handleVerifiedByUpdate(field, value);
  };

  // Calculate total quantity
  const totalQuantity = receivedItems.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0);

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goods Received Notes</h1>
          <p className="text-muted-foreground">
            Create and manage goods received notes for inventory tracking
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New GRN
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
              <div className="text-center font-bold text-lg mb-2">Goods Received Note</div>
              {/* Form Fields */}
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Ref. Number:</Label>
                    <Input value={autoRefNo} readOnly className="bg-muted/50 cursor-not-allowed" />
                  </div>
                  <div>
                    <Label>Date and Time:</Label>
                    <Input type="datetime-local" />
                  </div>
                </div>
                <div>
                    <Label>Supplier Name:</Label>
                    <Input placeholder="Enter supplier name" />
                  </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* <div>
                    <Label>Order Number:</Label>
                    <Input placeholder="Enter order number" />
                  </div> */}
                  <div>
                    <Label>Purchase Order Number:</Label>
                    <Input placeholder="Enter PO number" />
                  </div>
                  <div>
                    <Label>Delivery Location:</Label>
                    <Input placeholder="Enter delivery location" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  
                  
                </div>
                {/* Table for received items */}
                <div>
                  <div className="mb-2">
                    <Label>Received Items</Label>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border text-xs">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border p-1">Sr. No.</th>
                          <th className="border p-1">Description</th>
                          <th className="border p-1">Size</th>
                          <th className="border p-1">Quantity</th>
                          <th className="border p-1">Specifications</th>
                          <th className="border p-1">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {receivedItems.map((item, index) => (
                          <tr key={item.id}>
                            <td className="border p-1 text-center">{index + 1}</td>
                            <td className="border p-1">
                              <Input 
                                className="h-7 text-xs" 
                                value={item.description}
                                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                placeholder="Description"
                              />
                            </td>
                            <td className="border p-1">
                              <Input 
                                className="h-7 text-xs" 
                                value={item.size || ''}
                                onChange={(e) => updateItem(item.id, 'size', e.target.value)}
                                placeholder="Size"
                              />
                            </td>
                            <td className="border p-1">
                              <Input 
                                className="h-7 text-xs" 
                                value={item.quantity || ''}
                                onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                                placeholder="Quantity"
                                type="number"
                              />
                            </td>
                            <td className="border p-1">
                              <Input 
                                className="h-7 text-xs" 
                                value={item.specifications || ''}
                                onChange={(e) => updateItem(item.id, 'specifications', e.target.value)}
                                placeholder="Specifications"
                              />
                            </td>
                            <td className="border p-1 text-center">
                              {receivedItems.length > 1 && (
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
                      <tfoot>
                        <tr>
                          <td className="border p-1 font-semibold" colSpan={3}>Total</td>
                          <td className="border p-1 font-semibold">{totalQuantity}</td>
                          <td className="border p-1" colSpan={2}></td>
                        </tr>
                        {/* <tr>
                          <td className="border p-1 font-semibold" colSpan={3}>Received By:</td>
                          <td className="border p-1 font-semibold" colSpan={3}>Checked By:</td>
                        </tr> */}
                      </tfoot>
                    </table>
                  </div>
                  <div className="flex justify-end mt-2">
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
                </div>
                {/* Notes and Totals */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Notes</Label>
                    <Textarea 
                      placeholder="Enter any notes about the received goods..." 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  {/* <div className="flex-1 flex flex-col gap-2 border rounded-md p-3 bg-muted/30 mt-6">
                    <div className="flex justify-between font-bold text-base">
                      <span>Total Received</span>
                      <span>$</span>
                    </div>
                  </div> */}
                </div>
                {/* Approval Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                    <label className="text-base font-semibold">Received By</label>
                    <div className="flex flex-col gap-2 mt-2">
                      <span className="text-base">Name: <span className="inline-block border-b border-black min-w-[140px] align-middle" style={{height: '1.5em'}}></span></span>
                      <span className="text-base">Signature: <span className="inline-block border-b border-black min-w-[140px] align-middle" style={{height: '1.5em'}}></span></span>
                    </div>
                  </div>
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                    <label className="text-base font-semibold">Checked By</label>
                    <input
                      placeholder="Enter name"
                      className="h-9 mb-2 w-full border rounded px-2"
                      value={verifiedBy.name}
                      onChange={e => handleVerifiedByUpdateWrapper('name', e.target.value)}
                    />
                    <SignatureUpload
                      label="Upload Signature"
                      value={verifiedBy.signature}
                      onChange={file => handleVerifiedByUpdateWrapper('signature', file)}
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
      {/* GRN Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            All Goods Received Notes ({mockGRNs.length})
          </CardTitle>
          <CardDescription>
            View and manage your goods received notes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockGRNs.map((grn) => (
              <div
                key={grn.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{grn.id}</span>
                      <span className="text-xs text-muted-foreground">{grn.supplier}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {grn.poNumber}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {grn.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {grn.receivedBy}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        {grn.totalItems} items
                      </span>
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        grn.status === 'Received' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {grn.status === 'Received' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {grn.status}
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
                    // onClick={() => handleDeleteGRN(grn.id)}
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