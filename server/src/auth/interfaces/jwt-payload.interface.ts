export interface JwtPayload {
  sub: string;
  tenantId: string;
  role: string;
  email: string;
  iat?: number;
  exp?: number;
}

export type SafeUser = {
  id: string;
  tenantId: string;
  username: string;
  email: string;
  fullName?: string;
  role: string;
  languagePreference: string;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};
