import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EmailDispatchService } from '../email-dispatch/email-dispatch.service';

@Injectable()
export class DeliverabilityTrackingService {
  private readonly logger = new Logger(DeliverabilityTrackingService.name);
  private maxRetries = 3;

  constructor(
    private readonly emailDispatchService: EmailDispatchService,
    private readonly eventEmitter: EventEmitter2
  ) { }

  @OnEvent('email.failed')
  async handleEmailFailed(emailDetails: any) {
    if (emailDetails.retries >= this.maxRetries) {
      this.logger.error('Email delivery failed after maximum retries', emailDetails);
      return;
    }

    emailDetails.retries = (emailDetails.retries || 0) + 1;
    const delay = this.getExponentialBackoffDelay(emailDetails.retries);
    setTimeout(() => {
      this.emailDispatchService.sendEmail(emailDetails.urgency, emailDetails.userActivity, emailDetails);
    }, delay);
  }

  private getExponentialBackoffDelay(retryCount: number): number {
    return Math.pow(2, retryCount - 1) * 60 * 1000; // 1 min, 2 min, 4 min...
  }
}
