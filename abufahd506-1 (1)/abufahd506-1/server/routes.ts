import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertOrderSchema } from "@shared/schema";
import { z } from "zod";
import * as bcrypt from "bcrypt";

// Discord webhook function
async function sendToDiscord(data: any) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.error('DISCORD_WEBHOOK_URL environment variable not set');
    return;
  }
  
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [{
          title: data.title,
          description: data.description,
          color: 0x00ff00,
          timestamp: new Date().toISOString()
        }]
      })
    });
    
    if (!response.ok) {
      console.error('Failed to send to Discord:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending to Discord:', error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Register user
  app.post('/api/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ error: 'المستخدم موجود بالفعل' });
      }
      
      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      
      // Create user with hashed password
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      
      // Send non-sensitive info to Discord webhook (NO PASSWORD OR PERSONAL DATA)
      await sendToDiscord({
        title: "تسجيل مستخدم جديد - تشاليح المحاكي",
        description: `مستخدم جديد انضم إلى الموقع\n**معرف المستخدم:** ${user.id}\n**وقت التسجيل:** ${new Date().toLocaleString('ar-SA')}`
      });
      
      res.json({ user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ error: 'خطأ في التسجيل' });
    }
  });
  
  // Login user
  app.post('/api/login', async (req, res) => {
    try {
      const loginData = z.object({
        email: z.string().email(),
        password: z.string().min(1)
      }).parse(req.body);
      
      const user = await storage.getUserByEmail(loginData.email);
      if (!user) {
        return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
      }
      
      // Verify hashed password
      const isValidPassword = await bcrypt.compare(loginData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'بيانات الدخول غير صحيحة' });
      }
      
      // Regenerate session to prevent session fixation attacks
      (req as any).session.regenerate((err: any) => {
        if (err) {
          console.error('Session regeneration error:', err);
          return res.status(500).json({ error: 'خطأ في تسجيل الدخول' });
        }
        
        // Store user ID in new session
        (req as any).session.userId = user.id;
        
        res.json({ user: { id: user.id, email: user.email } });
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'خطأ في تسجيل الدخول' });
    }
  });
  
  // Get current user
  app.get('/api/user', async (req, res) => {
    try {
      const userId = (req as any).session.userId;
      if (!userId) {
        return res.status(401).json({ error: 'غير مسجل دخول' });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: 'المستخدم غير موجود' });
      }
      
      res.json({ user: { id: user.id, email: user.email } });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'خطأ في الحصول على بيانات المستخدم' });
    }
  });
  
  // Create order
  app.post('/api/orders', async (req, res) => {
    try {
      const userId = (req as any).session.userId;
      if (!userId) {
        return res.status(401).json({ error: 'يجب تسجيل الدخول للشراء' });
      }
      
      const orderInput = z.object({
        serviceTitle: z.string().min(1),
        servicePrice: z.number().positive()
      }).parse(req.body);
      
      // Generate unique invoice number
      const invoiceNumber = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      const orderData = {
        userId,
        serviceTitle: orderInput.serviceTitle,
        servicePrice: orderInput.servicePrice,
        invoiceNumber
      };
      
      const order = await storage.createOrder(orderData);
      
      // Send only invoice info to Discord webhook (NO USER DATA)
      await sendToDiscord({
        title: "طلب جديد - تشاليح المحاكي",
        description: `**رقم الفاتورة:** ${invoiceNumber}\n**الخدمة:** ${orderInput.serviceTitle}\n**السعر:** ${orderInput.servicePrice} ريال\n**وقت الطلب:** ${new Date().toLocaleString('ar-SA')}`
      });
      
      res.json({ order });
    } catch (error) {
      console.error('Order creation error:', error);
      res.status(500).json({ error: 'خطأ في إنشاء الطلب' });
    }
  });
  
  // Logout
  app.post('/api/logout', (req, res) => {
    (req as any).session.destroy();
    res.json({ success: true });
  });

  const httpServer = createServer(app);

  return httpServer;
}
