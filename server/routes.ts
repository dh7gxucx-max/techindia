import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api, orderSchema } from "@shared/routes";
import { setupAuth } from "./replit_integrations/auth";
import { z } from "zod";
import { sendOrderEmail } from "./email";

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

  // CREATE ORDER
  app.post(api.orders.create.path, async (req, res) => {
    try {
      console.log("=== ORDER REQUEST START ===");
      console.log("Received order data:", JSON.stringify(req.body, null, 2));

      console.log("SMTP Configuration check:");
      console.log("- SMTP_HOST:", process.env.SMTP_HOST || "NOT SET");
      console.log("- SMTP_PORT:", process.env.SMTP_PORT || "NOT SET");
      console.log("- SMTP_USER:", process.env.SMTP_USER || "NOT SET");
      console.log("- SMTP_PASS:", process.env.SMTP_PASS ? "SET (hidden)" : "NOT SET");
      console.log("- ORDER_EMAIL:", process.env.ORDER_EMAIL || "NOT SET");

      console.log("Validating order data...");
      const orderData = orderSchema.parse(req.body);
      console.log("Validation passed!");

      console.log("Attempting to send email...");
      await sendOrderEmail(orderData);
      console.log("Email sent successfully!");

      res.json({
        success: true,
        message: "Order placed successfully",
        orderId: `ORD-${Date.now()}`,
      });
      console.log("=== ORDER REQUEST END ===");
    } catch (error) {
      console.error("=== ERROR OCCURRED ===");
      console.error("Error type:", error?.constructor?.name);
      console.error("Error message:", error instanceof Error ? error.message : String(error));
      console.error("Full error:", error);

      if (error instanceof z.ZodError) {
        const errorDetails = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
        console.error("Validation errors:", errorDetails);
        return res.status(400).json({
          message: `Validation error: ${errorDetails}`,
          field: error.errors[0]?.path.join('.'),
          errors: error.errors,
        });
      }

      res.status(500).json({
        message: "Failed to process order. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // ... остальной код seedDatabase() оставляй как есть
}
