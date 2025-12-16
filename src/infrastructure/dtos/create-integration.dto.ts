export interface CreateIntegrationDto {
    slug: string;
    name: string;
    provider: string;
    isGlobalEnabled: boolean;
    requiredScopes: string[];
    authBaseUrl?: string;
    tokenUrl?: string;
}