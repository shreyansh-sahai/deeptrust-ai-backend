export class Integration {
  id: string;
  slug: string;
  name: string;
  provider: string;
  isGlobalEnabled: boolean;
  authBaseUrl?: string;
  tokenUrl?: string;
  requiredScopes: string[];
  createdAt: Date;

  constructor(
    id: string,
    slug: string,
    name: string,
    provider: string,
    isGlobalEnabled: boolean,
    requiredScopes: string[],
    createdAt: Date,
    authBaseUrl?: string,
    tokenUrl?: string,
  ) {
    this.id = id;
    this.slug = slug;
    this.name = name;
    this.provider = provider;
    this.isGlobalEnabled = isGlobalEnabled;
    this.authBaseUrl = authBaseUrl;
    this.tokenUrl = tokenUrl;
    this.requiredScopes = requiredScopes;
    this.createdAt = createdAt;
  }
}
