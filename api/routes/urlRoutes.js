import express from 'express';
import { shortenUrl, checkKeyExists, checkOwnership } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/exists/:key', checkKeyExists)
router.get('/isOwner/:key', checkOwnership);

export default router;
