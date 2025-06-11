import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET || '9ef131bdf590333ee5922707f4883051a1eab6ce57565370c734b2024d1fd8f3a327f57a97f440ec64920694b8cff191a5de32c5e1d4df03dc4250080e92bffd';

export async function POST(req: Request) {
  try {
    // Check for empty request body
    const contentLength = req.headers.get('content-length');
    if (!contentLength || parseInt(contentLength) === 0) {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
    }

    // Parse JSON body safely
    let body;
    try {
      body = await req.json();
    } catch (jsonErr) {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // Fetch user from Sanity
    const query = `*[_type == "user" && email == $email][0]{ _id, name, email, password }`;
    const user = await client.fetch(query, { email });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: '10min' }
    );

    // Set cookie
    const cookie = serialize('auth_token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    // Email transport setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Mail content
    const mailOptions = {
      from: `"ZakGifts!" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'You Have Successfully Logged In',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #4a90e2; text-align: center;">Welcome Back, ${user.name}!</h1>
          <p style="font-size: 16px;">You have successfully logged in to your account.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Login Details:</strong></p>
            <p style="margin: 5px 0;">📅 Date: ${new Date().toLocaleDateString()}</p>
            <p style="margin: 5px 0;">⏰ Time: ${new Date().toLocaleTimeString()}</p>
          </div>
          
          <p style="font-size: 14px; color: #666;">If this wasn't you, please secure your account immediately by changing your password.</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="#" style="background-color: #4a90e2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Visit Your Dashboard
            </a>
          </div>
          
          <p style="margin-top: 30px; font-size: 14px; color: #999; text-align: center;">
            © ${new Date().getFullYear()} ZakGifts. All rights reserved.
          </p>
        </div>
      `,
    };

    // Send email (non-blocking)
    transporter.sendMail(mailOptions)
      .then(() => console.log('Login notification email sent'))
      .catch(err => console.error('Error sending login email:', err));

    // Prepare response
    const res = NextResponse.json({
      message: 'Logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    res.headers.set('Set-Cookie', cookie);

    return res;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}