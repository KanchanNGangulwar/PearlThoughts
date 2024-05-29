import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportingService {
  generateSummaryReport() {
    // Implement summary report generation logic
    return {
      sent: 100,
      failed: 5,
      retries: 10,
    };
  }
}
