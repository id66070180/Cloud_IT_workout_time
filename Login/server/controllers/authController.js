import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

// ฟังก์ชันสำหรับการสมัครสมาชิก (Updated)
export const register = async (req, res) => {
  const { username, password, email, phone } = req.body;

  try {
    // ตรวจสอบว่าผู้ใช้งานมีอยู่แล้วหรือไม่ (Check if username or email already exists)
    const result = await db.query(
      'SELECT * FROM itworkout_user WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // เข้ารหัสรหัสผ่าน (Hash the password)
    const hashedPassword = await bcrypt.hash(password, 10);

    // เพิ่มข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล (Insert the new user into the database)
    const newUser = await db.query(
      'INSERT INTO itworkout_user (username, password_hash, email, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, hashedPassword, email, phone || null, 'user']
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ฟังก์ชันสำหรับการล็อกอิน (Updated)
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // ค้นหาผู้ใช้ในฐานข้อมูล (Search for user by username only)
    const result = await db.query(
      'SELECT * FROM itworkout_user WHERE username = $1',
      [username] // ใช้แค่ username ในการค้นหาผู้ใช้
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // ตรวจสอบรหัสผ่าน (Check if the password matches)
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // สร้าง JWT token (Generate JWT token)
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
