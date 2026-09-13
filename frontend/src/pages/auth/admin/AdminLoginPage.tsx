import React from 'react';
import { AuthPage } from '@/pages/auth/AuthPage';

// Route alias: /admin/login -> renders AuthPage with Staff Access panel automatically pre-opened
export const AdminLoginPage: React.FC = () => {
  return <AuthPage revealAdmin={true} />;
};

export default AdminLoginPage;
