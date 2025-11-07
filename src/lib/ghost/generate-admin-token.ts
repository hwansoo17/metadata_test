import ghostToken from '@tryghost/admin-api/lib/token';

const ADMIN_KEY_REGEX = /^[0-9a-f]{24}:[0-9a-f]{64}$/i;
const DEFAULT_AUDIENCE = '/admin/';
const FIXED_EXPIRATION = '5m';

interface GenerateGhostAdminTokenOptions {
  audience?: string;
  expiresIn?: string;
}

interface GhostAdminCredentials {
  id: string;
  secret: string;
}

export interface GhostAdminKeyPayload extends GenerateGhostAdminTokenOptions {
  key: string;
}

export interface GhostAdminCredentialsPayload
  extends GhostAdminCredentials,
    GenerateGhostAdminTokenOptions {}

export type GhostAdminTokenPayload =
  | GhostAdminKeyPayload
  | GhostAdminCredentialsPayload;

export function parseGhostAdminKey(key: string): GhostAdminCredentials {
  const [id, secret] = key.split(':');

  if (!id || !secret) {
    throw new Error('Ghost Admin key must be in {id}:{secret} format.');
  }

  return { id, secret };
}

export function generateGhostAdminToken(
  payload: GhostAdminTokenPayload,
): string {
  const { key, audience, expiresIn } = normalizePayload(payload);

  if (!ADMIN_KEY_REGEX.test(key)) {
    throw new Error(
      'Ghost Admin API 키는 {24자리 hex}:{64자리 hex} 형태여야 합니다.',
    );
  }

  if (expiresIn && expiresIn !== FIXED_EXPIRATION) {
    throw new Error('Ghost Admin API 토큰은 최대 5분까지만 허용됩니다.');
  }

  return ghostToken(key, audience ?? DEFAULT_AUDIENCE);
}

function normalizePayload(payload: GhostAdminTokenPayload): {
  key: string;
  audience?: string;
  expiresIn?: string;
} {
  if ('key' in payload) {
    return {
      key: payload.key,
      audience: payload.audience,
      expiresIn: payload.expiresIn,
    };
  }

  const { id, secret } = payload;

  return {
    key: `${id}:${secret}`,
    audience: payload.audience,
    expiresIn: payload.expiresIn,
  };
}
