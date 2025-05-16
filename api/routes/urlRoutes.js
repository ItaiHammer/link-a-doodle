import express from 'express';
import {
    shortenUrl,
    redirectUrl,
    getUrlAnalytics,
} from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/analytics/:id', getUrlAnalytics);
router.get('/redirect/:id', redirectUrl);

export default router;
