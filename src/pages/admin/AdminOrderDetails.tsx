import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAdminOrders, updateAdminOrderStatus } from "@/services/adminApi";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AdminLayout } from "./AdminLayout";
import AdminRoute from "./AdminRoute";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

export default function AdminOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminOrders()
      .then((orders) => setOrder(orders.find((o: any) => o.id === id)))
      .catch(() => toast.error("Failed to load order"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (status: string) => {
    try {
      await updateAdminOrderStatus(order.id, status);
      setOrder((prev: any) => ({ ...prev, status }));
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;
  if (!order) return <AdminLayout><div>Order not found</div></AdminLayout>;

  return (
    <AdminRoute>
      <AdminLayout>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-xl font-semibold">Order Details</h1>
          <Link to="/admin/orders" className="text-sm text-muted-foreground hover:text-primary">Back to Orders</Link>
        </div>
        <Card className="p-6 mb-8">
          <div className="mb-4 flex flex-wrap gap-8">
            <div>
              <div className="font-semibold">Order ID:</div>
              <div>{order.id}</div>
            </div>
            <div>
              <div className="font-semibold">User:</div>
              <div>{order.user?.name || order.user?.email}</div>
            </div>
            <div>
              <div className="font-semibold">Total:</div>
              <div>${order.total.toFixed(2)}</div>
            </div>
            <div>
              <div className="font-semibold">Payment Status:</div>
              <div>{order.paymentStatus || "Paid"}</div>
            </div>
            <div>
              <div className="font-semibold">Order Status:</div>
              <Badge className={statusColors[order.status]}>{order.status}</Badge>
            </div>
            <div>
              <div className="font-semibold">Created:</div>
              <div>{new Date(order.createdAt).toLocaleString()}</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-1">Razorpay IDs:</div>
            <div className="text-xs text-muted-foreground">Payment ID: {order.razorpayPaymentId || "-"}</div>
            <div className="text-xs text-muted-foreground">Order ID: {order.razorpayOrderId || "-"}</div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-1">Shipping Address:</div>
            <div className="text-sm">{order.shippingAddress?.fullName}, {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state}, {order.shippingAddress?.pincode}</div>
            <div className="text-xs text-muted-foreground">Phone: {order.shippingAddress?.phone}</div>
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-1">Update Order Status:</div>
            <Select value={order.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
        <Card className="p-6">
          <div className="font-semibold mb-2">Ordered Items</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2">Product</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Qty</th>
                  <th className="text-left p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item: any) => (
                  <tr key={item.productId}>
                    <td className="p-2 flex items-center gap-2">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover border" />
                      <span>{item.name}</span>
                    </td>
                    <td className="p-2">${item.price.toFixed(2)}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </AdminLayout>
    </AdminRoute>
  );
}
