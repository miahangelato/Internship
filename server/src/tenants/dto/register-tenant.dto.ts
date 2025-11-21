export class RegisterTenantDto {
  tenantName: string;

  adminEmail: string;
  adminPassword: string;
  adminFullName?: string;

  adminLanguagePreference?: string;
}
