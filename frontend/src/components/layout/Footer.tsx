import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PujaCircleLogo } from "@/components/common/PujaCircleLogo";
import { APP_CONFIG } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type PolicyType = "terms" | "privacy" | "cookies" | null;

const POLICY_CONTENT = {
  terms: {
    title: "Terms of Service",
    description: "Guidelines and terms for users and priests on PujaCircle.",
    content: (
      <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
        <p>
          <strong className="text-foreground">1. Platform Service:</strong> PujaCircle connects users with verified priests for home pujas and ceremonies across major cities.
        </p>
        <p>
          <strong className="text-foreground">2. Transparent Pricing:</strong> Listed prices are clear and upfront. Payment is made directly in cash to the priest upon puja completion.
        </p>
        <p>
          <strong className="text-foreground">3. Conduct & Rescheduling:</strong> Users and priests agree to treat each other respectfully and provide advance notice for any unavoidable schedule changes.
        </p>
      </div>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    description: "How your personal information and puja address are protected.",
    content: (
      <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
        <p>
          <strong className="text-foreground">1. Data Collected:</strong> We collect your mobile number, email, and address solely to coordinate your puja booking and priest arrival.
        </p>
        <p>
          <strong className="text-foreground">2. Data Security:</strong> Your personal information is secure and never sold, rented, or shared with third-party advertisers.
        </p>
        <p>
          <strong className="text-foreground">3. Address Privacy:</strong> Your exact location address is only shared with the booked priest once your booking is confirmed.
        </p>
      </div>
    ),
  },
  cookies: {
    title: "Cookie Policy",
    description: "Information regarding essential cookies used on PujaCircle.",
    content: (
      <div className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
        <p>
          <strong className="text-foreground">1. Essential Cookies:</strong> We only use secure, HTTP-only session cookies necessary for maintaining authenticated login state, security tokens, and user preferences.
        </p>
        <p>
          <strong className="text-foreground">2. No Ad Trackers:</strong> PujaCircle does not employ intrusive third-party cross-site advertising or behavioral tracking cookies.
        </p>
      </div>
    ),
  },
};

/**
 * Premium Website Footer
 * Features:
 * - Brand Lineage & Sanskrit Blessing
 * - Quick Links for Ceremonies, Devotees, Purohits, and Cities
 * - Interactive Modals for Terms, Privacy, and Cookies
 * - relative z-20 to ensure it is always proudly visible on top of background canvas
 */
export const Footer: React.FC = () => {
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);

  const currentPolicy = activePolicy ? POLICY_CONTENT[activePolicy] : null;

  return (
    <footer className="relative z-20 border-t-2 border-amber-300/90 bg-[#FAF7F2] text-stone-900 mt-auto shadow-sm">
      {/* 1. Main Footer Grid (100% Flexbox, zero CSS grids) */}
      <div className="container py-12 sm:py-16">
        <div className="flex flex-wrap gap-8 sm:gap-10 justify-between items-start">
          {/* Column 1: Brand & Heritage */}
          <div className="w-full lg:w-4/12 space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 group select-none shrink-0"
            >
              <PujaCircleLogo size={36} className="shadow-xs transition-transform group-hover:scale-105" />
              <div>
                <span className="font-serif font-black text-xl text-stone-950 tracking-tight">
                  Puja<span className="text-[#991B1B] font-sans font-bold">Circle</span>
                </span>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#780016] bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  Vedic Sanctum Platform
                </p>
              </div>
            </Link>

            <p className="text-xs text-stone-600 leading-relaxed max-w-sm font-medium">
              Restoring sanctity, transparency, and reverence to every home ritual. Connecting Indian families with credentialed, Gurukul-trained Vedic Acharyas with zero advance fees.
            </p>

            <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300/80 space-y-1 shadow-xs">
              <div className="text-xs font-serif font-bold text-[#780016] italic">
                “यतो धर्मस्ततो जयः”
              </div>
              <div className="text-[11px] text-stone-600 font-medium">
                Where there is adherence to sacred Dharma, divine auspiciousness prevails.
              </div>
            </div>
          </div>

          {/* Column 2: Sacred Ceremonies */}
          <div className="w-full sm:w-[calc(50%-16px)] lg:w-2/12 space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-950 border-b border-amber-300 pb-2">
              Popular Pujas
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 font-medium">
              <li>
                <Link to="/user/priests?searchQuery=Griha%20Pravesh" className="hover:text-[#991B1B] transition-colors">
                  Griha Pravesh Puja
                </Link>
              </li>
              <li>
                <Link to="/user/priests?searchQuery=Rudrabhishek" className="hover:text-[#991B1B] transition-colors">
                  Maha Rudrabhishek
                </Link>
              </li>
              <li>
                <Link to="/user/priests?searchQuery=Satyanarayan" className="hover:text-[#991B1B] transition-colors">
                  Satyanarayan Katha
                </Link>
              </li>
              <li>
                <Link to="/user/priests?searchQuery=Durga" className="hover:text-[#991B1B] transition-colors">
                  Durga Saptashati Havan
                </Link>
              </li>
              <li>
                <Link to="/user/priests?searchQuery=Vastu" className="hover:text-[#991B1B] transition-colors">
                  Vastu Shanti Vidhi
                </Link>
              </li>
              <li>
                <Link to="/user/priests?searchQuery=Navagraha" className="hover:text-[#991B1B] transition-colors">
                  Navagraha Shanti
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Portals */}
          <div className="w-full sm:w-[calc(50%-16px)] lg:w-2/12 space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-950 border-b border-amber-300 pb-2">
              Explore & Support
            </h4>
            <ul className="space-y-2 text-xs text-stone-600 font-medium">
              <li>
                <Link to="/user/priests" className="hover:text-[#991B1B] transition-colors">
                  Find Vedic Purohits
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#991B1B] transition-colors">
                  About PujaCircle
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#991B1B] transition-colors">
                  Help & Sahayata
                </Link>
              </li>
              <li>
                <Link to="/priest/login" className="hover:text-[#991B1B] transition-colors">
                  Priest Portal
                </Link>
              </li>
              <li>
                <Link to="/user/login" className="hover:text-[#991B1B] transition-colors">
                  Devotee Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Major Cities & Verification */}
          <div className="w-full lg:w-3/12 space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-950 border-b border-amber-300 pb-2">
              Sacred Cities Covered
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Available across Varanasi, Haridwar, Ayodhya, Delhi NCR, Mumbai, Bengaluru, Pune, Hyderabad, and Kolkata.
            </p>

            <div className="pt-2 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold shadow-xs">
                <span>✓ 100% Cash After Puja</span>
              </div>
              <div className="text-[11px] text-stone-700 font-mono font-medium">
                Support Helpline: +91 98765 43210
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bottom Copyright & Legal Strip */}
      <div className="border-t border-amber-200/80 bg-stone-100/80 py-5">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div>
            © {new Date().getFullYear()} {APP_CONFIG.APP_NAME} Technologies Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActivePolicy("terms")}
              className="hover:text-[#991B1B] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => setActivePolicy("privacy")}
              className="hover:text-[#991B1B] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActivePolicy("cookies")}
              className="hover:text-[#991B1B] transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>

      {/* Policy Modal Dialog */}
      <Dialog open={activePolicy !== null} onOpenChange={(open) => !open && setActivePolicy(null)}>
        <DialogContent className="max-w-md p-6 bg-white text-stone-900 border-2 border-amber-300 shadow-2xl sm:rounded-2xl">
          <DialogHeader className="space-y-1 text-left pb-2">
            <DialogTitle className="text-lg font-bold font-serif text-stone-900">
              {currentPolicy?.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-600">
              {currentPolicy?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="py-2 border-t border-stone-200">
            {currentPolicy?.content}
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
