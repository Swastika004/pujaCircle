import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneLoginSchema, UserLoginInput } from "@/schemas/auth.schema";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthRoleTabs } from "@/components/auth/AuthRoleTabs";
import {
  Phone,
  Lock,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export interface AuthLoginFormProps {
  defaultRole?: "USER" | "PRIEST";
}

export const AuthLoginForm: React.FC<AuthLoginFormProps> = ({
  defaultRole = "USER",
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isLoading, error, clearError } = useAuthStore();

  // Role detection from prop or query parameter (?role=priest or ?role=user)
  const queryRole = searchParams.get("role")?.toUpperCase();
  const initialRole =
    queryRole === "PRIEST" || queryRole === "USER" ? queryRole : defaultRole;

  const [activeRole, setActiveRole] = useState<"USER" | "PRIEST">(initialRole);
  const [showPassword, setShowPassword] = useState(false);

  // Dynamic configurations based on active role
  const isPriest = activeRole === "PRIEST";

  const roleConfig = {
    USER: {
      title: "Devotee Sign In",
      subtitle:
        "Access your bookings, sacred muhurat reminders, and Purohit consultations.",
      badge: "Devotee Portal",
      demoPhone: "+919876543210",
      demoPass: "User@123",
      redirect: "/user/home",
      forgot: "/user/forgot-password",
      register: "/user/register",
      registerPrompt: "New to PujaCircle?",
      registerCta: "Create Devotee Account",
      quote: "यज्ञो वै श्रेष्ठतमं कर्म — Yajna is the highest auspicious deed.",
      source: "Satapatha Brahmana",
    },
    PRIEST: {
      title: "Vedic Purohit Sign In",
      subtitle:
        "Manage your ceremony schedule, devotee invitations, and puja earnings.",
      badge: "Purohit Portal",
      demoPhone: "+919876543211",
      demoPass: "Priest@123",
      redirect: "/priest/dashboard",
      forgot: "/priest/forgot-password",
      register: "/priest/register",
      registerPrompt: "Are you a Vedic Scholar?",
      registerCta: "Apply to Join Roster",
      quote: "विद्वत्वं च नृपत्वं च नैव तुल्यं कदाचन — Wisdom and sacred knowledge surpass all royalty.",
      source: "Chanakya Niti",
    },
  }[activeRole];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserLoginInput>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  // Reset fields to clean empty state when switching roles
  const handleRoleChange = (newRole: string) => {
    const role = newRole as "USER" | "PRIEST";
    setActiveRole(role);
    clearError();
    reset({
      phoneNumber: "",
      password: "",
    });
  };

  const onSubmit = async (data: UserLoginInput) => {
    clearError();
    const cleanPhone = data.phoneNumber.trim();
    const identifier = cleanPhone.startsWith("+91")
      ? cleanPhone
      : `+91${cleanPhone.replace(/\D/g, "")}`;

    const success = await login({
      identifier,
      password: data.password,
    });

    if (success) {
      toast.success(
        `Welcome back to PujaCircle! Signed in as ${isPriest ? "Priest" : "User"}.`,
      );
      navigate(roleConfig.redirect);
    }
  };

  const handleFillDemo = () => {
    setValue("phoneNumber", roleConfig.demoPhone, { shouldValidate: true });
    setValue("password", roleConfig.demoPass, { shouldValidate: true });
    clearError();
    toast.info(`Filled demo credentials for ${activeRole}.`);
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center py-8 sm:py-12 px-4">
      <div className="w-full max-w-4xl rounded-3xl border-2 border-amber-300 bg-white shadow-xl overflow-hidden flex flex-col lg:flex-row items-stretch">
        {/* Left Showcase Panel (Desktop Only, 100% Flexbox, Solid Vermilion `#780016`) */}
        <div className="hidden lg:flex flex-col justify-between w-5/12 bg-[#780016] text-white p-8 sm:p-10 border-r-2 border-amber-400/40 relative">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-serif font-black text-2xl shadow-md select-none">
                ॐ
              </div>
              <div>
                <div className="font-serif font-black text-lg tracking-wider text-amber-300">
                  PUJACIRCLE
                </div>
                <div className="text-[10px] text-amber-100 uppercase tracking-widest font-semibold">
                  Sacred Vedic Sanctum
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{roleConfig.badge}</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-white leading-snug">
                {isPriest
                  ? "Serve Devotees with Sacred Lineage"
                  : "Authentic Vedic Rituals for Your Family"}
              </h2>
              <p className="text-xs text-amber-100/90 leading-relaxed">
                {isPriest
                  ? "Accept verified puja requests in your locality and receive 100% direct dakshina with zero deductions."
                  : "Connect with vetted Gurukul-trained Purohits with complete transparency and verified muhurats."}
              </p>
            </div>

            {/* Sacred Commitments (Flex Column) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs text-amber-100">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>1,200+ Verified Gurukul Scholars</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-100">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>100% Direct Cash Dakshina to Priest</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-100">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Zero Cancellation Stress</span>
              </div>
            </div>
          </div>

          {/* Bottom Quote Pill */}
          <div className="pt-6 border-t border-amber-400/30 space-y-1">
            <div className="text-xs font-serif text-amber-200 italic">
              “{roleConfig.quote}”
            </div>
            <div className="text-[10px] text-amber-400 font-medium">
              — {roleConfig.source}
            </div>
          </div>
        </div>

        {/* Right Form Panel (Flexbox) */}
        <div className="w-full lg:w-7/12 p-6 sm:p-10 bg-white flex flex-col justify-between relative">
          {/* Top Row: Role Switch + Hidden Staff Shield */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <AuthRoleTabs activeRole={activeRole} onRoleChange={handleRoleChange} />

              <Link
                to="/admin/login"
                tabIndex={-1}
                aria-label="Staff access"
                title="Staff access"
                className="text-stone-300 hover:text-stone-600 transition-colors p-1.5 rounded-md hover:bg-stone-100"
              >
                <Shield className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-1 mb-6">
              <h1 className="text-2xl font-bold font-serif text-stone-900">
                {roleConfig.title}
              </h1>
              <p className="text-xs text-stone-600 leading-relaxed">
                {roleConfig.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Mobile Number Input */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-stone-700">
                  Mobile Number (+91)
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <Input
                    type="tel"
                    placeholder={roleConfig.demoPhone}
                    {...register("phoneNumber")}
                    className="pl-10 text-xs h-10 border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-[11px] text-red-600 font-medium">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-stone-700">
                    Password
                  </Label>
                  <Link
                    to={roleConfig.forgot}
                    className="text-[11px] text-red-700 hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="pl-10 pr-10 text-xs h-10 border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-red-600 font-medium">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Quick Demo Fill Button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleFillDemo}
                className="w-full text-xs text-stone-900 bg-white hover:bg-amber-50 border-2 border-amber-300 h-10 gap-1.5 font-bold cursor-pointer transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                Fill Demo Credentials ({roleConfig.demoPhone})
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#780016] hover:bg-[#600012] text-white font-bold text-xs h-11 shadow-md gap-2 mt-2 puja-btn-tap cursor-pointer"
              >
                {isLoading
                  ? "Verifying Credentials..."
                  : `Sign In as ${isPriest ? "Purohit" : "Devotee"}`}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Bottom Register Prompt */}
          <div className="pt-6 mt-4 border-t border-stone-200 text-center text-xs text-stone-600">
            {roleConfig.registerPrompt}{" "}
            <Link
              to={roleConfig.register}
              className="text-red-700 font-bold hover:underline ml-1"
            >
              {roleConfig.registerCta} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoginForm;
