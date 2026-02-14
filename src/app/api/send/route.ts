import { Resend } from 'resend';
import { getSiteData } from '@/lib/data-loader';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not defined in environment variables');
      return NextResponse.json({ error: 'Errore di configurazione del server (API Key mancante)' }, { status: 500 });
    }
    const resend = new Resend(apiKey);
    const { name, email, message } = await request.json();
    const data = getSiteData();
    const recipientEmail = data.contact.email;

    if (!recipientEmail) {
      return NextResponse.json({ error: 'Email destinatario non configurata' }, { status: 400 });
    }

    console.log('Tentativo invio email a:', recipientEmail);
    
    // Log per debug (non mostrare la chiave intera per sicurezza)
    console.log('RESEND_API_KEY presente:', !!apiKey);

    const { data: emailData, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `Nuovo messaggio da ${name} - Da Cibra`,
      replyTo: email,
      html: `
        <h2>Nuovo messaggio dal sito Da Cibra</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Errore Resend:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    console.log('Email inviata con successo:', emailData);

    return NextResponse.json({ success: true, data: emailData });
  } catch (error: any) {
    console.error('Eccezione durante l\'invio dell\'email:', error);
    return NextResponse.json({ 
      error: 'Errore interno del server', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
