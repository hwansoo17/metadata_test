import { NextRequest, NextResponse } from 'next/server';

import {
  getStoredMetadata,
  listStoredMetadata,
  saveStoredMetadata,
} from '@/lib/meta-store';
import { normalizeOrigin, normalizePath } from '@/lib/meta-utils';
import type { MetaPayload } from '@/types/meta';

interface MetaPostBody extends MetaPayload {
  origin?: string;
  path?: string;
  metadata?: MetaPayload;
}

function extractPayload(body: MetaPostBody): MetaPayload {
  if (
    body.metadata &&
    typeof body.metadata === 'object' &&
    !Array.isArray(body.metadata)
  ) {
    return body.metadata;
  }

  const {
    metadata: _metadata,
    origin: _origin,
    path: _path,
    ...rest
  } = body;
  void _metadata;
  void _origin;
  void _path;
  return rest;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const originParam = searchParams.get('origin');
  const pathParam = searchParams.get('path');

  if (!originParam && !pathParam) {
    const entries = await listStoredMetadata();
    return NextResponse.json({ entries });
  }

  if (originParam && !pathParam) {
    const origin = normalizeOrigin(originParam);
    const entries = await listStoredMetadata();
    return NextResponse.json({
      entries: entries.filter((entry) => entry.origin === origin),
    });
  }

  if (!originParam || !pathParam) {
    return NextResponse.json(
      { error: 'Both origin and path query parameters are required.' },
      { status: 400 },
    );
  }

  const origin = normalizeOrigin(originParam);
  const path = normalizePath(pathParam);
  const metadata = await getStoredMetadata(origin, path);

  if (!metadata) {
    return NextResponse.json(
      { error: `No metadata registered for ${origin}${path}` },
      { status: 404 },
    );
  }

  return NextResponse.json(metadata);
}

export async function POST(request: NextRequest) {
  let body: MetaPostBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Body must be valid JSON.' },
      { status: 400 },
    );
  }

  const { origin: originRaw, path: pathRaw } = body;

  if (!originRaw || !originRaw.trim() || !pathRaw || !pathRaw.trim()) {
    return NextResponse.json(
      { error: 'Both origin and path are required in the body.' },
      { status: 400 },
    );
  }

  const origin = normalizeOrigin(originRaw);
  const path = normalizePath(pathRaw);
  const metadata = extractPayload(body);

  if (!metadata || Object.keys(metadata).length === 0) {
    return NextResponse.json(
      { error: 'Metadata payload is required.' },
      { status: 400 },
    );
  }

  await saveStoredMetadata(origin, path, metadata);

  return NextResponse.json({ success: true, origin, path, metadata });
}
