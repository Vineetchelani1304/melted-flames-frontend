import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CartItem } from "@/components/cart/CartItem";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";


type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  stock: number;
};

type CartItemType = {
  productId: Product;
  quantity: number;
};

const Cart = () => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Fetched cart items:", res);
        setItems(res.data.items || []);
      } catch (err) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Only count items that are not removed (CartItem returns null if removed)
  const [visibleItems, setVisibleItems] = useState<CartItemType[]>(items);

  useEffect(() => {
    setVisibleItems(items);
  }, [items]);

  const handleItemChange = (index: number, action: "remove" | "update", newQty?: number) => {
    setVisibleItems(prev => {
      if (action === "remove") {
        return prev.filter((_, i) => i !== index);
      } else if (action === "update" && typeof newQty === "number") {
        return prev.map((item, i) => i === index ? { ...item, quantity: newQty } : item);
      }
      return prev;
    });
  };

  const subtotal = visibleItems.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0);
  const totalItems = visibleItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
          <h1 className="font-serif text-2xl font-semibold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Discover our collection of handcrafted candles.</p>
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="font-serif text-3xl font-semibold mb-8">Shopping Cart ({totalItems})</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {visibleItems.map((item, idx) => (
              <CartItem
                key={item.productId._id}
                item={item}
                onCartChange={(action, newQty) => handleItemChange(idx, action, newQty)}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-secondary/30 rounded-lg p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
