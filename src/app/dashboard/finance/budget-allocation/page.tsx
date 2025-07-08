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
  Building,
  Calculator,
  TrendingUp,
  TrendingDown,
  Users,
  Filter,
  Download,
  MoreHorizontal,
} from "lucide-react";

// Mock data for budget allocations
const mockBudgets = [
  {
    id: "BUD-001",
    title: "Q1 2024 Operations Budget",
    department: "Operations",
    allocatedAmount: 50000.00,
    spentAmount: 32500.00,
    currency: "USD",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    status: "active",
    description: "Quarterly budget for operational expenses including utilities, maintenance, and supplies",
    manager: "Sarah Johnson",
    category: "operational",
  },
  {
    id: "BUD-002",
    title: "Marketing Campaign Budget",
    department: "Marketing",
    allocatedAmount: 25000.00,
    spentAmount: 18750.00,
    currency: "USD",
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    status: "active",
    description: "Digital marketing campaign budget for brand awareness and lead generation",
    manager: "Mike Chen",
    category: "marketing",
  },
  {
    id: "BUD-003",
    title: "IT Infrastructure Budget",
    department: "IT",
    allocatedAmount: 75000.00,
    spentAmount: 75000.00,
    currency: "USD",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "completed",
    description: "Annual budget for IT infrastructure upgrades and maintenance",
    manager: "David Wilson",
    category: "infrastructure",
  },
  {
    id: "BUD-004",
    title: "HR Training Budget",
    department: "HR",
    allocatedAmount: 15000.00,
    spentAmount: 8000.00,
    currency: "USD",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
    status: "active",
    description: "Employee training and development programs",
    manager: "Lisa Davis",
    category: "training",
  },
  {
    id: "BUD-005",
    title: "R&D Project Budget",
    department: "R&D",
    allocatedAmount: 100000.00,
    spentAmount: 45000.00,
    currency: "USD",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    description: "Research and development project funding",
    manager: "Alex Thompson",
    category: "research",
  },
  {
    id: "BUD-006",
    title: "Sales Commission Budget",
    department: "Sales",
    allocatedAmount: 30000.00,
    spentAmount: 28000.00,
    currency: "USD",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    description: "Sales team commission and bonus structure",
    manager: "Rachel Green",
    category: "commission",
  },
];

const statusColors = {
  active: "bg-success/10 text-success border-success/20",
  completed: "bg-primary/10 text-primary border-primary/20",
  suspended: "bg-warning/10 text-warning border-warning/20",
  cancelled: "bg-error/10 text-error border-error/20",
};

const categoryColors = {
  operational: "bg-blue-100 text-blue-800 border-blue-200",
  marketing: "bg-purple-100 text-purple-800 border-purple-200",
  infrastructure: "bg-gray-100 text-gray-800 border-gray-200",
  training: "bg-green-100 text-green-800 border-green-200",
  research: "bg-orange-100 text-orange-800 border-orange-200",
  commission: "bg-pink-100 text-pink-800 border-pink-200",
};

export default function BudgetAllocationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter budgets based on search and filters
  const filteredBudgets = mockBudgets.filter((budget) => {
    const matchesSearch = 
      budget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      budget.manager.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || budget.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || budget.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getBudgetUsagePercentage = (allocated: number, spent: number) => {
    return (spent / allocated) * 100;
  };

  const getBudgetStatus = (allocated: number, spent: number) => {
    const percentage = getBudgetUsagePercentage(allocated, spent);
    if (percentage >= 100) return "completed";
    if (percentage >= 80) return "warning";
    return "normal";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Budget Allocation</h1>
        <p className="text-muted-foreground">Manage and track budget allocations across departments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Budgets</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockBudgets.length}</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2 from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Allocated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${mockBudgets.reduce((sum, budget) => sum + budget.allocatedAmount, 0).toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${mockBudgets.reduce((sum, budget) => sum + budget.spentAmount, 0).toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-warning mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Budgets</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockBudgets.filter(budget => budget.status === "active").length}
            </div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Currently active
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Budget Dialog */}
      <div className="flex justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Budget Allocation</DialogTitle>
              <DialogDescription>
                Create a new budget allocation for any department or project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Budget Title</Label>
                  <Input id="title" placeholder="Enter budget title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="it">IT</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="rd">R&D</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Allocated Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter budget description" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Create Budget
              </Button>
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
                  placeholder="Search by title, department, or ID..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department-filter">Department</Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="R&D">R&D</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budgets Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Budget Allocations ({filteredBudgets.length})
              </CardTitle>
              <CardDescription>
                All budget allocations and their current status
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
                  <TableHead>Budget ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Allocated</TableHead>
                  <TableHead>Spent</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBudgets.map((budget) => {
                  const usagePercentage = getBudgetUsagePercentage(budget.allocatedAmount, budget.spentAmount);
                  const budgetStatus = getBudgetStatus(budget.allocatedAmount, budget.spentAmount);
                  
                  return (
                    <TableRow key={budget.id}>
                      <TableCell className="font-mono text-sm">{budget.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{budget.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {budget.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          {budget.department}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {budget.manager}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {budget.currency} {budget.allocatedAmount.toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {budget.currency} {budget.spentAmount.toLocaleString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {budgetStatus === "warning" ? (
                              <TrendingUp className="h-4 w-4 text-warning" />
                            ) : budgetStatus === "completed" ? (
                              <TrendingDown className="h-4 w-4 text-error" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-success" />
                            )}
                            <span className="text-sm font-medium">{usagePercentage.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                budgetStatus === "warning" ? "bg-warning" :
                                budgetStatus === "completed" ? "bg-error" : "bg-success"
                              }`}
                              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {budget.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`capitalize ${statusColors[budget.status as keyof typeof statusColors]}`}>
                          {budget.status}
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
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-error hover:text-error">
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
          
          {filteredBudgets.length === 0 && (
            <div className="vuexy-table-empty">
              <Calculator className="vuexy-table-empty-icon" />
              <p>No budgets found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 