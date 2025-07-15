import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcryptjs';

import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  let body;

  // ✅ Step 1: Safely parse the request body
  try {
    const rawBody = await req.text();
    console.log("📥 Raw Body:", rawBody);
    body = JSON.parse(rawBody);
  } catch (err) {
    console.error("❌ Invalid JSON body:", err);
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { email, password, name } = body;

  // ✅ Step 2: Validate input fields
  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    // ✅ Step 3: Check for existing user
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // ✅ Step 4: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Step 5: Create user in Sanity
    const userDoc = {
      _type: 'user',
      name,
      email,
      password: hashedPassword,
    };

    const createdUser = await client.create(userDoc);
    console.log("✅ User created:", createdUser);

    // ✅ Step 6: Send welcome email
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"ZakMart" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Welcome to ZakGifts!',
        html: `
          <div style="font-family: 'Arial', sans-serif; padding: 20px;">
            <h2>Welcome, ${name}!</h2>
            <p>You’ve successfully signed up to ZakMart. Your email is <strong>${email}</strong>.</p>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://zakmart.vercel.app'}"
               style="display: inline-block; margin-top: 20px; background: #6e8efb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
              Visit ZakMart
            </a>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("📧 Welcome email sent to:", email);
    } catch (emailErr) {
      console.error("❌ Failed to send welcome email:", emailErr);
      // Optional: return error or ignore
    }

    // ✅ Step 7: Return successful response
    return NextResponse.json(
      { message: 'User created successfully. Welcome email sent.' },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Signup failed:", err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
