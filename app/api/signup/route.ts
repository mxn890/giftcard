import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  let body;

  // Step 1: Safely parse JSON body
  try {
    body = await req.json();
  } catch (err) {
    console.error('Invalid JSON body:', err);
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { email, password, name } = body;

  // Step 2: Check required fields
  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    // Step 3: Check if user already exists
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Step 4: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 5: Create user document
    const userDoc = {
      _type: 'user',
      name,
      email,
      password: hashedPassword,
    };

    const createdUser = await client.create(userDoc);

    // Step 6: Send welcome email
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
      subject: 'Welcome to ZakMart!',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6e8efb, #a777e3); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Your Gift Card Journey, ${name}!</h1>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Thank you for joining us! You're now part of our community where you can discover, purchase, and send the perfect digital gift cards for every occasion.
            </p>
            <div style="background-color: #f9f9f9; border-left: 4px solid #6e8efb; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; font-weight: 600; color: #555;">Your account details:</p>
              <p style="margin: 5px 0 0 0; color: #333;">Email: <strong>${email}</strong></p>
            </div>
            <div style="text-align: center; margin: 25px 0;">
              <div style="display: inline-block; background-color: #f5f5f5; padding: 15px; border-radius: 8px; border: 1px dashed #ccc;">
                <p style="margin: 0; color: #666; font-style: italic;">Your perfect gift card awaits!</p>
              </div>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourgiftcardsite.com'}"
                 style="display: inline-block; background: linear-gradient(135deg, #6e8efb, #a777e3); color: white; padding: 12px 30px; text-decoration: none; border-radius: 30px; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                Browse Gift Cards Now
              </a>
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px;">
              <p style="font-size: 14px; color: #666; line-height: 1.5;">
                <strong>Need help?</strong> Our support team is ready to assist you with any questions about your account or gift card purchases.
              </p>
            </div>
          </div>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #777;">
            <p style="margin: 0 0 10px 0;">© ${new Date().getFullYear()} GiftCard Express. All rights reserved.</p>
            <p style="margin: 0;">
              <a href="#" style="color: #6e8efb; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
              <a href="#" style="color: #6e8efb; text-decoration: none; margin: 0 10px;">Terms of Service</a>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Step 7: Return success response
    return NextResponse.json(
      { message: 'User created successfully. Welcome email sent.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
