"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NgoInfoPage() {
  // Mock pre-filled data
  const [ngo, setNgo] = useState({
    name: "Sample NGO",
    email: "ngo@example.com",
    contact: "Jane Doe",
    phone: "+1234567890",
    dateFounded: "",
    type: "",
    license: null as File | null,
    profile: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;
    setNgo(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] dark:bg-[#0F172A] p-4">
        <Card className="w-full max-w-lg p-8 text-center bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-zinc-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-[#F8FAFC]">Thank you!</h2>
          <p className="text-gray-600 dark:text-gray-300">Your NGO info has been submitted.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#0F172A] p-4">
      {/* Title and subtitle */}
      <h1 className="text-4xl font-bold text-center mt-8 mb-2 text-gray-900 dark:text-[#F8FAFC]">Tell Us About Your NGO</h1>
      <p className="text-lg text-gray-500 dark:text-gray-300 text-center mb-10">Help us customize your experience</p>
      <Card className="w-full max-w-2xl p-10 bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-zinc-700 shadow-lg">
        <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-[#F8FAFC]">Organization Information</h2>
        <p className="text-gray-500 dark:text-gray-300 mb-8">Please provide details about your NGO to get started</p>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <Label className="text-gray-900 dark:text-[#F8FAFC]">NGO Name</Label>
            <Input name="name" value={ngo.name} readOnly className="mt-2 bg-gray-50 dark:bg-[#334155] text-gray-900 dark:text-[#F8FAFC] border border-gray-200 dark:border-zinc-700 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
          </div>
          <div>
            <Label className="text-gray-900 dark:text-[#F8FAFC]">Contact Person</Label>
            <Input name="contact" value={ngo.contact} readOnly className="mt-2 bg-gray-50 dark:bg-[#334155] text-gray-900 dark:text-[#F8FAFC] border border-gray-200 dark:border-zinc-700 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
          </div>
          <div>
            <Label className="text-gray-900 dark:text-[#F8FAFC]">Phone</Label>
            <Input name="phone" value={ngo.phone} readOnly className="mt-2 bg-gray-50 dark:bg-[#334155] text-gray-900 dark:text-[#F8FAFC] border border-gray-200 dark:border-zinc-700 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
          </div>
          <div>
            <Label className="text-gray-900 dark:text-[#F8FAFC]">Date Founded</Label>
            <Input name="dateFounded" type="date" value={ngo.dateFounded} onChange={handleChange} required className="mt-2 bg-gray-50 dark:bg-[#334155] text-gray-900 dark:text-[#F8FAFC] border border-gray-200 dark:border-zinc-700 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
          </div>
          <div>
            <Label className="text-gray-900 dark:text-[#F8FAFC]">NGO Type</Label>
            <Input name="type" value={ngo.type} onChange={handleChange} required className="mt-2 bg-gray-50 dark:bg-[#334155] text-gray-900 dark:text-[#F8FAFC] border border-gray-200 dark:border-zinc-700 placeholder:text-gray-400 dark:placeholder:text-gray-400" />
          </div>
          <div>
            <Label className="text-gray-900 dark:text-[#F8FAFC]">Upload License Document</Label>
            <Input name="license" type="file" accept=".pdf,.jpg,.png" onChange={handleChange} required className="mt-2 bg-gray-50 dark:bg-[#334155] text-gray-900 dark:text-[#F8FAFC] border border-gray-200 dark:border-zinc-700 file:bg-sky-50 file:dark:bg-sky-900 file:text-sky-700 file:dark:text-sky-200 file:border-0 file:rounded file:px-3 file:py-1.5" />
          </div>
          <div>
            <Label className="text-gray-900 dark:text-[#F8FAFC]">Upload NGO Profile Document</Label>
            <Input name="profile" type="file" accept=".pdf,.jpg,.png" onChange={handleChange} required className="mt-2 bg-gray-50 dark:bg-[#334155] text-gray-900 dark:text-[#F8FAFC] border border-gray-200 dark:border-zinc-700 file:bg-sky-50 file:dark:bg-sky-900 file:text-sky-700 file:dark:text-sky-200 file:border-0 file:rounded file:px-3 file:py-1.5" />
          </div>
          <Button type="submit" className="mt-6 bg-sky-300 hover:bg-sky-400 text-white dark:bg-sky-700 dark:hover:bg-sky-600 dark:text-[#F8FAFC] text-lg font-semibold py-3">Submit</Button>
        </form>
      </Card>
    </div>
  );
} 