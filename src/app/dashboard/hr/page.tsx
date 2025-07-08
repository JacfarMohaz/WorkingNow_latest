"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  PieChart,
  Users,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  Plus,
  UserPlus,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Mock data for the HR dashboard
const statsData = {
  totalEmployees: 156,
  activeStaff: 142,
  payrollProcessed: 138,
  totalLeaveDays: 245,
  averageAttendance: 94.2,
  newHires: 8,
  thisMonthPayroll: 125000,
  pendingApprovals: 15,
};

const leaveStats = [
  { type: "Annual Leave", days: 120, percentage: 49.0, color: "bg-blue-500" },
  { type: "Sick Leave", days: 45, percentage: 18.4, color: "bg-red-500" },
  { type: "Personal Leave", days: 35, percentage: 14.3, color: "bg-green-500" },
  { type: "Maternity/Paternity", days: 25, percentage: 10.2, color: "bg-purple-500" },
  { type: "Other", days: 20, percentage: 8.2, color: "bg-gray-500" },
];

const attendanceTrend = [
  { month: "Jan", attendance: 92.5, employees: 150, leaveDays: 28 },
  { month: "Feb", attendance: 94.1, employees: 152, leaveDays: 25 },
  { month: "Mar", attendance: 93.8, employees: 154, leaveDays: 30 },
  { month: "Apr", attendance: 95.2, employees: 155, leaveDays: 22 },
  { month: "May", attendance: 94.7, employees: 156, leaveDays: 26 },
  { month: "Jun", attendance: 94.2, employees: 156, leaveDays: 24 },
];

const quickLinks = [
  {
    title: "Add Employee",
    description: "Register a new employee",
    icon: UserPlus,
    href: "/dashboard/hr/employee-management",
    color: "bg-blue-500",
  },
  {
    title: "Process Payroll",
    description: "Generate and process payroll",
    icon: DollarSign,
    href: "/dashboard/hr/payroll",
    color: "bg-green-500",
  },
  {
    title: "Leave Management",
    description: "Manage employee leave requests",
    icon: Calendar,
    href: "/dashboard/hr/leave-attendance",
    color: "bg-purple-500",
  },
  {
    title: "Employee Records",
    description: "View and manage employee information",
    icon: Users,
    href: "/dashboard/hr/employee-management",
    color: "bg-orange-500",
  },
  {
    title: "Attendance Tracking",
    description: "Monitor daily attendance",
    icon: Clock,
    href: "/dashboard/hr/leave-attendance",
    color: "bg-indigo-500",
  },
  {
    title: "HR Reports",
    description: "Generate HR analytics reports",
    icon: FileText,
    href: "/dashboard/hr",
    color: "bg-red-500",
  },
];

export default function HRPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Overview</h1>
          <p className="text-muted-foreground">
            Manage employees, payroll, and human resources activities
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
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalEmployees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{statsData.newHires} new hires this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.activeStaff.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((statsData.activeStaff / statsData.totalEmployees) * 100).toFixed(1)}% active rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payroll Processed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.payrollProcessed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              ${statsData.thisMonthPayroll.toLocaleString()} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">
              {statsData.totalLeaveDays} leave days taken
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Leave Statistics Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Leave Statistics
            </CardTitle>
            <CardDescription>
              Breakdown of leave types taken by employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveStats.map((item) => (
                <div key={item.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium">{item.type}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.days} days
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span className="font-medium">{item.percentage}%</span>
                    <span>100%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Trend Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Attendance Trend
            </CardTitle>
            <CardDescription>
              Monthly attendance rates and employee count
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {attendanceTrend.reduce((sum, item) => sum + item.employees, 0) / attendanceTrend.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Employees</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {(attendanceTrend.reduce((sum, item) => sum + item.attendance, 0) / attendanceTrend.length).toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Attendance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {attendanceTrend.reduce((sum, item) => sum + item.leaveDays, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Leave Days</div>
                </div>
              </div>
              <div className="space-y-2">
                {attendanceTrend.slice(-3).map((item) => (
                  <div key={item.month} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm font-medium">{item.month}</span>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-blue-600">{item.employees} Employees</span>
                      <span className="text-green-600">{item.attendance}% Attendance</span>
                      <span className="text-purple-600">{item.leaveDays} Leave Days</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Access key HR functions and manage employee records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <Card key={link.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${link.color} text-white`}>
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm">{link.title}</h3>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest HR activities and employee updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <UserPlus className="w-4 h-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">New employee John Smith registered</p>
                <p className="text-xs text-muted-foreground">2 hours ago by HR Manager</p>
              </div>
              <Badge variant="secondary">New Hire</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Calendar className="w-4 h-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Leave request approved for Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">4 hours ago by Manager</p>
              </div>
              <Badge variant="outline">Approved</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Payroll processing due for June</p>
                <p className="text-xs text-muted-foreground">1 day ago by System</p>
              </div>
              <Badge variant="destructive">Due Soon</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 