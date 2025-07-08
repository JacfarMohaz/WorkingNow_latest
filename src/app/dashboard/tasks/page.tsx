"use client";
import { useState } from "react";
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
  CheckSquare,
  Clock,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  Circle,
} from "lucide-react";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "high" | "medium" | "low";
  assignee: string;
  dueDate: string;
  project: string;
  tags: string[];
};

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design User Interface",
    description: "Create wireframes and mockups for the new dashboard",
    status: "todo",
    priority: "high",
    assignee: "Sarah Johnson",
    dueDate: "2024-01-25",
    project: "E-commerce Platform",
    tags: ["design", "ui/ux"],
  },
  {
    id: "2",
    title: "Implement Authentication",
    description: "Set up JWT authentication and user management",
    status: "in-progress",
    priority: "high",
    assignee: "Mike Chen",
    dueDate: "2024-01-30",
    project: "E-commerce Platform",
    tags: ["backend", "security"],
  },
  {
    id: "3",
    title: "Write API Documentation",
    description: "Document all REST API endpoints",
    status: "done",
    priority: "medium",
    assignee: "David Wilson",
    dueDate: "2024-01-20",
    project: "E-commerce Platform",
    tags: ["documentation", "api"],
  },
  {
    id: "4",
    title: "Setup Database Schema",
    description: "Design and implement database structure",
    status: "todo",
    priority: "high",
    assignee: "Lisa Anderson",
    dueDate: "2024-01-28",
    project: "Mobile App",
    tags: ["database", "backend"],
  },
  {
    id: "5",
    title: "Create Unit Tests",
    description: "Write comprehensive unit tests for core modules",
    status: "in-progress",
    priority: "medium",
    assignee: "John Smith",
    dueDate: "2024-02-05",
    project: "Mobile App",
    tags: ["testing", "quality"],
  },
  {
    id: "6",
    title: "Deploy to Production",
    description: "Deploy the application to production environment",
    status: "done",
    priority: "low",
    assignee: "Sarah Johnson",
    dueDate: "2024-01-15",
    project: "Data Analytics Dashboard",
    tags: ["deployment", "devops"],
  },
];

const statusColors = {
  todo: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  "in-progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  done: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

const priorityColors = {
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

const statusIcons = {
  todo: Circle,
  "in-progress": Clock,
  done: CheckCircle,
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    const matchesProject = projectFilter === "all" || task.project === projectFilter;
    
    return matchesSearch && matchesPriority && matchesProject;
  });

  const getTasksByStatus = (status: Task["status"]) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const columns = [
    { id: "todo", title: "To Do", icon: Circle },
    { id: "in-progress", title: "In Progress", icon: Clock },
    { id: "done", title: "Done", icon: CheckCircle },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track your tasks with Kanban board
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Task
        </Button>
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
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="E-commerce Platform">E-commerce Platform</SelectItem>
                <SelectItem value="Mobile App">Mobile App</SelectItem>
                <SelectItem value="Data Analytics Dashboard">Data Analytics Dashboard</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setPriorityFilter("all");
              setProjectFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="grid gap-6 lg:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          const StatusIcon = statusIcons[column.id];
          
          return (
            <Card key={column.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StatusIcon className="h-5 w-5" />
                  {column.title} ({columnTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                      draggable
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <div className="flex items-center gap-1">
                            <Badge className={priorityColors[task.priority]}>
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {task.assignee}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {task.dueDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 pt-2">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

