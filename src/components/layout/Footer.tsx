import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="font-serif text-xl font-semibold text-foreground">
              Melted Flames
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Handcrafted luxury candles by <b>Shweta Asrani</b>, artist and creator behind Melted Flames.<br />
              Each piece is thoughtfully designed to elevate everyday moments through scent and warmth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=candles" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Scented Candles
                </Link>
              </li>
              <li>
                <Link to="/products?category=trays" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Concrete Trays
                </Link>
              </li>
              <li>
                <Link to="/products?category=decor" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home Decor
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-foreground mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Instagram: <a href="https://instagram.com/melted_flames" target="_blank" rel="noopener noreferrer" className="hover:text-primary">@melted_flames</a></li>
              <li>Phone: +91 76929 74243</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            2026 Melted Flames. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
