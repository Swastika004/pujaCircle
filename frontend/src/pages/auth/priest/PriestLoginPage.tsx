import React from 'react';
import { AuthPage } from '@/pages/auth/AuthPage';

// Route alias: /priest/login -> renders AuthPage with Priest tab active by default
export const PriestLoginPage: React.FC = () => {
  return <AuthPage defaultTab="priest" />;
};

export default PriestLoginPage;
