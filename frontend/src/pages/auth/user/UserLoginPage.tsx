import React from 'react';
import { AuthPage } from '@/pages/auth/AuthPage';

// Route alias: /user/login -> renders AuthPage with Devotee tab active by default
export const UserLoginPage: React.FC = () => {
  return <AuthPage defaultTab="devotee" />;
};

export default UserLoginPage;
