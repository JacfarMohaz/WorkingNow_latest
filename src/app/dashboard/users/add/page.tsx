"use client";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  UserPlus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Eye,
  EyeOff
} from "lucide-react";

// Mock data for existing users
const mockExistingUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Finance Head",
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    role: "Finance Team",
    status: "active",
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 345-6789",
    role: "Program Manager Head",
    status: "inactive",
    createdAt: "2024-01-10"
  }
];

const roleOptions = [
  { value: "finance_head", label: "Finance Head" },
  { value: "finance_team", label: "Finance Team" },
  { value: "procurement_head", label: "Procurement Head" },
  { value: "procurement_team", label: "Procurement Team" },
  { value: "program_manager_head", label: "Program Manager Head" },
  { value: "program_manager_team", label: "Program Manager Team" },
  { value: "hr_manager", label: "HR Manager" },
  { value: "donor", label: "Donor" },
];

export default function AddUserPage() {
  const [users, setUsers] = useState(mockExistingUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "finance_head",
    password: "",
  });
  const [success, setSuccess] = useState("");

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!form.name || !form.email || !form.phone || !form.password) {
      alert("Please fill in all required fields");
      return;
    }

    // Check if email already exists
    if (users.some(user => user.email === form.email)) {
      alert("A user with this email already exists");
      return;
    }

    // Add new user
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: roleOptions.find(r => r.value === form.role)?.label || form.role,
      status: "active" as const,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, newUser]);
    setSuccess("User created successfully!");
    setForm({ name: "", email: "", phone: "", role: "finance_head", password: "" });
    
    setTimeout(() => setSuccess(""), 3000);
  };

  // Handle user editing
  const handleEdit = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditingUser(userId);
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: roleOptions.find(r => r.label === user.role)?.value || "finance_head",
        password: ""
      });
    }
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (!editingUser) return;

    const updatedUsers = users.map(user => 
      user.id === editingUser 
        ? {
            ...user,
            name: form.name,
            email: form.email,
            phone: form.phone,
            role: roleOptions.find(r => r.value === form.role)?.label || form.role,
          }
        : user
    );

    setUsers(updatedUsers);
    setEditingUser(null);
    setForm({ name: "", email: "", phone: "", role: "finance_head", password: "" });
    setSuccess("User updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingUser(null);
    setForm({ name: "", email: "", phone: "", role: "finance_head", password: "" });
  };

  // Handle delete user
  const handleDelete = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== userId));
      setSuccess("User deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>;
      case "inactive":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add User</h1>
        <p className="text-muted-foreground">
          Create new user accounts and manage existing users
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-md">
          {success}
        </div>
      )}

      {/* Add User Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            {editingUser ? "Edit User" : "Create New User"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <Label htmlFor="role">Role *</Label>
                <select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  required
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              {editingUser ? (
                <>
                  <Button type="button" onClick={handleSaveEdit}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancelEdit}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button type="submit">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create User
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* User Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Existing Users</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-80"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border dark:border-border">
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">Email</th>
                  <th className="text-left p-4 font-medium">Phone</th>
                  <th className="text-left p-4 font-medium">Role</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Created</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border dark:border-border hover:bg-muted dark:hover:bg-muted/50">
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-muted-foreground">{user.email}</td>
                    <td className="p-4 text-muted-foreground">{user.phone}</td>
                    <td className="p-4">{user.role}</td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4 text-muted-foreground">{user.createdAt}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(user.id)}
                          className="h-8 w-8 p-0"
                          title="Edit User"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(user.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No users found matching your search criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 