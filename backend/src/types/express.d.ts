export type Role = 'USER' | 'PRIEST' | 'ADMIN';
export type AccountStatus = 'ACTIVE' | 'BANNED';

export interface AuthUserContext {
  id: string;
  email?: string;
  phoneNumber: string;
  name: string;
  role: Role;
  accountStatus: AccountStatus;
  avatarUrl?: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserContext;
    }
  }
}
