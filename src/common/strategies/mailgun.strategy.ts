import { EmailStrategy } from './email.strategy.interface';
import * as mailgun from 'mailgun-js';

export class MailgunStrategy implements EmailStrategy {
  private mailgun: mailgun.Mailgun;

  constructor(private apiKey: string, private domain: string) {
    // Initialize Mailgun client
    this.mailgun = mailgun({ apiKey, domain });
  }

  async send(emailDetails: any): Promise<void> {
    // Construct email data
    const emailData: mailgun.messages.SendData = {
      from: emailDetails.from,
      to: emailDetails.to,
      subject: emailDetails.subject,
      text: emailDetails.body,
    };

    try {
      // Send email using Mailgun
      await this.mailgun.messages().send(emailData);
      console.log('Email sent successfully via Mailgun.');
    } catch (error) {
      console.error('Error sending email via Mailgun:', error);
      throw error; // Propagate the error to the caller
    }
  }
}
