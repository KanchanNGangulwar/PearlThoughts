import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor() { }

  sendEmail(email: string, subject: string, body: string): boolean {
    // Logic to send email
    // For simplicity, let's assume email sending is successful
    console.log(`Email sent to ${email}: ${subject}`);
    return true;
  }
}
