import { users, products, type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, desc, asc, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getProducts(params?: {
    category?: string;
    brand?: string;
    search?: string;
    sort?: string;
  }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  countProducts(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProducts(params?: {
    category?: string;
    brand?: string;
    search?: string;
    sort?: string;
  }): Promise<Product[]> {
    let query = db.select().from(products);
    const conditions = [];

    if (params?.category) {
      conditions.push(eq(products.category, params.category));
    }

    if (params?.brand) {
      conditions.push(eq(products.brand, params.brand));
    }

    if (params?.search) {
      conditions.push(or(
        ilike(products.name, `%${params.search}%`),
        ilike(products.description, `%${params.search}%`),
        ilike(products.brand, `%${params.search}%`)
      ));
    }

    if (conditions.length > 0) {
      // @ts-ignore
      query = query.where(and(...conditions));
    }

    if (params?.sort) {
      switch (params.sort) {
        case 'price_asc':
          query = query.orderBy(asc(products.price));
          break;
        case 'price_desc':
          query = query.orderBy(desc(products.price));
          break;
        case 'newest':
          query = query.orderBy(desc(products.id)); // Assuming ID correlates with time or add createdAt
          break;
        // popular not implemented without sales data, default to ID
        default:
          query = query.orderBy(asc(products.id));
      }
    }

    return await query;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async countProducts(): Promise<number> {
      const [count] = await db.select({ count: products.id }).from(products);
      return count ? Number(count.count) : 0; // Approximate
  }
}

export const storage = new DatabaseStorage();
