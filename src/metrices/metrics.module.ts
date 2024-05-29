// metrics.module.ts

import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { PrometheusService } from './prometheus.service';

@Module({
  controllers: [MetricsController],
  providers: [PrometheusService],
  exports: [PrometheusService], // Export PrometheusService for use in other modules
})
export class MetricsModule { }
