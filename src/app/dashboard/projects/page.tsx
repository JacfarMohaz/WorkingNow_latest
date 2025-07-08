"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  PieChart,
  FolderOpen,
  CheckCircle,
  Clock,
  Plus,
  Users,
  Target,
  Calendar,
  AlertCircle,
  Play,
  DollarSign,
  FileText,
} from "lucide-react";

// Mock data for the projects dashboard
const statsData = {
  allProjects: 24,
  ongoingProjects: 12,
  completedProjects: 8,
  onHoldProjects: 4,
  totalBudget: 2500000,
  spentBudget: 1850000,
  totalTeamMembers: 89,
  averageCompletion: 78.5,
};

const projectsByCategory = [
  { category: "Infrastructure", count: 8, percentage: 33.3, color: "bg-blue-500" },
  { category: "Software Development", count: 6, percentage: 25.0, color: "bg-green-500" },
  { category: "Research", count: 4, percentage: 16.7, color: "bg-purple-500" },
  { category: "Training", count: 3, percentage: 12.5, color: "bg-orange-500" },
  { category: "Community Outreach", count: 2, percentage: 8.3, color: "bg-red-500" },
  { category: "Other", count: 1, percentage: 4.2, color: "bg-gray-500" },
];

const projectTimeline = [
  { month: "Jan", started: 3, completed: 1, ongoing: 8 },
  { month: "Feb", started: 2, completed: 2, ongoing: 9 },
  { month: "Mar", started: 4, completed: 1, ongoing: 12 },
  { month: "Apr", started: 1, completed: 2, ongoing: 11 },
  { month: "May", started: 3, completed: 1, ongoing: 13 },
  { month: "Jun", started: 2, completed: 1, ongoing: 12 },
];

const quickLinks = [
  {
    title: "Add Project",
    description: "Create a new project",
    icon: Plus,
    href: "/dashboard/projects",
    color: "bg-blue-500",
  },
  {
    title: "Assign User",
    description: "Assign team members to projects",
    icon: Users,
    href: "/dashboard/projects",
    color: "bg-green-500",
  },
  {
    title: "Project Timeline",
    description: "View project schedules",
    icon: Calendar,
    href: "/dashboard/projects",
    color: "bg-purple-500",
  },
  {
    title: "Budget Management",
    description: "Track project budgets",
    icon: DollarSign,
    href: "/dashboard/projects",
    color: "bg-orange-500",
  },
  {
    title: "Project Reports",
    description: "Generate project reports",
    icon: FileText,
    href: "/dashboard/projects",
    color: "bg-indigo-500",
  },
  {
    title: "Milestones",
    description: "Track project milestones",
    icon: Target,
    href: "/dashboard/projects",
    color: "bg-red-500",
  },
];

export default function ProjectsPage() {
  const budgetUtilization = (statsData.spentBudget / statsData.totalBudget) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects Overview</h1>
          <p className="text-muted-foreground">
            Monitor project progress, manage timelines, and track budgets
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
            <CardTitle className="text-sm font-medium">All Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.allProjects.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {statsData.averageCompletion}% average completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ongoing</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.ongoingProjects.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {statsData.totalTeamMembers} team members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.completedProjects.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((statsData.completedProjects / statsData.allProjects) * 100).toFixed(1)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilized</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{budgetUtilization.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              ${statsData.spentBudget.toLocaleString()} of ${statsData.totalBudget.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Projects by Category Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Projects by Category
            </CardTitle>
            <CardDescription>
              Distribution of projects across different categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectsByCategory.map((item) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm font-medium">{item.category}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.count} projects
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

        {/* Project Timeline Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Project Timeline
            </CardTitle>
            <CardDescription>
              Project starts, completions, and ongoing projects over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {projectTimeline.reduce((sum, item) => sum + item.started, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Started</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {projectTimeline.reduce((sum, item) => sum + item.completed, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.max(...projectTimeline.map(item => item.ongoing))}
                  </div>
                  <div className="text-xs text-muted-foreground">Max Ongoing</div>
                </div>
              </div>
              <div className="space-y-2">
                {projectTimeline.slice(-3).map((item) => (
                  <div key={item.month} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm font-medium">{item.month}</span>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-blue-600">{item.started} Started</span>
                      <span className="text-green-600">{item.completed} Completed</span>
                      <span className="text-purple-600">{item.ongoing} Ongoing</span>
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
            Access key project management functions and create new projects
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
            Latest project updates and milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Infrastructure Project Phase 1 completed</p>
                <p className="text-xs text-muted-foreground">3 hours ago by Project Manager</p>
              </div>
              <Badge variant="secondary">Completed</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Play className="w-4 h-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Software Development Project started</p>
                <p className="text-xs text-muted-foreground">1 day ago by Tech Lead</p>
              </div>
              <Badge variant="outline">In Progress</Badge>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Research Project milestone due</p>
                <p className="text-xs text-muted-foreground">2 days ago by System</p>
              </div>
              <Badge variant="destructive">Due Soon</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}