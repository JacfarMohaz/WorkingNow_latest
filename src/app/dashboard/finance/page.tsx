"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  PieChart,
  DollarSign,
  FileText,
  Receipt,
  CreditCard,
  Calculator,
  Plus,
  Eye,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from "lucide-react";

// Mock data for the dashboard
const statsData = {
  totalVouchers: 1247,
  totalInvoices: 892,
  reimbursementsThisMonth: 15600,
  totalBudgetAllocated: 250000,
  budgetUsed: 187500,
  budgetRemaining: 62500,
};

const spendingByCategory = [
  { category: "Operations", amount: 45000, percentage: 24 },
  { category: "Personnel", amount: 35000, percentage: 18.7 },
  { category: "Equipment", amount: 28000, percentage: 15 },
  { category: "Travel", amount: 22000, percentage: 11.7 },
  { category: "Supplies", amount: 18000, percentage: 9.6 },
  { category: "Other", amount: 39500, percentage: 21 },
];



const quickLinks = [
  {
    title: "Payment Voucher Creation",
    description: "Create and manage payment vouchers",
    icon: Receipt,
    href: "/dashboard/finance/payment-voucher",
    color: "bg-blue-500",
  },
  {
    title: "Reimbursement Letter",
    description: "Generate reimbursement letters",
    icon: CreditCard,
    href: "/dashboard/finance/reimbursement-letter",
    color: "bg-purple-500",
  },
  {
    title: "Excel Sheet Upload/Download",
    description: "Import/export financial data",
    icon: DownloadIcon,
    href: "/dashboard/finance/excel-upload",
    color: "bg-orange-500",
  },
  {
    title: "General Document Upload/Download",
    description: "Manage financial documents",
    icon: UploadIcon,
    href: "/dashboard/finance/general-documents",
    color: "bg-red-500",
  },
  {
    title: "Budget Allocation",
    description: "Allocate and track budgets",
    icon: Calculator,
    href: "/dashboard/finance/budget-allocation",
    color: "bg-indigo-500",
  },

];

export default function FinancePage() {
  const budgetUsagePercentage = (statsData.budgetUsed / statsData.totalBudgetAllocated) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance Overview</h1>
          <p className="text-muted-foreground">
            Monitor your financial performance and manage all finance-related activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vouchers</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalVouchers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalInvoices.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reimbursements This Month</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${statsData.reimbursementsThisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget Allocated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${statsData.totalBudgetAllocated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {budgetUsagePercentage.toFixed(1)}% used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Budget Usage Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Budget Usage Overview
            </CardTitle>
            <CardDescription>
              Current budget allocation and spending breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Budget Used</span>
                <span className="text-sm text-muted-foreground">
                  ${statsData.budgetUsed.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${budgetUsagePercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>0%</span>
                <span className="font-medium">{budgetUsagePercentage.toFixed(1)}%</span>
                <span>100%</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${statsData.budgetRemaining.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${statsData.budgetUsed.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Used</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spending by Category */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Spending by Category
            </CardTitle>
            <CardDescription>
              Breakdown of expenses by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {spendingByCategory.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                      }}
                    />
                    <span className="text-sm font-medium">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      ${item.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>



      {/* Feature Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Finance Tools
          </CardTitle>
          <CardDescription>
            Quick access to all finance-related features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {quickLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${link.color} text-white`}>
                      <link.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{link.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Plus className="h-3 w-3 mr-1" />
                      New
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 