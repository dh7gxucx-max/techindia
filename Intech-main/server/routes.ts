import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { setupAuth } from "./replit_integrations/auth";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // setupAuth(app);

  // LIST PRODUCTS
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts(req.query);

    // Маппинг imageUrl -> images[], specifications -> specs
    const mapped = products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      brand: p.brand,
      // фронт ждёт images, даём массив из одного URL
      images: [p.imageUrl],
      // чтобы старые места тоже работали
      imageUrl: p.imageUrl,
      stock: p.stock,
      specs: p.specifications,
      specifications: p.specifications,
      // можно сразу добавить rating / reviews по умолчанию
      rating: (p as any).rating ?? 4.8,
      reviews: (p as any).reviews ?? 124,
      oldPrice: (p as any).oldPrice,
      discount: (p as any).discount,
    }));

    res.json(mapped);
  });

  // GET ONE PRODUCT
  app.get(api.products.get.path, async (req, res) => {
    const p = await storage.getProduct(Number(req.params.id));

    if (!p) {
      return res.status(404).json({ message: "Product not found" });
    }

    const mapped = {
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      brand: p.brand,
      images: [p.imageUrl],
      imageUrl: p.imageUrl,
      stock: p.stock,
      specs: p.specifications,
      specifications: p.specifications,
      rating: (p as any).rating ?? 4.8,
      reviews: (p as any).reviews ?? 124,
      oldPrice: (p as any).oldPrice,
      discount: (p as any).discount,
    };

    res.json(mapped);
  });

  app.post(api.products.seed.path, async (req, res) => {
    await seedDatabase();
    res.status(201).json({ message: "Database seeded" });
  });

  // ... остальной код seedDatabase() оставляй как есть
}
