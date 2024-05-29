import { Module } from '@nestjs/common';
import { EmailDispatchService } from './email-dispatch.service';
import { StrategyFactoryService } from '../common/strategy-factory.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [EmailDispatchService, StrategyFactoryService],
  exports: [EmailDispatchService],
})
export class EmailDispatchModule { }
