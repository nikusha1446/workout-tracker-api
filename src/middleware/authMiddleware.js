import { verifyToken } from '../utils/jwt.js';
import prisma from '../config/prisma.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = await verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};
