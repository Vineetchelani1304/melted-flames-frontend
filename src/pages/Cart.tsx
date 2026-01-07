import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CartItem } from "@/components/cart/CartItem";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, subtotal, totalItems } = useCart();

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
            {items.map(item => (
              <CartItem key={item.product.id} item={item} />
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
