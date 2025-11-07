import { NextRequest, NextResponse } from 'next/server';

import { generateGhostAdminToken } from '@/lib/ghost/generate-admin-token';
interface TokenRequestBody {
  id?: string;
  secret?: string;
  key?: string;
  audience?: string;
  expiresIn?: string;
}

export async function POST(request: NextRequest) {
  let body: TokenRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Request body must be valid JSON.' },
      { status: 400 },
    );
  }

  if (!body?.key && (!body?.id || !body?.secret)) {
    return NextResponse.json(
      { error: 'Provide key or both id and secret.' },
      { status: 400 },
    );
  }

  try {
    const token = generateGhostAdminToken(
      body.key
        ? {
            key: body.key,
            audience: body.audience,
            expiresIn: body.expiresIn,
          }
        : {
            id: body.id!,
            secret: body.secret!,
            audience: body.audience,
            expiresIn: body.expiresIn,
          },
    );

    return NextResponse.json({ token });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to generate token.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
