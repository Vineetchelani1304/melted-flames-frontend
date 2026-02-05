import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch products
        const token = localStorage.getItem("token");
        const productsRes = await axios.get("https://melted-flames-backend.onrender.com/api/products", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProductsCount(productsRes.data.length);

        // Fetch orders (admin endpoint, adjust as needed)
        const ordersRes = await axios.get("https://melted-flames-backend.onrender.com/api/orders/admin", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(ordersRes.data);
      } catch (err) {
        setProductsCount(0);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  const stats = [
    { label: "Total Products", value: productsCount, icon: Package, color: "text-blue-600" },
    { label: "Total Orders", value: orders.length, icon: ShoppingCart, color: "text-green-600" },
    { label: "Revenue", value: `$${revenue.toFixed(2)}`, icon: DollarSign, color: "text-amber-600" },
    { label: "Pending Orders", value: pendingOrders, icon: TrendingUp, color: "text-purple-600" },
  ];

  return loading ? (
    <div className="min-h-screen bg-secondary/20 flex items-center justify-center">
      <span className="text-muted-foreground">Loading dashboard...</span>
    </div>
  ) : (
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
              {orders.slice(0, 5).map((order) => (
                <div key={order._id || order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{order._id || order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.shippingAddress?.fullName || order.user?.name || "-"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total?.toFixed(2) ?? "0.00"}</p>
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
