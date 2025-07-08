"use client";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// In a real app, this would come from an auth context or hook
const mockUser = {
  role: "admin", // 'admin' or 'user'
  plan: "Basic", // 'Basic', 'Pro', or 'Premium'
  projects: [
    { name: "Project A", description: "Water wells" },
    { name: "Project B", description: "Education program" },
  ],
};

const PLAN_LIMITS = {
  Basic: 2,
  Pro: 5,
  Premium: 10,
};

export default function ProjectPage() {
  const [user, setUser] = useState(mockUser);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [selected, setSelected] = useState<string | null>(null);

  const projectLimit = PLAN_LIMITS[user.plan as keyof typeof PLAN_LIMITS];
  const hasReachedLimit = useMemo(() => {
    return user.role === 'admin' && user.projects.length >= projectLimit;
  }, [user.projects, user.role, projectLimit]);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (hasReachedLimit) return;
    
    setUser(currentUser => ({
        ...currentUser,
        projects: [...currentUser.projects, newProject]
    }));
    setNewProject({ name: "", description: "" });
  }
  
  const isAdmin = user.role === 'admin';

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold mb-4">Project Setup</h2>
      {isAdmin && (
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-2">Create New Project</h3>
          {hasReachedLimit && (
            <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-md">
              You have reached the maximum number of projects ({projectLimit}) for your &apos;{user.plan}&apos; plan.
            </div>
          )}
          <form className="flex flex-col gap-2" onSubmit={handleCreate}>
            <Label>Project Name</Label>
            <Input 
              value={newProject.name} 
              onChange={e => setNewProject({ ...newProject, name: e.target.value })} 
              required 
              disabled={hasReachedLimit}
            />
            <Label>Description</Label>
            <Input 
              value={newProject.description} 
              onChange={e => setNewProject({ ...newProject, description: e.target.value })} 
              required 
              disabled={hasReachedLimit}
            />
            <Button type="submit" className="mt-2" disabled={hasReachedLimit}>
              {hasReachedLimit ? "Project Limit Reached" : "Create Project"}
            </Button>
          </form>
        </Card>
      )}
      <Card className="p-6">
        <h3 className="font-semibold mb-2">{isAdmin ? "Select Existing Project" : "Your Assigned Projects"}</h3>
        <div className="flex flex-col gap-2">
          {user.projects.map((p, i) => (
            <Button
              key={i}
              variant={selected === p.name ? "default" : "outline"}
              onClick={() => setSelected(p.name)}
              className="justify-start"
            >
              <span className="font-bold mr-2">{p.name}</span>
              <span className="text-muted-foreground">{p.description}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
} 