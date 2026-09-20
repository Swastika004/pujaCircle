import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { OtpVerificationCard } from '@/components/auth/OtpVerificationCard';
import { authApi } from '@/api/auth.api';
import { Mail } from 'lucide-react';

const UserVerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'devotee@pujacircle.com';

  return (
    <OtpVerificationCard
      title="Verify Email Address"
      subtitle="Enter the 6-digit confirmation code sent to your email inbox."
      icon={<Mail className="h-5 w-5" />}
      loginPath="/user/login"
      onVerify={(otp) => authApi.verifyEmailOtp({ email, otp })}
      successMessage="Email verified successfully!"
    />
  );
};

export default UserVerifyEmailPage;
