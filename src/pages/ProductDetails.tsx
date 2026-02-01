import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import axios from "axios";
// import axios from "axios";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ArrowLeft } from "lucide-react";
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

const API_BASE = "http://localhost:5000/api/products";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    console.log("Fetching product with ID:", id);
    // Fetch product by id
    axios.get(`${API_BASE}/${id}`)
      .then(res => {
        setProduct(res.data);
        // Fetch related products
        return axios.get(API_BASE);
      })
      .then(res => {
        if (!product) return;
        // Filter related products by category, exclude current
        setRelatedProducts(
          res.data.filter((p: Product) => p.category === product?.category && p._id !== id).slice(0, 4)
        );
      })
      .catch(err => {
        setError(err?.response?.data?.message || "Product not found");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [id]);

  // Refetch related products when product changes
  useEffect(() => {
    if (!product) return;
    axios.get(API_BASE)
      .then(res => {
        setRelatedProducts(
          res.data.filter((p: Product) => p.category === product.category && p._id !== product._id).slice(0, 4)
        );
      });
  }, [product]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-serif text-2xl mb-4">Product Not Found</h1>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = async () => {
    if (!product) return;
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`${quantity} x ${product.name} added to cart`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary/30">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground capitalize mb-2">{product.category}</p>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold">{product.name}</h1>
            </div>
            <p className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button onClick={handleAddToCart} size="lg" className="w-full md:w-auto px-12">
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="font-serif text-2xl font-semibold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;