
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Order } from '@/types/order';
import OrderViewDetailsButton from './OrderViewDetailsButton';

interface OrderCardActionsProps {
  order: Order;
  specialCodeActivated: boolean;
  isPendingPayment: boolean;
  onPayNowClick: (e: React.MouseEvent) => void;
}

const OrderCardActions: React.FC<OrderCardActionsProps> = ({
  order,
  specialCodeActivated,
  isPendingPayment,
  onPayNowClick
}) => {
  return (
    <>
      <div className="mt-2">
        <Link to={`/studio/${order.studioId}`} className="text-sm text-primary-500 flex items-center">
          View Menu <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="mt-3 flex flex-col gap-2">
        <OrderViewDetailsButton 
          orderId={order.id} 
          variant="outline" 
          size="sm" 
          className="w-full"
        />
        
        {isPendingPayment && (
          <>
            <Button 
              variant="default" 
              size="sm" 
              className={`rounded-full shadow-sm hover:shadow flex-1 transition-colors ${
                specialCodeActivated ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
              }`} 
              disabled={!specialCodeActivated}
              onClick={specialCodeActivated ? onPayNowClick : undefined}
            >
              Pay Now ₹{order.totalAmount}
            </Button>
            <p className="text-sm text-gray-500 text-center mt-1">
              You can pay for this order during pick up
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default OrderCardActions;
