import { Layout } from "@/components/layout/Layout";
import { mockOrders } from "@/data/orders";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

const Orders = () => {
  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <h1 className="font-serif text-3xl font-semibold mb-8">Order History</h1>
        
        <div className="space-y-6">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <Badge className={statusColors[order.status]}>{order.status}</Badge>
              </div>
              
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
