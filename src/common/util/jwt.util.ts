export interface IdTokenClaims {
  sub: string;
  email: string;
  name?: string;
  given_name?: string;
  family_name?: string;
}

export class JwtUtil {
  static decodeIdToken(idToken: string): IdTokenClaims {
    try {
      const parts = idToken.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT token format');
      }

      const payload = parts[1];
      const decodedPayload = Buffer.from(payload, 'base64url').toString('utf-8');
      const claims = JSON.parse(decodedPayload);

      if (!claims.sub || !claims.email) {
        throw new Error('ID token missing required claims (sub, email)');
      }

      return {
        sub: claims.sub,
        email: claims.email,
        name: claims.name,
        given_name: claims.given_name,
        family_name: claims.family_name,
      };
    } catch (error) {
      throw new Error(
        `Failed to decode ID token: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  static calculateTokenExpiry(expiresIn: number): Date {
    const now = new Date();
    return new Date(now.getTime() + expiresIn * 1000);
  }
}
