import { createClient } from '@sanity/client';
import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

// This forces the route to be dynamic (not statically generated)
export const dynamic = 'force-dynamic';

const client = createClient({
  projectId: 't2m9ot8z',
  dataset: 'production',
  apiVersion: '2025-06-06',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

interface UserToken {
  id: string;
  // add other fields if needed
}

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      return NextResponse.json({ error: 'No auth token found' }, { status: 401 });
    }

    const cookies = cookieHeader.split('; ').reduce<Record<string, string>>((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});

    const token = cookies['auth_token'];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: auth token missing' }, { status: 401 });
    }

    const user = jwtDecode<UserToken>(token);
    if (!user?.id) {
      return NextResponse.json({ error: 'Invalid auth token' }, { status: 401 });
    }

    // GROQ query to fetch purchases for this user
    const query = `*[_type == "purchase" && userId == $userId]{
      _id,
      items[]{
        productId,
        quantity,
        price,
        iname
      },
      totalAmount,
      purchaseDate
    }`;

    const purchases = await client.fetch(query, { userId: user.id });

    return NextResponse.json(purchases, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching purchases:', error);
    let message = 'Unknown error';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}