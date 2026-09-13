import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  LogOut,
  IndianRupee,
  Menu,
  User,
  ShieldCheck,
} from "lucide-react";
import { PujaCircleLogo } from "@/components/common/PujaCircleLogo";
import { SacredBackground } from "@/components/common/SacredBackground";

/**
 * PriestLayout
 * Royal Sanctum Workspace layout for Vedic Purohits (PRIEST role).
 * Features a fixed desktop sidebar in Royal Sanctum Maroon (#240306),
 * gold borders, glowing Om branding, mobile drawer, and top bar.
 */
export const PriestLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/priest/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/priest/dashboard", icon: LayoutDashboard },
    { label: "Services & Prices", path: "/priest/services", icon: IndianRupee },
    { label: "Availability Slots", path: "/priest/availability", icon: Clock },
    { label: "Appointments Log", path: "/priest/bookings", icon: Calendar },
  ];

  const isProfileActive = location.pathname.startsWith("/priest/profile");

  return (
    <div className="flex min-h-screen bg-background relative">
      <SacredBackground />
      {/* Priest Sidebar - Hidden on mobile, fixed on md+ screens */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-30 w-64 border-r border-amber-300/80 bg-white/95 text-stone-900 flex-col justify-between h-screen shadow-sm backdrop-blur-xs">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Workspace Branding */}
          <div className="h-16 border-b border-amber-300/60 flex items-center gap-2.5 px-6 shrink-0 bg-white">
            <PujaCircleLogo size={32} className="shadow-xs" />
            <div>
              <span className="font-serif font-black text-sm text-[#780016] tracking-tight">
                Puja<span className="text-[#B45309] font-sans">Circle</span>
              </span>
              <p className="text-[9px] uppercase font-bold tracking-widest text-[#B45309]">
                Priest Workspace
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 pt-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className="block">
                  <button
                    type="button"
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                      isActive
                        ? "bg-[#991B1B] text-white shadow-sm border border-[#780016]"
                        : "text-stone-700 hover:text-[#991B1B] hover:bg-amber-50/80 border border-transparent"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-amber-300" : "text-stone-500"}`} />
                    <span>{item.label}</span>
                  </button>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Profile Link & Logout */}
        <div className="p-3 border-t border-amber-300/60 flex flex-col gap-2.5 shrink-0 bg-[#FDFBF7]">
          <Link to="/priest/profile" className="block">
            <div
              className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
                isProfileActive
                  ? "bg-amber-100/90 text-[#991B1B] border border-amber-300/80"
                  : "hover:bg-amber-50/80 text-stone-800 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar className="h-8 w-8 ring-1 ring-amber-400 bg-amber-100 shrink-0">
                  {user?.avatarUrl ? (
                    <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" />
                  ) : null}
                  <AvatarFallback className="bg-amber-500 text-stone-950 font-serif font-black text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-3.5 w-3.5" />}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-stone-900 truncate max-w-28">
                    {user?.name || "Priest"}
                  </p>
                  <p className="text-[10px] text-stone-500 truncate max-w-28 font-mono">
                    {user?.phoneNumber || user?.email || "Priest Profile"}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-[9px] uppercase px-1.5 py-0 border-amber-400 bg-amber-50 text-amber-900 shrink-0 font-bold"
              >
                PRIEST
              </Badge>
            </div>
          </Link>

          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs text-stone-700 hover:text-[#991B1B] hover:bg-amber-50 gap-2 h-9 font-bold border border-stone-200 hover:border-amber-300 rounded-xl cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="h-3.5 w-3.5" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area - Shifted for fixed sidebar */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64 bg-background">
        {/* Top Header Bar (Light Temple Ivory & Gold) */}
        <header className="sticky top-0 z-20 h-16 border-b border-amber-300/90 bg-white/95 backdrop-blur-xs text-stone-900 flex items-center justify-between px-4 sm:px-6 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger Toggle */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 text-stone-800 hover:text-[#780016] hover:bg-amber-50"
                  aria-label="Open Navigation Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 w-72 bg-white text-stone-900 border-r border-amber-300/80 flex flex-col justify-between"
              >
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {/* Workspace Branding */}
                  <div className="h-16 border-b border-amber-300/60 flex items-center gap-2.5 px-6 shrink-0 bg-white">
                    <PujaCircleLogo size={32} className="shadow-xs" />
                    <div>
                      <span className="font-serif font-black text-sm text-[#780016]">
                        Puja<span className="text-[#B45309] font-sans">Circle</span>
                      </span>
                      <p className="text-[9px] uppercase font-bold tracking-widest text-[#B45309]">
                        Priest Workspace
                      </p>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="p-3 space-y-1.5 pt-4">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          className="block"
                        >
                          <button
                            type="button"
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                              isActive
                                ? "bg-[#991B1B] text-white shadow-sm border border-[#780016]"
                                : "text-stone-700 hover:text-[#991B1B] hover:bg-amber-50/80 border border-transparent"
                            }`}
                          >
                            <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-amber-300" : "text-stone-500"}`} />
                            <span>{item.label}</span>
                          </button>
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Mobile Sidebar Footer User Profile Link & Logout */}
                <div className="p-3 border-t border-amber-300/60 flex flex-col gap-2.5 shrink-0 bg-[#FDFBF7]">
                  <Link
                    to="/priest/profile"
                    className="block"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div
                      className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
                        isProfileActive
                          ? "bg-amber-100/90 text-[#991B1B] border border-amber-300/80"
                          : "hover:bg-amber-50/80 text-stone-800 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8 ring-1 ring-amber-400 bg-amber-100 shrink-0">
                          {user?.avatarUrl ? (
                            <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" />
                          ) : null}
                          <AvatarFallback className="bg-amber-500 text-stone-950 font-serif font-black text-xs">
                            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-3.5 w-3.5" />}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-bold text-stone-900 truncate max-w-28">
                            {user?.name || "Priest"}
                          </p>
                          <p className="text-[10px] text-stone-500 truncate max-w-28 font-mono">
                            {user?.phoneNumber || user?.email || "Priest Profile"}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[9px] uppercase px-1.5 py-0 border-amber-400 bg-amber-50 text-amber-900 font-bold"
                      >
                        PRIEST
                      </Badge>
                    </div>
                  </Link>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs text-stone-700 hover:text-[#991B1B] hover:bg-amber-50 gap-2 h-9 font-bold border border-stone-200 hover:border-amber-300 rounded-xl cursor-pointer"
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="h-3.5 w-3.5" /> Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-serif text-stone-950">
                Priest Portal
              </span>
              <span className="text-amber-400 hidden sm:inline">•</span>
              <Badge
                variant="outline"
                className="text-[10px] text-[#780016] border-amber-300 bg-amber-100/90 hidden sm:inline-flex font-bold gap-1"
              >
                <ShieldCheck className="h-3 w-3 text-amber-600" /> Verified Scholar
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-600 font-mono hidden sm:inline font-medium">
              {user?.phoneNumber || user?.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-bold text-stone-700 hover:text-[#780016] hover:bg-amber-50 gap-1.5 rounded-xl cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="h-3.5 w-3.5 text-red-700" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default PriestLayout;
