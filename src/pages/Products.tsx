import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import axios from "axios";
import { Button } from "@/components/ui/button";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  stock: number;
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") as Product["category"] | null;

  const [activeCategory, setActiveCategory] = useState<Product["category"] | "all">(categoryParam || "all");
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://melted-flames-backend.onrender.com/api/products");
        console.log("Fetched products:", res);
        setProductList(res.data);
      } catch (err) {
        setProductList([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === "all"
    ? productList
    : productList.filter(p => p.category === activeCategory);

  const handleCategoryChange = (category: Product["category"] | "all") => {
    setActiveCategory(category);
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const categories = [
    { value: "all" as const, label: "All Products" },
    { value: "candles" as const, label: "Candles" },
    { value: "trays" as const, label: "Trays" },
    { value: "decor" as const, label: "Decor" },
  ];

  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-semibold mb-4">Our Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted candles and home accessories, designed to bring warmth and elegance to your space.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? "default" : "outline"}
              onClick={() => handleCategoryChange(cat.value)}
              className="min-w-[100px]"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Products;
