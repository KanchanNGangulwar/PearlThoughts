import { Module } from '@nestjs/common';
import { ReportingService } from './reporting.service';

@Module({
  providers: [ReportingService],
})
export class ReportingModule { }
