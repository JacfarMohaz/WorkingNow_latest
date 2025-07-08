"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  PieChart,
  ShoppingCart,
  FileText,
  Receipt,
  Package,
  Calculator,
  Plus,
  Eye,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Award,
  Users,
  ClipboardList,
  Building,
} from "lucide-react";

// Mock data for the procurement dashboard
const statsData = {
  totalPurchaseOrders: 847,
  totalRFQs: 234,
  totalSuppliers: 156,
  totalBids: 892,
  procurementBudget: 450000,
  budgetUsed: 320000,
  budgetRemaining: 130000,
};

const procurementByCategory = [
  { category: "Equipment", amount: 120000, percentage: 37.5 },
  { category: "Supplies", amount: 85000, percentage: 26.6 },
  { category: "Services", amount: 65000, percentage: 20.3 },
  { category: "Construction", amount: 35000, percentage: 10.9 },
  { category: "IT & Software", amount: 15000, percentage: 4.7 },
];

const quickLinks = [
  {
    title: "Request for Quotation (RFQ)",
    description: "Create and manage RFQs",
    icon: FileText,
    href: "/dashboard/procurement/rfq",
    color: "bg-blue-500",
  },
  {
    title: "Purchase Orders",
    description: "Manage purchase orders",
    icon: Receipt,
    href: "/dashboard/procurement/purchase-orders",
    color: "bg-green-500",
  },
  {
    title: "Bid Analysis",
    description: "Analyze and compare bids",
    icon: Award,
    href: "/dashboard/procurement/bid-analysis",
    color: "bg-purple-500",
  },
  {
    title: "Suppliers",
    description: "Manage supplier database",
    icon: Building,
    href: "/dashboard/procurement/suppliers",
    color: "bg-orange-500",
  },
  {
    title: "Asset Registry",
    description: "Track and manage assets",
    icon: Package,
    href: "/dashboard/procurement/asset-registery",
    color: "bg-indigo-500",
  },
  {
    title: "General Documents",
    description: "Manage procurement documents",
    icon: UploadIcon,
    href: "/dashboard/procurement/general-documents",
    color: "bg-red-500",
  },
];

export default function ProcurementPage() {
  const budgetUsagePercentage = (statsData.budgetUsed / statsData.procurementBudget) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Procurement Overview</h1>
          <p className="text-muted-foreground">
            Monitor procurement activities and manage all purchasing operations
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
            <CardTitle className="text-sm font-medium">Total Purchase Orders</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalPurchaseOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total RFQs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalRFQs.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalSuppliers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +3 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bids Received</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalBids.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
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
              Procurement Budget Overview
            </CardTitle>
            <CardDescription>
              Current procurement budget allocation and spending
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

        {/* Procurement by Category */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Procurement by Category
            </CardTitle>
            <CardDescription>
              Breakdown of procurement spending by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {procurementByCategory.map((item, index) => (
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
            <ShoppingCart className="h-5 w-5" />
            Procurement Tools
          </CardTitle>
          <CardDescription>
            Quick access to all procurement-related features
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