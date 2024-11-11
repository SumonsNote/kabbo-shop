import { Package } from "lucide-react";

export default function OrderItem({ order }) {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-gray-500 rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Order Items</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {order?.items?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">{item?.product?.product_name}</h3>
                  <p className="text-sm text-gray-500">
                    SKU: {item?.product?.product_model}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-medium">
                    ${Number(item.price).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                {/* <span>
                  ${(order.payment.amount - order.shipping.cost).toFixed(2)}
                </span> */}
                <span>${order?.total_amount}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>${order?.shipping_charge}</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>
                  $
                  {parseInt(order?.total_amount) +
                    parseInt(order?.shipping_charge)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
