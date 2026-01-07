import { useState } from "react";
import { Link } from "react-router-dom";
import { products, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const AdminProducts = () => {
  const [productList, setProductList] = useState(products);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = (id: string) => {
    setProductList(productList.filter(p => p.id !== id));
    toast.success("Product deleted");
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
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
              <Button onClick={() => setEditingProduct(null)}>
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
                  <Input defaultValue={editingProduct?.name} />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input type="number" step="0.01" defaultValue={editingProduct?.price} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select defaultValue={editingProduct?.category}>
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
                  <Textarea defaultValue={editingProduct?.description} />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input defaultValue={editingProduct?.image} />
                </div>
                <Button className="w-full" onClick={() => { setIsDialogOpen(false); toast.success("Product saved"); }}>
                  {editingProduct ? "Update Product" : "Add Product"}
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
                <TableRow key={product.id}>
                  <TableCell><img src={product.image} alt="" className="h-12 w-12 rounded object-cover" /></TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="capitalize">{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
