export interface IPayment extends Document {
  paymentId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  status: string;
  subscriptionId: string;
  productId: string;
}
