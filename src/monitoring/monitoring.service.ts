import { Injectable, OnModuleInit } from '@nestjs/common';
import { EmailService } from '../email-dispatch/email.service';
import { PrometheusService } from '../metrices/prometheus.service';

@Injectable()
export class MonitoringService implements OnModuleInit {
  constructor(
    private readonly emailService: EmailService,
    private readonly prometheusService: PrometheusService,
  ) { }

  async onModuleInit() {
    // Logic to send email
    const email = 'recipient@example.com';
    const subject = 'Test Email';
    const body = 'This is a test email';

    // Attempt to send the email
    const isEmailSent = await this.emailService.sendEmail(email, subject, body);

    if (isEmailSent) {
      // Increment email sent counter if email is sent successfully
      this.prometheusService.incrementEmailSentCount();
    } else {
      // If email sending fails, increment email failed counter
      this.prometheusService.incrementEmailFailedCount();

      // Retry sending the email
      // For simplicity, let's assume only one retry
      const isRetrySuccessful = await this.emailService.sendEmail(email, subject, body);

      if (isRetrySuccessful) {
        // Increment email retry counter if retry is successful
        this.prometheusService.incrementEmailRetryCount();
      } else {
        // If retry fails, you may handle it further as per your application's requirements
        console.error('Email delivery failed after retry');
      }
    }
  }
}
