// prometheus.service.ts

import { Injectable } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class PrometheusService {
  private emailSentCounter: Counter;
  private emailFailedCounter: Counter; // Add emailFailedCounter
  private emailRetryCounter: Counter; // Add emailRetryCounter

  constructor() {
    this.emailSentCounter = new Counter({
      name: 'email_sent_count',
      help: 'Number of emails sent',
    });
    this.emailFailedCounter = new Counter({ // Initialize emailFailedCounter
      name: 'email_failed_count',
      help: 'Number of emails failed',
    });
    this.emailRetryCounter = new Counter({ // Initialize emailRetryCounter
      name: 'email_retry_count',
      help: 'Number of email retries',
    });
    register.registerMetric(this.emailSentCounter);
    register.registerMetric(this.emailFailedCounter); // Register emailFailedCounter
    register.registerMetric(this.emailRetryCounter); // Register emailRetryCounter
  }

  incrementEmailSentCount(): void {
    this.emailSentCounter.inc();
  }

  incrementEmailFailedCount(): void { // Add method to increment emailFailedCounter
    this.emailFailedCounter.inc();
  }

  incrementEmailRetryCount(): void { // Add method to increment emailRetryCounter
    this.emailRetryCounter.inc();
  }
}
