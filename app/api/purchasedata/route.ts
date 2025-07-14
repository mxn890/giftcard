import { createClient } from '@sanity/client';
import { NextRequest, NextResponse } from 'next/server';

const client = createClient({
  projectId: '20xchuio',
  dataset: 'production',
  apiVersion: '2025-06-06',
  token: process.env.SANITY_API_TOKEN,  // your token with proper permissions
  useCdn: false,
});

export async function POST(request: NextRequest) {
  try {
    const purchaseDoc = await request.json();
console.log(purchaseDoc)
    const createdDoc = await client.create(purchaseDoc);

    return NextResponse.json(createdDoc, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
