import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailDispatchModule } from './email-dispatch/email.dispatch.module';
import { DeliverabilityTrackingModule } from './deliverability-tracking/deliverability-tracking.module';
import { ComplianceModule } from './compliance/compliance.module';
import { ReportingModule } from './reporting/reporting.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { MetricsModule } from './metrices/metrics.module'; // Import MetricsModule

@Module({
  imports: [
    ConfigModule.forRoot(),
    EmailDispatchModule,
    DeliverabilityTrackingModule,
    ComplianceModule,
    ReportingModule,
    MonitoringModule,
    MetricsModule, // Add MetricsModule
  ],
})
export class AppModule { }
