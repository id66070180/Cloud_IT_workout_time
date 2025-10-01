// routes/authRoutes.js

import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// เส้นทางสำหรับการสมัครสมาชิก
router.post('/register', register);

// เส้นทางสำหรับการล็อกอิน
router.post('/login', login);

export default router;
