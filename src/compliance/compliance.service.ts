import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ComplianceService {
  private readonly logger = new Logger(ComplianceService.name);

  handleBounce(emailDetails: any) {
    this.logger.warn('Handling email bounce', emailDetails);
  }

  handleUnsubscribe(emailDetails: any) {
    this.logger.warn('Handling unsubscribe request', emailDetails);
  }

  handleSpamComplaint(emailDetails: any) {
    this.logger.warn('Handling spam complaint', emailDetails);
  }
}
