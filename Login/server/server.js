// server.js

import express from 'express';
import cors from 'cors';  // นำเข้า CORS
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// ตั้งค่า CORS ให้สามารถเข้าถึงจาก origin ที่กำหนด
app.use(cors({
  origin: 'http://localhost:3000', // Frontend React URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], // headers ที่อนุญาต
}));

// Middleware
app.use(express.json());

// ใช้ routes สำหรับ Authentication
app.use('/api/auth', authRoutes);

// เริ่มต้นเซิร์ฟเวอร์ที่ port
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
