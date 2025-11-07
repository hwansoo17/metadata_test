declare module '@tryghost/admin-api/lib/token' {
  export default function token(key: string, audience?: string): string;
}
