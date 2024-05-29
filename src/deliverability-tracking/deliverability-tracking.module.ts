import { Module } from '@nestjs/common';
import { DeliverabilityTrackingService } from './deliverability-tracking.service';
import { EmailDispatchModule } from '../email-dispatch/email.dispatch.module';

@Module({
  imports: [EmailDispatchModule],
  providers: [DeliverabilityTrackingService],
})
export class DeliverabilityTrackingModule { }
