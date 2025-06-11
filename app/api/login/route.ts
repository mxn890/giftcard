import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import nodemailer from 'nodemailer';
import validator from 'validator';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable');
}

export async function POST(req: Request) {
  try {
    // Validate content type
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type, expected application/json' },
        { status: 400 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (jsonErr) {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    const { email, password } = body;

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Fetch user from Sanity
    const query = `*[_type == "user" && email == $email][0]{
      _id,
      name,
      email,
      password,
      role
    }`;
    const user = await client.fetch(query, { email });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT (remove sensitive data)
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role || 'user',
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Set secure cookie
    const cookie = serialize('auth_token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    // Send login notification email (fire and forget)
    if (process.env.SMTP_HOST) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Your App" <${process.env.EMAIL_FROM}>`,
          to: email,
          subject: 'Successful Login Notification',
          html: generateLoginEmail(user.name),
        });
      } catch (emailError) {
        console.error('Email sending failed (non-critical):', emailError);
      }
    }

    // Successful response
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || 'user',
        },
      },
      { status: 200 }
    );

    response.headers.set('Set-Cookie', cookie);
    return response;

  } catch (err) {
    console.error('Login endpoint error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function for email template
function generateLoginEmail(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Welcome back, ${name}!</h2>
      <p>You've successfully logged in to your account.</p>
      <p>If this wasn't you, please secure your account immediately.</p>
      <p style="color: #6b7280; font-size: 0.875rem;">
        Login time: ${new Date().toLocaleString()}
      </p>
    </div>
  `;
}