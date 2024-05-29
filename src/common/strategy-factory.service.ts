import { Injectable } from '@nestjs/common';
import { EmailStrategy } from './strategies/email.strategy.interface';
import { AwsSesStrategy } from './strategies/aws-ses.strategy';
import { MailgunStrategy } from './strategies/mailgun.strategy';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

@Injectable()
export class StrategyFactoryService {
  constructor(private readonly configService: ConfigService) { } // Inject ConfigService

  getStrategy(): EmailStrategy {
    const emailProvider = this.configService.get('EMAIL_PROVIDER');

    switch (emailProvider) {
      case 'aws-ses':
        return new AwsSesStrategy();
      case 'mailgun':
        const apiKey = this.configService.get('MAILGUN_API_KEY'); // Get Mailgun API key from configuration
        const domain = this.configService.get('MAILGUN_DOMAIN'); // Get Mailgun domain from configuration
        return new MailgunStrategy(apiKey, domain); // Pass API key and domain to MailgunStrategy constructor
      default:
        throw new Error(`Invalid email provider: ${emailProvider}`);
    }
  }
}
