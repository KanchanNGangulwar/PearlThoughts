import { Controller, Get } from '@nestjs/common';
import { register } from 'prom-client'; // Import register from prom-client
import { PrometheusService } from './prometheus.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly prometheusService: PrometheusService) { }

  @Get()
  getMetrics() {
    return register.metrics();
  }
}
