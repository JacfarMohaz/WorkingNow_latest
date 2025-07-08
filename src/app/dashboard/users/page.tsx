"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new User Configuration page
    router.replace("/dashboard/users/config");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Redirecting...</h2>
        <p className="text-muted-foreground">Taking you to User Configuration</p>
      </div>
    </div>
  );
} 