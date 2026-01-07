import { Link } from "react-router-dom";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { products } from "@/data/products";
import { mockOrders } from "@/data/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "text-blue-600" },
    { label: "Total Orders", value: mockOrders.length, icon: ShoppingCart, color: "text-green-600" },
    { label: "Revenue", value: `$${mockOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`, icon: DollarSign, color: "text-amber-600" },
    { label: "Pending Orders", value: mockOrders.filter(o => o.status === "pending").length, icon: TrendingUp, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-xl font-semibold">Admin Dashboard</h1>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Back to Store</Link>
        </div>
      </header>
      
      <nav className="bg-card border-b px-6 py-3">
        <div className="flex gap-6">
          <Link to="/admin/dashboard" className="text-sm font-medium text-primary">Dashboard</Link>
          <Link to="/admin/products" className="text-sm text-muted-foreground hover:text-primary">Products</Link>
          <Link to="/admin/orders" className="text-sm text-muted-foreground hover:text-primary">Orders</Link>
        </div>
      </nav>

      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.shippingAddress.fullName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
