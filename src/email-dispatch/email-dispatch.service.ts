import { Injectable, Logger } from '@nestjs/common';
import { EmailStrategy } from '../common/strategies/email.strategy.interface';
import { StrategyFactoryService } from '../common/strategy-factory.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EmailDispatchService {
  private readonly logger = new Logger(EmailDispatchService.name);

  constructor(
    private readonly strategyFactory: StrategyFactoryService,
    private readonly eventEmitter: EventEmitter2
  ) { }

  async sendEmail(urgency: string, userActivity: string, emailDetails: any) {
    const delay = this.calculateDelay(urgency, userActivity);
    setTimeout(async () => {
      try {
        const strategy: EmailStrategy = this.strategyFactory.getStrategy();
        await strategy.send(emailDetails);
        this.eventEmitter.emit('email.sent', emailDetails);
      } catch (error) {
        this.logger.error('Email sending failed', error);
        this.eventEmitter.emit('email.failed', emailDetails);
      }
    }, delay);
  }

  private calculateDelay(urgency: string, userActivity: string): number {
    if (urgency === 'high') {
      return userActivity === 'active' ? 0 : 30 * 60 * 1000;
    }
    if (urgency === 'medium') {
      return 60 * 60 * 1000;
    }
    return 2 * 60 * 60 * 1000;
  }
}
