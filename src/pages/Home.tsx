import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts, products } from "@/data/products";
import { Button } from "@/components/ui/button";

const Home = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  const categories = [
    { name: "Scented Candles", slug: "candles", image: "https://images.unsplash.com/photo-1602607434689-660d58a90333?w=600&h=400&fit=crop" },
    { name: "Candle Trays", slug: "trays", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&h=400&fit=crop" },
    { name: "Home Decor", slug: "decor", image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&h=400&fit=crop" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1920&h=1080&fit=crop"
            alt="Luxury candles"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in">
          <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white mb-6 leading-tight">
            Illuminate Your Space
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            Handcrafted luxury candles to create warmth, comfort, and unforgettable moments in your home.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            <Link to="/products">Shop Collection</Link>
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/products?category=${category.slug}`}
                className="group relative h-64 overflow-hidden rounded-lg"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-serif text-2xl font-semibold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold">Featured Products</h2>
            <Link to="/products" className="text-sm font-medium text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=800&h=800&fit=crop"
                alt="Crafting candles"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold">Crafted with Care</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Melted Flames, we believe in the power of ambiance. Each candle is hand-poured using premium natural waxes and carefully curated fragrances to create an experience that transforms your space.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our commitment to quality means every candle burns cleaner and longer, filling your home with subtle, sophisticated scents that linger in memory.
              </p>
              <Button asChild variant="outline" size="lg">
                <Link to="/products">Explore Our Collection</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
