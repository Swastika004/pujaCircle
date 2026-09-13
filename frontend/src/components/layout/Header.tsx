import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/auth.store';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Home,
  Search,
  Calendar,
  MapPin,
  User,
  LogOut,
  Menu,
  Phone,
  Info,
  ChevronDown,
  Compass,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PujaCircleLogo } from '@/components/common/PujaCircleLogo';

/**
 * Public Website Header (Used in PublicLayout)
 * Light Temple Ivory & Gold Aesthetic (#FFFFFF / Chandan trims).
 * Features:
 * - Direct primary navigation: Home, About, Contact (or Devotee portals when logged in)
 * - Swift Profile Avatar Dropdown Menu
 * - Refined sacred red and haldi gold action buttons
 * - Mobile drawer in matching light theme
 */
export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative transition-all font-semibold text-xs sm:text-sm flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl cursor-pointer select-none',
      isActive
        ? 'text-[#780016] font-bold bg-amber-100/90 border border-amber-300 shadow-xs'
        : 'text-stone-700 hover:text-[#780016] hover:bg-amber-50/70 border border-transparent'
    );

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors border-l-2',
      isActive
        ? 'bg-amber-100 text-[#780016] font-bold border-amber-500'
        : 'text-stone-700 hover:bg-amber-50/60 hover:text-stone-950 border-transparent'
    );

  const isDevotee = isAuthenticated && user?.role === 'USER';
  const userInitials = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-300/90 bg-white/95 backdrop-blur-xs text-stone-900 shadow-xs">
      <div className="container flex h-16 items-center justify-between">
        {/* 1. Left: Brand Logo */}
        <Link
          to={isDevotee ? '/user/home' : '/'}
          className="flex items-center gap-2 font-bold text-lg sm:text-xl text-stone-950 tracking-tight group select-none shrink-0"
        >
          <PujaCircleLogo size={32} className="shadow-sm transition-transform group-hover:scale-105 shrink-0" />
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif text-stone-950 font-extrabold text-lg sm:text-xl">
              Puja<span className="text-[#991B1B] font-sans font-bold">Circle</span>
            </span>
            <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-widest text-[#780016] bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-full">
              Vedic Sanctum
            </span>
          </div>
        </Link>

        {/* 2. Center: Direct Fast Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
          {isDevotee ? (
            <>
              <NavLink to="/user/home" className={navLinkClass}>
                <Home className="h-4 w-4 text-amber-700" />
                <span>Home</span>
              </NavLink>
              <NavLink to="/advisor" className={navLinkClass}>
                <Compass className="h-4 w-4 text-[hsl(var(--advisor-accent))]" />
                <span>Sankalp Advisor</span>
              </NavLink>
              <NavLink to="/user/priests" className={navLinkClass}>
                <Search className="h-4 w-4 text-amber-700" />
                <span>Find Priests</span>
              </NavLink>
              <NavLink to="/user/bookings" className={navLinkClass}>
                <Calendar className="h-4 w-4 text-amber-700" />
                <span>My Bookings</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/advisor" className={navLinkClass}>
                <Compass className="h-4 w-4 text-[hsl(var(--advisor-accent))]" />
                <span>Sankalp Advisor</span>
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About 
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </>
          )}
        </nav>

        {/* 3. Right: Profile Dropdown Menu & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {isDevotee && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5 sm:gap-2 pl-1.5 pr-2.5 sm:pr-3 py-1.5 h-9 rounded-xl border border-amber-300 bg-white text-stone-900 shadow-xs hover:border-amber-400 hover:bg-amber-50/50 transition-all cursor-pointer max-w-35 xs:max-w-[170px] sm:max-w-none"
                >
                  <Avatar className="h-6 w-6 ring-1 ring-amber-400 bg-amber-50 shrink-0">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="text-[11px] font-serif font-bold text-red-800 bg-amber-100">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate font-semibold text-xs text-stone-900 max-w-17.5 xs:max-w-[95px] sm:max-w-36">
                    {user.name}
                  </span>
                  <ChevronDown className="h-3 w-3 text-stone-500 opacity-70 shrink-0" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 p-1.5 bg-white border-2 border-amber-300 shadow-xl rounded-xl">
                <DropdownMenuLabel className="font-normal px-2 py-1.5">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-xs font-bold font-serif text-stone-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{user.phoneNumber || user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-amber-100 my-1" />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => navigate('/user/addresses')}
                    className="flex items-center gap-2.5 text-xs py-2 px-2 cursor-pointer rounded-lg hover:bg-amber-50 focus:bg-amber-50 text-stone-800"
                  >
                    <MapPin className="h-3.5 w-3.5 text-amber-600" />
                    <span>Saved Addresses</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate('/user/profile')}
                    className="flex items-center gap-2.5 text-xs py-2 px-2 cursor-pointer rounded-lg hover:bg-amber-50 focus:bg-amber-50 text-stone-800"
                  >
                    <User className="h-3.5 w-3.5 text-stone-700" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-amber-100 my-1" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 text-xs py-2 px-2 text-red-700 focus:bg-red-50 cursor-pointer rounded-lg font-semibold"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2.5">
              <Link to="/user/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-bold text-stone-800 hover:text-[#780016] hover:bg-amber-50 rounded-xl cursor-pointer"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/user/register">
                <Button
                  size="sm"
                  className="text-xs font-bold bg-[#991B1B] hover:bg-[#7F1D1D] text-white shadow-sm active:scale-[0.98] transition-all rounded-xl px-4 border border-amber-400/60 cursor-pointer"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Drawer */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
            <SheetContent side="right" className="w-70 sm:w-80 flex flex-col justify-between p-6 bg-white text-stone-900 border-l-2 border-amber-300">
              <div className="space-y-6">
                <SheetHeader className="text-left border-b border-amber-200 pb-4">
                  <SheetTitle className="flex items-center gap-2 font-serif text-lg text-stone-950">
                    <PujaCircleLogo size={28} className="shadow-xs" />
                    <span>Puja<span className="text-[#991B1B] font-sans font-bold">Circle</span></span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Links */}
                <div className="flex flex-col space-y-1">
                  {isDevotee && user ? (
                    <>
                      <div className="px-3 py-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        Navigation
                      </div>
                      <NavLink
                        to="/user/home"
                        className={mobileNavLinkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </NavLink>
                      <NavLink
                        to="/user/priests"
                        className={mobileNavLinkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        <Search className="h-4 w-4" />
                        <span>Find Priests</span>
                      </NavLink>
                      <NavLink
                        to="/user/bookings"
                        className={mobileNavLinkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        <Calendar className="h-4 w-4" />
                        <span>My Bookings</span>
                      </NavLink>
                      <NavLink
                        to="/user/addresses"
                        className={mobileNavLinkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        <MapPin className="h-4 w-4" />
                        <span>Saved Addresses</span>
                      </NavLink>
                      <NavLink
                        to="/user/profile"
                        className={mobileNavLinkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <div className="px-3 py-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        Menu
                      </div>
                      <NavLink
                        to="/"
                        end
                        className={mobileNavLinkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </NavLink>
                      <NavLink
                        to="/about"
                        className={mobileNavLinkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        <Info className="h-4 w-4" />
                        <span>About</span>
                      </NavLink>
                      <NavLink
                        to="/contact"
                        className={mobileNavLinkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        <Phone className="h-4 w-4" />
                        <span>Contact</span>
                      </NavLink>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom Mobile Actions */}
              <div className="border-t border-amber-200 pt-4 space-y-2">
                {isDevotee ? (
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 text-red-700 hover:bg-red-50 border-red-200 text-xs font-bold"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Link to="/user/login" onClick={() => setIsOpen(false)} className="block w-full">
                      <Button variant="outline" className="w-full text-xs font-bold border-amber-300 text-stone-800 hover:bg-amber-50">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/user/register" onClick={() => setIsOpen(false)} className="block w-full">
                      <Button className="w-full text-xs font-bold bg-[#991B1B] hover:bg-[#7F1D1D] text-white">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
