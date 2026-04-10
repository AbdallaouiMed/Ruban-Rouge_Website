import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import nodemailer from 'nodemailer';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Initialize Nodemailer transporter for Outlook
const transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  formSource: 'Contact' | 'Commandes';
  eventDate?: string;
  eventType?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: FormData = await request.json();
    const { fullName, email, phone, message, formSource, eventDate, eventType } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !message || !formSource) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
      console.error('Notion credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Save to Notion
    const submissionDate = new Date().toISOString();

    const notionProperties: any = {
      'Nom complet': {
        title: [
          {
            text: {
              content: fullName,
            },
          },
        ],
      },
      'Contact Email': {
        email: email,
      },
      'Téléphone': {
        phone_number: phone,
      },
      'Date de soumission': {
        date: {
          start: submissionDate,
        },
      },
      'Form Source': {
        select: {
          name: formSource,
        },
      },
    };

    // Add form-specific fields based on which form was submitted
    if (formSource === 'Contact') {
      // Contact form: message goes to "message" column
      notionProperties['message'] = {
        rich_text: [
          {
            text: {
              content: message,
            },
          },
        ],
      };
    } else if (formSource === 'Commandes') {
      // Commandes form: message goes to "Décrivez votre Évènement" column
      notionProperties['Décrivez votre Évènement'] = {
        rich_text: [
          {
            text: {
              content: message,
            },
          },
        ],
      };

      // Add Event Date for Commandes form
      if (eventDate) {
        notionProperties['Date de l\'événement'] = {
          date: {
            start: eventDate,
          },
        };
      }

      // Add Event Type for Commandes form (Select field in Notion)
      if (eventType) {
        notionProperties['Type d\'événement'] = {
          select: {
            name: eventType,
          },
        };
      }
    }

    // Save to Notion database
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: notionProperties,
    });

    // Send email notification asynchronously (non-blocking - don't wait for it)
    const sendEmailAsync = async () => {
      try {
        const emailSubject = formSource === 'Contact'
          ? '📬 Nouvelle demande de contact - Ruban Rouge'
          : '🎂 Nouvelle commande personnalisée - Ruban Rouge';

      let emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #3A2418;
              background-color: #F6EFE2;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #B8232B 0%, #8B1A21 100%);
              color: white;
              padding: 30px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: bold;
            }
            .content {
              padding: 30px 20px;
            }
            .field {
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 1px solid #F6EFE2;
            }
            .field-label {
              font-weight: 600;
              color: #B8232B;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .field-value {
              color: #3A2418;
              font-size: 16px;
            }
            .message-box {
              background-color: #F6EFE2;
              border-left: 4px solid #C9A961;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .footer {
              background-color: #F6EFE2;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${emailSubject}</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Nom complet</div>
                <div class="field-value">${fullName}</div>
              </div>
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${email}" style="color: #B8232B;">${email}</a></div>
              </div>
              <div class="field">
                <div class="field-label">Téléphone</div>
                <div class="field-value"><a href="tel:${phone}" style="color: #B8232B;">${phone}</a></div>
              </div>
    `;

    if (formSource === 'Commandes' && eventDate) {
      const formattedDate = new Date(eventDate).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      emailHtml += `
              <div class="field">
                <div class="field-label">Date de l'événement</div>
                <div class="field-value">${formattedDate}</div>
              </div>
      `;
    }

    if (formSource === 'Commandes' && eventType) {
      emailHtml += `
              <div class="field">
                <div class="field-label">Type d'événement</div>
                <div class="field-value">${eventType}</div>
              </div>
      `;
    }

    emailHtml += `
              <div class="field">
                <div class="field-label">Message</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Cette demande a été soumise via le formulaire ${formSource === 'Contact' ? 'Contact' : 'Commandes'} du site web Ruban Rouge.</p>
              <p>Date de soumission: ${new Date(submissionDate).toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </body>
      </html>
    `;

        await transporter.sendMail({
          from: `"Ruban Rouge Website" <${process.env.EMAIL_USER}>`,
          to: 'ruban-rouge@outlook.com',
          subject: emailSubject,
          html: emailHtml,
        });
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error('Failed to send email notification:', emailError);
      }
    };

    // Fire off email sending without waiting for it (truly non-blocking)
    sendEmailAsync();

    // Return success response immediately (data is already saved to Notion)
    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);

    return NextResponse.json(
      {
        error: 'Failed to process form submission',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
