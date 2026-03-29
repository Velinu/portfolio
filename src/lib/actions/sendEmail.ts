'use server';

import nodemailer from 'nodemailer';
import { headers } from 'next/headers';
import { type ContactFormData } from '@/components/desktop/windows/ContactWindow/schema';
import { checkRateLimit } from './checkRateLimits';



const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 487),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendEmail(data: ContactFormData) {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    checkRateLimit(ip);

    const { name, email, message } = data;

    await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_USER,
        replyTo: email,
        subject: `Portfolio contact from ${name} <${email}>`,
        text: message,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
    });
}
