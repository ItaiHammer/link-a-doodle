import express from 'express';
import {
    shortenUrl,
    redirectUrl,
    getUrlAnalytics,
} from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/:id', redirectUrl);
router.get('/analytics/:id', getUrlAnalytics);

export default router;
