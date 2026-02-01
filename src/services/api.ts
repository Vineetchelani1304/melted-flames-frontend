import axios from "axios";
import { products, Product, getProductById, getProductsByCategory, getFeaturedProducts } from "@/data/products";
import { mockOrders, Order } from "@/data/orders";

// Create axios instance for future backend integration
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Mock delay to simulate network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Products API (mocked)
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    await delay(300);
    return products;
  },
  
  getById: async (id: string): Promise<Product | undefined> => {
    await delay(200);
    return getProductById(id);
  },
  
  getByCategory: async (category: Product["category"]): Promise<Product[]> => {
    await delay(300);
    return getProductsByCategory(category);
  },
  
  getFeatured: async (): Promise<Product[]> => {
    await delay(300);
    return getFeaturedProducts();
  },
};

// Auth API (mocked)
export interface User {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

const mockUsers: User[] = [
  { id: "user-1", email: "customer@example.com", name: "Emma Thompson", role: "customer" },
  { id: "admin-1", email: "admin@meltedflames.com", name: "Admin User", role: "admin" },
];

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    await delay(500);
    
    // Mock validation
    if (credentials.email === "customer@example.com" && credentials.password === "password") {
      return { user: mockUsers[0], token: "mock-customer-token" };
    }
    if (credentials.email === "admin@meltedflames.com" && credentials.password === "admin123") {
      return { user: mockUsers[1], token: "mock-admin-token" };
    }
    
    throw new Error("Invalid email or password");
  },
  
  signup: async (data: SignupData): Promise<{ user: User; token: string }> => {
    await delay(500);
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: "customer",
    };
    
    return { user: newUser, token: "mock-new-user-token" };
  },
  
  logout: async (): Promise<void> => {
    await delay(200);
  },
};

// Orders API (mocked)
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    await delay(300);
    return mockOrders;
  },
  
  getByUserId: async (userId: string): Promise<Order[]> => {
    await delay(300);
    return mockOrders.filter(order => order.userId === userId);
  },
  
  create: async (order: Omit<Order, "id" | "createdAt">): Promise<Order> => {
    await delay(500);
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    return newOrder;
  },
  
  updateStatus: async (orderId: string, status: Order["status"]): Promise<Order | undefined> => {
    await delay(300);
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      return order;
    }
    return undefined;
  },
};

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

export default api;