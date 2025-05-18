import express from 'express';
import {
    shortenUrl,
    getUrlAnalytics,
} from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/analytics/:id', getUrlAnalytics);

export default router;
