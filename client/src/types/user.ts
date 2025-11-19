export interface User {
  id: string;
  tenantId: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  languagePreference: string;
  isActive: boolean;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}