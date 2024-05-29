export interface EmailStrategy {
  send(emailDetails: any): Promise<void>;
}
