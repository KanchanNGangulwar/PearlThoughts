import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [PrometheusModule.register()],
  providers: [MonitoringService],
})
export class MonitoringModule { }
