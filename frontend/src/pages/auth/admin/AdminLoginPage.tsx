import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminLoginSchema, AdminLoginInput } from '@/schemas/auth.schema';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ShieldAlert,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

// AdminLoginPage
// Ultra-Premium Split-Card Operations Console Sign In for Platform Administrators.
// 100% Flexbox, pure solid white canvas, radiant Haldi gold trims, zero grids, zero gradients.
export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AdminLoginInput) => {
    clearError();
    const success = await login({
      identifier: data.email.trim(),
      password: data.password,
    });

    if (success) {
      toast.success('Welcome to PujaCircle Operations Console.');
      navigate('/admin/dashboard');
    }
  };

  const handleFillDemo = () => {
    setValue('email', 'admin@pujacircle.demo', { shouldValidate: true });
    setValue('password', 'Admin@123', { shouldValidate: true });
    clearError();
    toast.info('Filled administrator demo credentials.');
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center py-8 sm:py-12 px-4 text-stone-900">
      <div className="w-full max-w-4xl rounded-3xl border-2 border-amber-300 bg-white shadow-xl overflow-hidden flex flex-col lg:flex-row items-stretch">
        {/* Left Showcase Panel (Desktop Only, Solid Sacred Crimson Vermilion `#780016`) */}
        <div className="hidden lg:flex flex-col justify-between w-5/12 bg-[#780016] text-white p-8 sm:p-10 border-r-2 border-amber-400/40 relative">
          <div className="space-y-6">
            {/* Top Brand Logo */}
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shadow-md select-none">
                <ShieldAlert className="h-6 w-6 text-stone-950 fill-stone-950" />
              </div>
              <div>
                <div className="font-serif font-black text-lg tracking-wider text-amber-300">
                  PUJACIRCLE
                </div>
                <div className="text-[10px] text-amber-100 uppercase tracking-widest font-semibold">
                  Operations Authority
                </div>
              </div>
            </div>

            {/* Headline & Responsibilities */}
            <div className="space-y-3 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Governance & Oversight</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-white leading-snug">
                Platform Sanctum Management Console
              </h2>
              <p className="text-xs text-amber-100/90 leading-relaxed">
                Restricted access for platform administrators to audit Purohit Gurukul credentials, oversee ceremony safety, and manage ritual services.
              </p>
            </div>

            {/* Governance Guarantees */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs text-amber-100">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Role-Based Access Control (RBAC) & Audit Logs</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-100">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Priest Lineage & Background Approval Queue</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-100">
                <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Real-Time Devotee Security & Support Triage</span>
              </div>
            </div>
          </div>

          {/* Bottom Sanskrit Motto */}
          <div className="pt-6 border-t border-amber-400/30 space-y-1">
            <div className="text-xs font-serif text-amber-200 italic">
              “सत्यमेव जयते नानृतम् — Truth alone triumphs, not untruth.”
            </div>
            <div className="text-[10px] text-amber-400 font-medium">
              — Mundaka Upanishad
            </div>
          </div>
        </div>

        {/* Right Form Panel (Flexbox) */}
        <div className="w-full lg:w-7/12 p-6 sm:p-10 bg-white flex flex-col justify-between relative">
          <div>
            <div className="space-y-1 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-stone-900 text-xs font-bold mb-2">
                <ShieldAlert className="h-3.5 w-3.5 text-red-800" />
                <span>Platform Authority</span>
              </div>
              <h1 className="text-2xl font-bold font-serif text-stone-900">
                Operations Console Sign In
              </h1>
              <p className="text-xs text-stone-600 leading-relaxed">
                Enter your administrative credentials to unlock the PujaCircle management console.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 font-semibold">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Administrator Email */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-stone-800">Administrator Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
                  <Input
                    type="email"
                    placeholder="admin@pujacircle.demo"
                    {...register('email')}
                    className="pl-10 text-xs h-11 rounded-xl border-amber-300 focus-visible:ring-red-700"
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-700 font-semibold">{errors.email.message}</p>
                )}
              </div>

              {/* Admin Password */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-stone-800">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-4 w-4 text-stone-500" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className="pl-10 pr-10 text-xs h-11 rounded-xl border-amber-300 focus-visible:ring-red-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-red-700 font-semibold">{errors.password.message}</p>
                )}
              </div>

              {/* Demo Fill */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-stone-500 font-mono">Mock: admin@pujacircle.demo</span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-xs text-amber-700 hover:text-amber-800 font-bold cursor-pointer hover:underline flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Fill Staff Credentials</span>
                </button>
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-xs font-bold bg-[#780016] hover:bg-[#600012] text-white h-11 rounded-xl shadow-md cursor-pointer gap-2"
                >
                  {isLoading ? 'Verifying Platform Authorization...' : 'Access Administration Console'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          <div className="pt-6 text-center text-xs text-stone-600">
            <Link to="/user/login" className="text-[#780016] font-bold hover:underline">
              ← Return to Devotee / Purohit Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
