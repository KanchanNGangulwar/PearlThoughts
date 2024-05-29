import { EmailStrategy } from './email.strategy.interface';
import { SES } from 'aws-sdk';

export class AwsSesStrategy implements EmailStrategy {
  private ses: SES;

  constructor() {
    // Initialize SES client
    this.ses = new SES({ region: 'ABC(OUR REGION)-AWS-region' });
  }

  async send(emailDetails: any): Promise<void> {
    const params: SES.SendEmailRequest = {
      Source: emailDetails.from,
      Destination: {
        ToAddresses: emailDetails.to,
      },
      Message: {
        Subject: {
          Data: emailDetails.subject,
        },
        Body: {
          Text: {
            Data: emailDetails.body,
          },
        },
      },
    };

    try {
      await this.ses.sendEmail(params).promise();
      console.log('Email sent successfully via AWS SES.');
    } catch (error) {
      console.error('Error sending email via AWS SES:', error);
      throw error;
    }
  }
}
