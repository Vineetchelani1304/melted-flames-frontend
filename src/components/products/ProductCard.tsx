import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  stock: number;
};

interface ProductCardProps {
  product: Product;
}


export function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`${product.name} added to cart`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <Link to={`/products/${product._id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-secondary/30 aspect-square">
        <img
          src={product.images?.[0] || ""}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {product.description?.slice(0, 60)}
        </p>
        <p className="font-medium text-foreground">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}