import { useState } from "react";
import { Link } from "react-router-dom";
import { mockOrders, Order } from "@/data/orders";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState(mockOrders);

  const updateStatus = (orderId: string, status: Order["status"]) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    toast.success(`Order ${orderId} updated to ${status}`);
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-xl font-semibold">Manage Orders</h1>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Back to Store</Link>
        </div>
      </header>
      
      <nav className="bg-card border-b px-6 py-3">
        <div className="flex gap-6">
          <Link to="/admin/dashboard" className="text-sm text-muted-foreground hover:text-primary">Dashboard</Link>
          <Link to="/admin/products" className="text-sm text-muted-foreground hover:text-primary">Products</Link>
          <Link to="/admin/orders" className="text-sm font-medium text-primary">Orders</Link>
        </div>
      </nav>

      <main className="p-6">
        <h2 className="text-lg font-semibold mb-6">All Orders ({orders.length})</h2>

        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Update Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.shippingAddress.fullName}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell><Badge className={statusColors[order.status]}>{order.status}</Badge></TableCell>
                  <TableCell>
                    <Select value={order.status} onValueChange={(v) => updateStatus(order.id, v as Order["status"])}>
                      <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;
