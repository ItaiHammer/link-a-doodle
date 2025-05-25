import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/analyze/:key', getAnalytics);

export default router;

