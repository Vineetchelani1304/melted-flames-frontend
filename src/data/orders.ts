export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: string;
}

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "user-1",
    items: [
      {
        productId: "1",
        name: "Lavender Dreams",
        price: 34.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1602607434689-660d58a90333?w=200&h=200&fit=crop"
      },
      {
        productId: "7",
        name: "Marble Candle Tray",
        price: 28.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=200&h=200&fit=crop"
      }
    ],
    total: 98.97,
    status: "delivered",
    shippingAddress: {
      fullName: "Emma Thompson",
      phone: "+1 555-123-4567",
      address: "123 Oak Street, Apt 4B",
      city: "Los Angeles",
      state: "California",
      pincode: "90001"
    },
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "ORD-002",
    userId: "user-1",
    items: [
      {
        productId: "3",
        name: "Cedar & Sage",
        price: 42.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=200&h=200&fit=crop"
      }
    ],
    total: 42.99,
    status: "shipped",
    shippingAddress: {
      fullName: "Emma Thompson",
      phone: "+1 555-123-4567",
      address: "123 Oak Street, Apt 4B",
      city: "Los Angeles",
      state: "California",
      pincode: "90001"
    },
    createdAt: "2024-01-20T14:15:00Z"
  },
  {
    id: "ORD-003",
    userId: "user-2",
    items: [
      {
        productId: "2",
        name: "Vanilla Bourbon",
        price: 38.99,
        quantity: 3,
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=200&h=200&fit=crop"
      },
      {
        productId: "8",
        name: "Brass Geometric Tray",
        price: 35.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=200&h=200&fit=crop"
      }
    ],
    total: 152.96,
    status: "processing",
    shippingAddress: {
      fullName: "Michael Chen",
      phone: "+1 555-987-6543",
      address: "456 Maple Avenue",
      city: "New York",
      state: "New York",
      pincode: "10001"
    },
    createdAt: "2024-01-22T09:45:00Z"
  },
  {
    id: "ORD-004",
    userId: "user-3",
    items: [
      {
        productId: "6",
        name: "Amber Noir",
        price: 44.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&h=200&fit=crop"
      }
    ],
    total: 89.98,
    status: "pending",
    shippingAddress: {
      fullName: "Sarah Williams",
      phone: "+1 555-456-7890",
      address: "789 Pine Road",
      city: "Chicago",
      state: "Illinois",
      pincode: "60601"
    },
    createdAt: "2024-01-23T16:20:00Z"
  }
];
