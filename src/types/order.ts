
export interface Order {
  id: string;
  studioId: string;
  studioName: string;
  userId: string;
  services: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    description?: string;
    washType?: string;
    details?: string;
  }[];
  totalAmount: number;
  status: 'pending' | 'pending_payment' | 'processing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  paymentMethod?: string;
  paymentStatus?: 'paid' | 'pending';
}
