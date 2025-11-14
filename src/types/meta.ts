export type HrefLang = {
  hreflang: string;
  href: string;
};

export interface MetaPayload {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
  hreflangs?: HrefLang[];
  jsonLd?: Record<string, unknown>;
  [key: string]: unknown;
}

