import express from 'express';
import { shortenUrl, checkKeyExists, checkOwnership, changeKey } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/exists/:key', checkKeyExists)
router.get('/isOwner/:key', checkOwnership);
router.post('/changeKey/:key', changeKey);

export default router;
