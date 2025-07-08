"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Users,
  LayoutDashboard,
  Banknote,
  ShoppingCart,
  BarChart2,
  UserCircle,
  FolderKanban,
  CheckSquare,
  FileText,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Finance", href: "/dashboard/finance", icon: Banknote },
  { name: "Procurement", href: "/dashboard/procurement", icon: ShoppingCart },
  { name: "Program Mgmt", href: "/dashboard/program", icon: BarChart2 },
  { name: "HR", href: "/dashboard/hr", icon: UserCircle },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Documents", href: "/dashboard/documents", icon: FileText },
];

const userManagementLinks = [
  { name: "User Configuration", href: "/dashboard/users/config" },
  { name: "Add User", href: "/dashboard/users/add" },
];

const financeLinks = [
  { name: "Finance Dashboard", href: "/dashboard/finance" },
  { name: "Payment Voucher Creation", href: "/dashboard/finance/payment-voucher" },
  { name: "BANK RECONCILIATION Form", href: "/dashboard/finance/bank-reconciliation" },
  { name: "Reimbursement Letter", href: "/dashboard/finance/reimbursement-letter" },
  { name: "Excel Sheet Upload/Download", href: "/dashboard/finance/excel-upload" },
  { name: "General Document Upload/Download", href: "/dashboard/finance/general-documents" },
  { name: "Budget Allocation", href: "/dashboard/finance/budget-allocation" },
];

// Procurement navigation links
const procurementLinks = [
  { name: "Procurement Dashboard", href: "/dashboard/procurement" },
  { name: "Request for Quotation (RFQ)", href: "/dashboard/procurement/rfq" },
  { name: "Purchase Orders", href: "/dashboard/procurement/purchase-orders" },
  { name: "Bid Analysis", href: "/dashboard/procurement/bid-analysis" },
  { name: "Prequalified Suppliers", href: "/dashboard/procurement/suppliers" },
  { name: "Award & Regret Letters", href: "/dashboard/procurement/award-letters" },
  { name: "Goods Received Note", href: "/dashboard/procurement/grn" },
  { name: "Meeting Minutes", href: "/dashboard/procurement/meeting-minutes" },
  { name: "Tender Forms", href: "/dashboard/procurement/tender-forms" },
  { name: "Asset Registery Form", href: "/dashboard/procurement/asset-registery" },
  { name: "General Documents", href: "/dashboard/procurement/general-documents" },
];

const programLinks = [
  { name: "Program Dashboard", href: "/dashboard/program" },
  { name: "Purchase Requisition Forms", href: "/dashboard/program/purchase-requisition" },
  { name: "Report Forms", href: "/dashboard/program/report-forms" },
  { name: "Service Accomplishment Certificates", href: "/dashboard/program/service-certificates" },
  { name: "Activity Planning and Tracking", href: "/dashboard/program/activity-tracking" },
  { name: "General Documents", href: "/dashboard/program/general-documents" },
];

const hrLinks = [
  { name: "Employee Management", href: "/dashboard/hr/employee-management" },
  { name: "Payroll Processing", href: "/dashboard/hr/payroll" },
  { name: "Leave and Attendance Tracking", href: "/dashboard/hr/leave-attendance" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(false);
  const [procurementOpen, setProcurementOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [hrOpen, setHrOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside className={`fixed left-0 top-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } flex flex-col h-screen`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">WorkingNow</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md hover:bg-muted md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto h-0 px-4 py-6 space-y-2">
          {navLinks.map(link => {
            if (link.name === "Finance") {
              return (
                <div key="finance-dropdown" className="space-y-1">
                  <button
                    onClick={() => setFinanceOpen(v => !v)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                      ${financeOpen ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                    aria-expanded={financeOpen}
                  >
                    <div className="flex items-center gap-3">
                      <Banknote className={`w-4 h-4 ${financeOpen ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`} />
                      <span>Finance</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${financeOpen ? 'rotate-90' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${financeOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-7 space-y-1">
                      {financeLinks.map(link => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors
                            ${pathname === link.href ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            if (link.name === "Procurement") {
              return (
                <div key="procurement-dropdown" className="space-y-1">
                  <button
                    onClick={() => setProcurementOpen(v => !v)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                      ${procurementOpen ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                    aria-expanded={procurementOpen}
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingCart className={`w-4 h-4 ${procurementOpen ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`} />
                      <span>Procurement</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${procurementOpen ? 'rotate-90' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${procurementOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-7 space-y-1">
                      {procurementLinks.map(link => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors
                            ${pathname === link.href ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            if (link.name === "Program Mgmt") {
              return (
                <div key="program-dropdown" className="space-y-1">
                  <button
                    onClick={() => setProgramOpen(v => !v)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                      ${programOpen ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                    aria-expanded={programOpen}
                  >
                    <div className="flex items-center gap-3">
                      <BarChart2 className={`w-4 h-4 ${programOpen ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`} />
                      <span>Program Mgmt</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${programOpen ? 'rotate-90' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${programOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-7 space-y-1">
                      {programLinks.map(link => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors
                            ${pathname === link.href ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            if (link.name === "HR") {
              return (
                <div key="hr-dropdown" className="space-y-1">
                  <button
                    onClick={() => setHrOpen(v => !v)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                      ${hrOpen ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                    aria-expanded={hrOpen}
                  >
                    <div className="flex items-center gap-3">
                      <UserCircle className={`w-4 h-4 ${hrOpen ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`} />
                      <span>HR</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${hrOpen ? 'rotate-90' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${hrOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="ml-7 space-y-1">
                      {hrLinks.map(link => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors
                            ${pathname === link.href ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${pathname === link.href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              >
                {link.icon && <link.icon className={`w-4 h-4 ${pathname === link.href ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`} />}
                <span>{link.name}</span>
              </Link>
            );
          })}

          {/* User Management Section */}
          <div>
            <button
              onClick={() => setUserManagementOpen(v => !v)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                ${userManagementOpen ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              aria-expanded={userManagementOpen}
            >
              <div className="flex items-center gap-3">
                <Users className={`w-4 h-4 ${userManagementOpen ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`} />
                <span>User Management</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${userManagementOpen ? 'rotate-90' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${userManagementOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="ml-7 space-y-1">
                {userManagementLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 text-sm rounded-md transition-colors
                      ${pathname === link.href ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64 overflow-hidden h-full">
        {/* Fixed Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6 shadow-sm z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-muted md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-error rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <img src="https://ui-avatars.com/api/?name=Admin&background=7367F0&color=fff" alt="User" className="rounded-full" />
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
            
            <ThemeToggle />
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-background h-full">
          <div className="p-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 