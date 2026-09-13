import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Ban,
  ShieldCheck,
  Phone,
  Award,
  Star,
  Trash2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { priestApi } from '@/api/priest.api';
import { adminApi } from '@/api/admin.api';
import { Priest, PriestApprovalStatus } from '@/types/priest.types';

/**
 * AdminPriestDetailsPage
 * Scholar dossier audit and administrative lifecycle management.
 * 100% Flexbox, zero CSS grids, zero gradients, pure solid white canvas, Haldi gold trims.
 */
export const AdminPriestDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [priest, setPriest] = useState<Priest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal dialog states
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reasonInput, setReasonInput] = useState('');

  useEffect(() => {
    async function loadPriest() {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await priestApi.getPriestById(id);
        if (data) {
          setPriest(data);
        }
      } catch {
        toast.error('Failed to load priest profile.');
      } finally {
        setIsLoading(false);
      }
    }
    loadPriest();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-white text-xs text-stone-500 font-medium">
        Loading Priest dossier...
      </div>
    );
  }

  if (!priest) {
    return (
      <div className="container max-w-3xl py-12 space-y-6 text-stone-900">
        <Link
          to="/admin/priests"
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-red-700 font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Manage Priests
        </Link>
        <div className="text-center p-10 space-y-4 rounded-3xl border-2 border-amber-300 bg-white shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto text-amber-700 border border-amber-300">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold font-serif text-stone-900">Priest Record Not Found</h2>
            <p className="text-xs text-stone-600">
              No Vedic priest or applicant matches ID "{id}".
            </p>
          </div>
          <Link to="/admin/priests">
            <Button size="sm" className="text-xs mt-2 bg-[#780016] hover:bg-red-800 text-white font-bold rounded-xl border border-amber-400 h-10 px-5">
              Return to Priests Roster
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleApprove = async () => {
    const res = await adminApi.approvePriest(priest.id);
    if (res.success) {
      setPriest({ ...priest, approvalStatus: 'APPROVED', rejectionReason: undefined });
      toast.success(res.message);
    } else {
      toast.error(res.message || 'Failed to approve application.');
    }
  };

  const handleConfirmReject = async () => {
    if (!reasonInput.trim()) {
      toast.error('Please enter a rejection reason.');
      return;
    }
    const res = await adminApi.rejectPriest(priest.id, reasonInput.trim());
    if (res.success) {
      setPriest({ ...priest, approvalStatus: 'REJECTED', rejectionReason: reasonInput.trim() });
      toast.success(res.message);
      setIsRejectDialogOpen(false);
      setReasonInput('');
    } else {
      toast.error(res.message || 'Failed to reject application.');
    }
  };

  const handleConfirmBan = async () => {
    if (!reasonInput.trim()) {
      toast.error('Please enter a ban justification.');
      return;
    }
    const res = await adminApi.banPriest(priest.id, reasonInput.trim());
    if (res.success) {
      setPriest({ ...priest, accountStatus: 'BANNED', banReason: reasonInput.trim() });
      toast.success(res.message);
      setIsBanDialogOpen(false);
      setReasonInput('');
    } else {
      toast.error(res.message || 'Failed to ban priest.');
    }
  };

  const handleLiftBan = async () => {
    const res = await adminApi.unbanPriest(priest.id);
    if (res.success) {
      setPriest({ ...priest, accountStatus: 'ACTIVE', banReason: undefined });
      toast.success(res.message);
    } else {
      toast.error(res.message || 'Failed to unban priest.');
    }
  };

  const handleReopen = async () => {
    const res = await adminApi.reopenPriestApplication(priest.id);
    if (res.success) {
      setPriest({ ...priest, approvalStatus: 'PENDING', rejectionReason: undefined });
      toast.success(res.message);
    } else {
      toast.error(res.message || 'Failed to re-open application.');
    }
  };

  const handleConfirmDelete = async () => {
    toast.success(`Priest ${priest.fullName} record deleted permanently.`);
    setIsDeleteDialogOpen(false);
    navigate('/admin/priests');
  };

  const getStatusBadge = (approvalStatus: PriestApprovalStatus, accountStatus: string) => {
    return (
      <div className="flex items-center gap-1.5">
        {approvalStatus === 'APPROVED' && accountStatus === 'ACTIVE' && (
          <Badge className="bg-emerald-600 text-white text-xs px-3 py-1 gap-1 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved & Active
          </Badge>
        )}
        {approvalStatus === 'PENDING' && (
          <Badge variant="outline" className="border-amber-400 text-amber-900 bg-amber-100 text-xs px-3 py-1 gap-1 font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            Pending Review
          </Badge>
        )}
        {approvalStatus === 'REJECTED' && (
          <Badge variant="destructive" className="text-xs px-3 py-1 gap-1 font-bold">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </Badge>
        )}
        {accountStatus === 'BANNED' && (
          <Badge variant="destructive" className="text-xs px-3 py-1 gap-1 font-bold">
            <Ban className="w-3.5 h-3.5" />
            Banned
          </Badge>
        )}
      </div>
    );
  };

  return (
    <div className="container max-w-4xl py-8 space-y-6 pb-16 text-stone-900">
      {/* Top Back Button */}
      <Link
        to="/admin/priests"
        className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-red-700 font-bold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Manage Priests Directory
      </Link>

      {/* Main Scholar Header Profile Card */}
      <div className="border-2 border-amber-300 bg-white shadow-sm rounded-3xl overflow-hidden p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {priest.profileImageUrl ? (
              <img
                src={priest.profileImageUrl}
                alt={priest.fullName}
                className="w-18 h-18 rounded-2xl object-cover border-2 border-amber-400 shadow-sm"
              />
            ) : (
              <div className="w-18 h-18 rounded-2xl bg-amber-100 text-amber-900 border-2 border-amber-400 flex items-center justify-center font-bold text-2xl font-serif">
                {priest.fullName.charAt(0)}
              </div>
            )}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold font-serif text-stone-950">
                  {priest.fullName}
                </h1>
                {getStatusBadge(priest.approvalStatus, priest.accountStatus)}
              </div>
              <p className="text-xs text-stone-600">
                Display Title: <span className="font-bold text-stone-900">{priest.displayName}</span>
              </p>
              <p className="text-[11px] text-stone-500 font-mono">
                Scholar ID: {priest.id} • Registered: {new Date(priest.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end gap-1 text-xs">
            {priest.rating && (
              <div className="flex items-center gap-1 font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {priest.rating} ({priest.reviewCount || 0} reviews)
              </div>
            )}
            <span className="text-xs text-stone-600 font-bold">
              Experience: {priest.experienceYears} Years
            </span>
          </div>
        </div>
      </div>

      {/* Administrative Status Banner */}
      {(priest.accountStatus === 'BANNED' || priest.approvalStatus === 'REJECTED' || priest.approvalStatus === 'PENDING') && (
        <div className={`p-5 rounded-3xl border-2 flex items-start gap-3.5 ${priest.accountStatus === 'BANNED' ? 'border-red-300 bg-red-50/70' : 'border-amber-300 bg-amber-50/70'}`}>
          <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${priest.accountStatus === 'BANNED' ? 'text-red-700' : 'text-amber-700'}`} />
          <div className="space-y-1 text-xs">
            <p className="font-bold text-stone-900">
              Administrative Status ({priest.approvalStatus} / {priest.accountStatus})
            </p>
            <p className="text-stone-700">
              {priest.banReason || priest.rejectionReason || (priest.approvalStatus === 'PENDING' ? 'Priest registration is currently awaiting verification council signoff.' : 'No special notes recorded.')}
            </p>
          </div>
        </div>
      )}

      {/* Details Flexbox Deck (100% Flexbox, Zero CSS Grids) */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Contact & Verification Info */}
        <div className="w-full md:w-1/2 border-2 border-amber-300 bg-white shadow-sm rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
            <Phone className="w-4 h-4 text-red-700" />
            <h3 className="text-base font-serif font-bold text-stone-950">
              Contact & Direct Verification
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between border-b pb-2 border-stone-100">
              <span className="text-stone-600 font-medium">Mobile Phone:</span>
              <span className="font-mono font-bold text-stone-900">{priest.phoneNumber}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2 border-stone-100">
              <span className="text-stone-600 font-medium">Email Address:</span>
              <span className="font-medium text-stone-900">{priest.email || '—'}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2 border-stone-100">
              <span className="text-stone-600 font-medium">City & State:</span>
              <span className="font-bold text-stone-900">{priest.city}, {priest.state}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-600 font-medium">Service Localities:</span>
              <span className="font-medium text-stone-900">{priest.serviceAreas?.join(', ') || priest.city}</span>
            </div>
          </div>
        </div>

        {/* Vedic Credentials */}
        <div className="w-full md:w-1/2 border-2 border-amber-300 bg-white shadow-sm rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
            <Award className="w-4 h-4 text-amber-600" />
            <h3 className="text-base font-serif font-bold text-stone-950">
              Vedic Bio & Lineage
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <p className="text-stone-700 leading-relaxed font-medium">{priest.bio}</p>
            <div className="border-t border-stone-100 pt-2 space-y-1">
              <span className="text-stone-600 font-bold">Spoken Languages:</span>
              <p className="font-bold text-stone-900">{priest.languages?.join(', ')}</p>
            </div>
            <div className="border-t border-stone-100 pt-2 space-y-1">
              <span className="text-stone-600 font-bold">Specializations:</span>
              <p className="font-bold text-stone-900">{priest.specializations?.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Administrative Decision Action Bar */}
      <div className="border-2 border-amber-300 bg-white shadow-sm rounded-3xl p-6 sm:p-7 space-y-3">
        <div>
          <h3 className="text-base font-serif font-bold text-stone-950">Administrative Actions & Lifecycle Control</h3>
          <p className="text-xs text-stone-600">
            Manage application verification state, handle disciplinary suspensions, or permanently remove profile.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* If PENDING: Approve / Reject */}
            {priest.approvalStatus === 'PENDING' && (
              <>
                <Button
                  size="sm"
                  onClick={handleApprove}
                  className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 px-5 rounded-xl gap-1.5 shadow-xs cursor-pointer puja-btn-tap"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve Application
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsRejectDialogOpen(true)}
                  className="text-xs text-red-700 hover:bg-red-50 border-red-200 font-bold h-10 px-4 rounded-xl gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Application
                </Button>
              </>
            )}

            {/* If ACTIVE: Ban Option */}
            {priest.accountStatus === 'ACTIVE' && (
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setIsBanDialogOpen(true)}
                className="text-xs h-10 px-4 rounded-xl font-bold gap-1.5 cursor-pointer"
              >
                <Ban className="w-4 h-4" />
                Ban Priest Account
              </Button>
            )}

            {/* If BANNED: Lift Ban Option */}
            {priest.accountStatus === 'BANNED' && (
              <Button
                size="sm"
                onClick={handleLiftBan}
                className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 px-5 rounded-xl gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                Lift Ban & Reactivate
              </Button>
            )}

            {/* If REJECTED: Re-open */}
            {priest.approvalStatus === 'REJECTED' && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleReopen}
                className="text-xs gap-1.5 h-10 px-4 rounded-xl font-bold border-stone-300"
              >
                <RotateCcw className="w-4 h-4" />
                Re-open Application
              </Button>
            )}
          </div>

          {/* Delete Record Button */}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-xs text-red-700 hover:bg-red-50 gap-1.5 h-10 px-3 rounded-xl font-bold cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Delete Priest Profile
          </Button>
        </div>
      </div>

      {/* Reject Application Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-md p-6 rounded-3xl bg-white border-2 border-amber-300 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold font-serif text-red-700">
              Reject Priest Application
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-600">
              Provide a clear administrative reason for rejecting {priest.fullName}'s application.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-2">
            <Label htmlFor="reject-reason" className="text-xs font-bold text-stone-800">Rejection Justification</Label>
            <Textarea
              id="reject-reason"
              placeholder="e.g. Incomplete background certification / Inability to verify Gurukul credentials..."
              value={reasonInput}
              onChange={(e) => setReasonInput(e.target.value)}
              className="text-xs min-h-24 rounded-xl border-stone-300 focus:border-amber-500 focus:ring-amber-500 bg-white"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0 flex flex-col-reverse sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRejectDialogOpen(false)}
              className="text-xs rounded-xl h-10 px-4"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirmReject}
              className="text-xs rounded-xl h-10 px-5 font-bold"
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban Account Dialog */}
      <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
        <DialogContent className="sm:max-w-md p-6 rounded-3xl bg-white border-2 border-amber-300 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold font-serif text-red-700">
              Ban Priest Account
            </DialogTitle>
            <DialogDescription className="text-xs text-stone-600">
              Revoke platform access for {priest.fullName}. Please state the infraction or reason.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-2">
            <Label htmlFor="ban-reason" className="text-xs font-bold text-stone-800">Reason for Ban</Label>
            <Textarea
              id="ban-reason"
              placeholder="e.g. Multiple unannounced ritual cancellations / Infraction of platform conduct..."
              value={reasonInput}
              onChange={(e) => setReasonInput(e.target.value)}
              className="text-xs min-h-24 rounded-xl border-stone-300 focus:border-amber-500 focus:ring-amber-500 bg-white"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0 flex flex-col-reverse sm:flex-row">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBanDialogOpen(false)}
              className="text-xs rounded-xl h-10 px-4"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirmBan}
              className="text-xs rounded-xl h-10 px-5 font-bold"
            >
              Confirm Ban
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Record Confirmation Alert Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="p-6 rounded-3xl bg-white border-2 border-amber-300 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold font-serif text-red-700 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Permanently Delete Priest Profile?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-stone-600">
              Are you sure you want to permanently remove <span className="font-bold text-stone-900">{priest.fullName}</span> from the platform roster? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
            <AlertDialogCancel className="text-xs rounded-xl h-10 px-4">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-700 text-white hover:bg-red-800 text-xs rounded-xl h-10 px-5 font-bold"
            >
              Delete Record
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPriestDetailsPage;
