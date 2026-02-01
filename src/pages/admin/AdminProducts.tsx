import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

// Product type definition
type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  stock: number;
};

const AdminProducts = () => {

  const [productList, setProductList] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
    stock: ""
  });
  const [loading, setLoading] = useState(false);

  // Backend base URL
  const API_URL = "http://localhost:5000/api/products";

  // Fetch all products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProductList(res.data);
    } catch (err) {
      toast.error("Failed to fetch products");
    }
  };

  // Delete product (admin)
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProductList(productList.filter(p => p._id !== id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  // Open dialog for edit
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.images[0] || "",
      stock: product.stock.toString()
    });
    setIsDialogOpen(true);
  };

  // Open dialog for add
  const handleAdd = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      stock: ""
    });
    setIsDialogOpen(true);
  };

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle category select
  const handleCategory = (value: string) => {
    setForm({ ...form, category: value });
  };

  // Add or update product (admin)
  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      if (editingProduct) {
        // Update
        const res = await axios.put(
          `${API_URL}/admin/${editingProduct._id}`,
          {
            name: form.name,
            price: parseFloat(form.price),
            category: form.category,
            description: form.description,
            images: [form.image],
            stock: parseInt(form.stock)
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProductList(productList.map(p => (p._id === editingProduct._id ? res.data : p)));
        toast.success("Product updated");
      } else {
        // Add
        const res = await axios.post(
          `${API_URL}/admin`,
          {
            name: form.name,
            price: parseFloat(form.price),
            category: form.category,
            description: form.description,
            images: [form.image],
            stock: parseInt(form.stock)
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProductList([res.data, ...productList]);
        toast.success("Product added");
      }
      setIsDialogOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-xl font-semibold">Manage Products</h1>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">Back to Store</Link>
        </div>
      </header>
      
      <nav className="bg-card border-b px-6 py-3">
        <div className="flex gap-6">
          <Link to="/admin/dashboard" className="text-sm text-muted-foreground hover:text-primary">Dashboard</Link>
          <Link to="/admin/products" className="text-sm font-medium text-primary">Products</Link>
          <Link to="/admin/orders" className="text-sm text-muted-foreground hover:text-primary">Orders</Link>
        </div>
      </nav>

      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">All Products ({productList.length})</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>Product Name</Label>
                  <Input name="name" value={form.name} onChange={handleChange} />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={handleCategory}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candles">Candles</SelectItem>
                      <SelectItem value="trays">Trays</SelectItem>
                      <SelectItem value="decor">Decor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea name="description" value={form.description} onChange={handleChange} />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input name="image" value={form.image} onChange={handleChange} />
                </div>
                <div>
                  <Label>Stock</Label>
                  <Input name="stock" type="number" value={form.stock} onChange={handleChange} />
                </div>
                <Button className="w-full" onClick={handleSave} disabled={loading}>
                  {loading ? (editingProduct ? "Updating..." : "Adding...") : (editingProduct ? "Update Product" : "Add Product")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productList.map((product) => (
                <TableRow key={product._id}>
                  <TableCell><img src={product.images[0]} alt="" className="h-12 w-12 rounded object-cover" /></TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="capitalize">{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product._id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default AdminProducts;
