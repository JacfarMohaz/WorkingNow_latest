"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wallet, Landmark, CreditCard, Smartphone } from "lucide-react";

const plans = [
  { name: "Basic", price: 299, description: "Best for small NGOs with up to 2 active projects" },
  { name: "Pro", price: 700, description: "For mid-sized NGOs managing up to 5 projects" },
  { name: "Premium", price: 1250, description: "Full access for large NGOs with up to 10 projects" },
];

const paymentMethods = [
  { name: "Premier Wallet", fields: ["Phone"], icon: Wallet },
  { name: "Wafi Pay", fields: ["Phone"], icon: Landmark },
  { name: "Mastercard", fields: ["Transaction ID"], icon: CreditCard },
  { name: "E-Dahab", fields: ["Phone"], icon: Smartphone },
];

export default function SignupFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    ngoName: "",
    ngoEmail: "",
    contactPerson: "",
    phone: "",
    password: "",
    plan: "",
    paymentMethod: "",
    paymentDetails: {} as Record<string, string>,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handlePaymentDetailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      paymentDetails: {
        ...form.paymentDetails,
        [e.target.name]: e.target.value,
      },
    });
  }

  function validateStep() {
    const stepErrors: Record<string, string> = {};
    if (step === 1) {
      if (!form.ngoName) stepErrors.ngoName = "Required";
      if (!form.ngoEmail) stepErrors.ngoEmail = "Required";
      if (!form.contactPerson) stepErrors.contactPerson = "Required";
      if (!form.phone) stepErrors.phone = "Required";
      if (!form.password) stepErrors.password = "Required";
    } else if (step === 2) {
      if (!form.plan) stepErrors.plan = "Select a plan";
    } else if (step === 3) {
      if (!form.paymentMethod) stepErrors.paymentMethod = "Select a payment method";
      const method = paymentMethods.find((m) => m.name === form.paymentMethod);
      if (method) {
        method.fields.forEach((field) => {
          if (!form.paymentDetails[field]) stepErrors[field] = "Required";
        });
      }
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }

  function handleNext(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (validateStep()) setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => s - 1);
  }

  function handlePlanSelect(plan: string) {
    setForm({ ...form, plan });
    setErrors({ ...errors, plan: undefined });
  }

  function handlePaymentMethodSelect(method: string) {
    setForm({ ...form, paymentMethod: method, paymentDetails: {} });
    setErrors({ ...errors, paymentMethod: undefined });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async submit
    setTimeout(() => {
      setSubmitting(false);
      router.push("/login");
    }, 1000);
  }

  // Stepper UI
  const stepTitles = ["NGO Info", "Choose Plan", "Select Payment", "Confirmation"];
  const progressPercent = ((step - 1) / 3) * 100;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background px-2 py-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900 dark:text-[#F8FAFC]">Create Your Account</h1>
        <p className="text-lg text-gray-500 dark:text-gray-300 text-center mb-8">Join thousands of NGOs using WorkingNow</p>
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-sky-400 dark:bg-sky-700 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8 px-2 md:px-8">
          {[1,2,3,4].map((n) => (
            <div key={n} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-semibold border-2 shadow-sm ${n === step ? 'bg-sky-100 text-sky-600 border-sky-400 dark:bg-sky-900 dark:text-sky-200 dark:border-sky-600' : 'bg-gray-100 text-gray-400 border-gray-200 dark:bg-[#1E293B] dark:text-gray-500 dark:border-zinc-700'}`}>{n}</div>
              <span className={`mt-2 text-xs font-medium ${n === step ? 'text-sky-600 dark:text-sky-200' : 'text-gray-400 dark:text-gray-500'}`}>{stepTitles[n-1]}</span>
            </div>
          ))}
        </div>
        <Card className="w-full shadow-xl border-none bg-white/90 dark:bg-[#1E293B]/90">
          <CardContent className="py-8 px-6 md:px-12">
            {step === 1 && (
              <form className="flex flex-col gap-5" onSubmit={handleNext}>
                <CardHeader className="px-0 pb-2">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Account Details</CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-300">Enter your basic account information</CardDescription>
                </CardHeader>
                <div className="grid gap-3">
                  <Label className="text-gray-900 dark:text-[#F8FAFC]">NGO Name</Label>
                  <Input name="ngoName" value={form.ngoName} onChange={handleChange} required placeholder="Enter your NGO name" />
                  {errors.ngoName && <span className="text-red-500 text-xs">{errors.ngoName}</span>}
                </div>
                <div className="grid gap-3">
                  <Label className="text-gray-900 dark:text-[#F8FAFC]">NGO Email</Label>
                  <Input name="ngoEmail" type="email" value={form.ngoEmail} onChange={handleChange} required placeholder="Enter your email" />
                  {errors.ngoEmail && <span className="text-red-500 text-xs">{errors.ngoEmail}</span>}
                </div>
                <div className="grid gap-3">
                  <Label className="text-gray-900 dark:text-[#F8FAFC]">Contact Person</Label>
                  <Input name="contactPerson" value={form.contactPerson} onChange={handleChange} required placeholder="Enter contact person" />
                  {errors.contactPerson && <span className="text-red-500 text-xs">{errors.contactPerson}</span>}
                </div>
                <div className="grid gap-3">
                  <Label className="text-gray-900 dark:text-[#F8FAFC]">Phone</Label>
                  <Input name="phone" value={form.phone} onChange={handleChange} required placeholder="Enter your phone" />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
                </div>
                <div className="grid gap-3">
                  <Label className="text-gray-900 dark:text-[#F8FAFC]">Password</Label>
                  <Input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="Enter your password" />
                  {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                </div>
                <CardFooter className="flex justify-end px-0 mt-4">
                  <Button type="submit" className="px-8">Next <span className="ml-2">→</span></Button>
                </CardFooter>
              </form>
            )}
            {step === 2 && (
              <form className="flex flex-col gap-5" onSubmit={handleNext}>
                <CardHeader className="px-0 pb-2">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Choose Plan</CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-300">Select a plan that fits your needs</CardDescription>
                </CardHeader>
                <div className="flex flex-col md:flex-row gap-4">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={`flex-1 border rounded-xl p-6 cursor-pointer transition-all shadow-sm hover:shadow-md hover:scale-105 ${form.plan === plan.name ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/80 dark:border-sky-700 ring-2 ring-sky-400' : 'border-gray-200 dark:border-zinc-700 bg-white dark:bg-[#273648]'}`}
                      onClick={() => handlePlanSelect(plan.name)}
                    >
                      <div className="text-xl font-bold mb-2 text-gray-900 dark:text-[#F8FAFC]">{plan.name}</div>
                      <div className="text-3xl font-bold text-sky-600 dark:text-sky-300">${plan.price}</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{plan.description}</p>
                    </div>
                  ))}
                </div>
                {errors.plan && <span className="text-red-500 text-xs">{errors.plan}</span>}
                <CardFooter className="flex justify-between px-0 mt-4">
                  <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                  <Button type="submit" className="px-8">Next <span className="ml-2">→</span></Button>
                </CardFooter>
              </form>
            )}
            {step === 3 && (
              <form className="flex flex-col gap-5" onSubmit={handleNext}>
                <CardHeader className="px-0 pb-2">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Select Payment Method</CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-300">Choose your payment method</CardDescription>
                </CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition-all shadow-sm hover:shadow-md ${form.paymentMethod === method.name ? 'border-sky-400 bg-sky-50 dark:bg-sky-900/80 dark:border-sky-700 ring-2 ring-sky-400' : 'border-gray-200 dark:border-zinc-700 bg-white dark:bg-[#273648]'}`}
                      onClick={() => handlePaymentMethodSelect(method.name)}
                    >
                      <method.icon className="w-8 h-8 text-sky-600 dark:text-sky-400" />
                      <span className="text-lg font-bold text-gray-900 dark:text-[#F8FAFC]">{method.name}</span>
                    </div>
                  ))}
                </div>
                {errors.paymentMethod && <span className="text-red-500 text-xs">{errors.paymentMethod}</span>}
                {form.paymentMethod && (
                  <div className="mt-6 flex flex-col gap-4">
                    {paymentMethods.find((m) => m.name === form.paymentMethod)?.fields.map((field) => (
                      <div key={field}>
                        <Label className="text-gray-900 dark:text-[#F8FAFC]">{field}</Label>
                        <Input
                          name={field}
                          value={form.paymentDetails[field] || ""}
                          onChange={handlePaymentDetailChange}
                          required
                          placeholder={`Enter ${field.toLowerCase()}`}
                        />
                        {errors[field] && <span className="text-red-500 text-xs">{errors[field]}</span>}
                      </div>
                    ))}
                  </div>
                )}
                <CardFooter className="flex justify-between px-0 mt-4">
                  <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                  <Button type="submit" className="px-8">Next <span className="ml-2">→</span></Button>
                </CardFooter>
              </form>
            )}
            {step === 4 && (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <CardHeader className="px-0 pb-2">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC]">Confirmation</CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-300">Review your information before submitting</CardDescription>
                </CardHeader>
                <div className="bg-gray-50 dark:bg-[#334155] rounded-lg p-4 mb-4">
                  <div className="mb-2"><span className="font-semibold">NGO Name:</span> {form.ngoName}</div>
                  <div className="mb-2"><span className="font-semibold">NGO Email:</span> {form.ngoEmail}</div>
                  <div className="mb-2"><span className="font-semibold">Contact Person:</span> {form.contactPerson}</div>
                  <div className="mb-2"><span className="font-semibold">Phone:</span> {form.phone}</div>
                  <div className="mb-2"><span className="font-semibold">Plan:</span> {form.plan}</div>
                  <div className="mb-2"><span className="font-semibold">Payment Method:</span> {form.paymentMethod}</div>
                  {form.paymentMethod && paymentMethods.find((m) => m.name === form.paymentMethod)?.fields.map((field) => (
                    <div className="mb-2" key={field}><span className="font-semibold">{field}:</span> {form.paymentDetails[field]}</div>
                  ))}
                </div>
                <CardFooter className="flex justify-between px-0 mt-4">
                  <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                  <Button type="submit" className="px-8" disabled={submitting}>{submitting ? "Submitting..." : "Submit & Continue to Login"}</Button>
                </CardFooter>
              </form>
            )}
          </CardContent>
        </Card>
        <p className="mt-8 text-gray-500 dark:text-gray-300 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-sky-500 hover:underline dark:text-sky-400">Sign in</Link>
        </p>
      </div>
    </div>
  );
} 