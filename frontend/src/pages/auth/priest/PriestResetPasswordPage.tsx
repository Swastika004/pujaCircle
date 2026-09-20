import React from 'react';
import { ResetPasswordCard } from '@/components/auth/ResetPasswordCard';

const PriestResetPasswordPage: React.FC = () => {
  return (
    <ResetPasswordCard
      role="PRIEST"
      loginPath="/priest/login"
    />
  );
};

export default PriestResetPasswordPage;
