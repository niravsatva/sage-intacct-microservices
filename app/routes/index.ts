import express from 'express';
import authRoutes from './authRoutes';
import customerRoutes from './customerRoute';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/customer', customerRoutes)

export default router;
