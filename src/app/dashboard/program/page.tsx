"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  PieChart,
  Target,
  FileText,
  Users,
  Award,
  Calendar,
  Plus,
  Eye,
  Upload as UploadIcon,
  CheckCircle,
  TrendingUp,
  Activity,
} from "lucide-react";

// Mock data for the program dashboard
const statsData = {
  totalProjects: 24,
  activeProjects: 18,
  completedProjects: 6,
  totalBeneficiaries: 15420,
  programBudget: 850000,
  budgetUsed: 620000,
  budgetRemaining: 230000,
  thisMonthActivities: 45,
};

const programByCategory = [
  { category: "Education", amount: 250000, percentage: 40.3 },
  { category: "Healthcare", amount: 180000, percentage: 29.0 },
  { category: "Community Development", amount: 120000, percentage: 19.4 },
  { category: "Emergency Relief", amount: 45000, percentage: 7.3 },
  { category: "Capacity Building", amount: 25000, percentage: 4.0 },
];

const quickLinks = [
  {
    title: "Purchase Requisition",
    description: "Create and manage purchase requisitions",
    icon: FileText,
    href: "/dashboard/program/purchase-requisition",
    color: "bg-blue-500",
  },
  {
    title: "Activity Tracking",
    description: "Track program activities and progress",
    icon: Activity,
    href: "/dashboard/program/activity-tracking",
    color: "bg-green-500",
  },
  {
    title: "Report Forms",
    description: "Generate and manage reports",
    icon: TrendingUp,
    href: "/dashboard/program/report-forms",
    color: "bg-purple-500",
  },
  {
    title: "Service Certificates",
    description: "Manage service accomplishment certificates",
    icon: Award,
    href: "/dashboard/program/service-certificates",
    color: "bg-orange-500",
  },
  {
    title: "General Documents",
    description: "Manage program documents",
    icon: UploadIcon,
    href: "/dashboard/program/general-documents",
    color: "bg-red-500",
  },
];

export default function ProgramPage() {
  const budgetUsagePercentage = (statsData.budgetUsed / statsData.programBudget) * 100;
  const projectCompletionRate = (statsData.completedProjects / statsData.totalProjects) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Management Overview</h1>
          <p className="text-muted-foreground">
            Monitor program performance and manage all program-related activities
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
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalProjects.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {statsData.activeProjects} active, {statsData.completedProjects} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Beneficiaries</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalBeneficiaries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +1,250 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month Activities</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.thisMonthActivities.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCompletionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {statsData.completedProjects} of {statsData.totalProjects} projects
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
              Program Budget Overview
            </CardTitle>
            <CardDescription>
              Current program budget allocation and spending
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

        {/* Program by Category */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Program Spending by Category
            </CardTitle>
            <CardDescription>
              Breakdown of program spending by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {programByCategory.map((item, index) => (
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
            <Target className="h-5 w-5" />
            Program Tools
          </CardTitle>
          <CardDescription>
            Quick access to all program-related features
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