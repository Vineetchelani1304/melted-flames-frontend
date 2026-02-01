import { Minus, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useState } from "react";


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

interface CartItemProps {
  item: CartItemType;
  onCartChange?: (action: "remove" | "update", newQty?: number) => void;
}


export function CartItem({ item, onCartChange }: CartItemProps) {
  const { productId } = item;
  const [quantity, setQuantity] = useState(item.quantity);
  const [removed, setRemoved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateQuantity = async (newQty: number) => {
    if (newQty < 1) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        "http://localhost:5000/api/cart/update",
        { productId: productId._id, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuantity(newQty);
      if (onCartChange) onCartChange("update", newQty);
    } catch (err) {
      // Optionally show error
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        "http://localhost:5000/api/cart/remove",
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { productId: productId._id }
        }
      );
      setRemoved(true);
      if (onCartChange) onCartChange("remove");
    } catch (err) {
      // Optionally show error
    } finally {
      setLoading(false);
    }
  };

  if (removed) return null;

  return (
    <div className="flex gap-4 py-4 border-b border-border">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-secondary/30">
        <img
          src={productId.images?.[0] || ""}
          alt={productId.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-serif text-base font-medium text-foreground">
            {productId.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {productId.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(quantity - 1)}
              disabled={loading}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(quantity + 1)}
              disabled={loading}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-foreground">
              ${(productId.price * quantity).toFixed(2)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
              disabled={loading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}