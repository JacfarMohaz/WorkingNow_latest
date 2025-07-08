"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    // Mock user data and login logic
    const mockUsers = {
      "user-incomplete@test.com": { hasCompletedNgoInfo: false },
      "user-complete@test.com": { hasCompletedNgoInfo: true },
    };

    const user = mockUsers[email as keyof typeof mockUsers];

    if (user) {
      // Simulate successful login by setting a cookie
      Cookies.set("auth_token", "mock_token_for_demo", { expires: 1 }); // Expires in 1 day

      // Redirect based on NGO info completion
      if (user.hasCompletedNgoInfo) {
        router.push("/dashboard");
      } else {
        router.push("/ngo-info");
      }
    } else {
      setError("Invalid credentials. Use 'user-incomplete@test.com' or 'user-complete@test.com'.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#0F172A] p-4">
      <h1 className="text-4xl font-bold mb-2 text-center text-gray-900 dark:text-[#F8FAFC]">Welcome Back</h1>
      <p className="text-lg text-gray-500 dark:text-gray-300 mb-8 text-center">Sign in to your account</p>
      <Card className="w-full max-w-md p-8 shadow-lg bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-zinc-700">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-[#F8FAFC]">Sign In</h2>
        <p className="text-gray-500 dark:text-gray-300 mb-6">Enter your credentials to access your account. <br /> Use <b>user-incomplete@test.com</b> or <b>user-complete@test.com</b></p>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <Label className="text-gray-900 dark:text-[#F8FAFC]">Email</Label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email" className="bg-gray-100 dark:bg-[#334155] text-gray-900 dark:text-[#F8FAFC] border border-gray-200 dark:border-zinc-700 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
          <Label className="text-gray-900 dark:text-[#F8FAFC]">Password</Label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Enter your password" className="bg-gray-100 dark:bg-[#334155] text-gray-900 dark:text-[#F8FAFC] border border-gray-200 dark:border-zinc-700 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="mt-4 bg-sky-300 hover:bg-sky-400 text-white dark:bg-sky-700 dark:hover:bg-sky-600 dark:text-[#F8FAFC]">Sign In</Button>
        </form>
      </Card>
      <p className="mt-6 text-gray-500 dark:text-gray-300 text-center">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-sky-500 hover:underline dark:text-sky-400">Sign up</Link>
      </p>
    </div>
  );
} 