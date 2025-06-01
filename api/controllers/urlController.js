import isUrlHttp from 'is-url-http';
import Link from '../models/Link.js';
import { nanoid } from 'nanoid';

const reserved = ['analytics', 'analyze', 'error', 'api'];

/** 
 * @description Creates a key for the given URL and saves both to the database
 * 
 * @param {Object} req - The request object containing the URL to shorten
 * @param {Object} res - The response object to send the result
 * @returns {Object} - The shortened URL key
*/
export async function shortenUrl(req, res) {
    const { redirectUrl, customKey } = req.body;

    // Check if the redirectUrl is provided and is a valid HTTP URL
    if (!redirectUrl || !isUrlHttp(redirectUrl)) {
        return res.status(400).json({ error: 'Invalid URL provided' });
    }

    // Check and use customKey if provided
    let key;
    if (customKey) {
        // Check if customKey matches a reserved route
        if (reserved.includes(customKey.toLowerCase())) {
            return res.status(400).json({ error: 'Custom key is an internal route' });
        }
    
        // Check if customKey matches specified format
        if (!/^[a-zA-Z0-9_-]{1,15}$/.test(customKey)) {
            return res.status(400).json({ error: 'Custom key does not follow the format' });
        }

        const exists = await Link.exists({ key: customKey });
        if (exists) {
            return res.status(400).json({ error: 'Custom key already exists' });
        }

        key = customKey;
    } else {key = await generateUniqueKey(4);}

    // Get the link creator's IP address
    const ownerAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;

    // Add the key and redirectURL to the database
    await Link.create({
        key,
        redirectUrl,
        ownerAddress,
    });

    return res.status(201).json({key});
}

/** 
 * @description Generates a unique key of the specified length
 * 
 * @param {number} length - The length of the key to generate
 * @returns {string} - A unique key
*/
async function generateUniqueKey(length) {
    let key;
    let exists = true;

    do {
        key = nanoid(length);
        exists = await Link.exists({key});
    } while (exists);
    return key;
}

export async function checkKeyExists(req, res) {
    const { key } = req.params;

    if (!key) {
        return res.status(400).json({ error: 'Key not provided' });
    }

    // Parse to get just the key
    key = key.split('/').pop();

    const exists = await Link.exists({ key });
    res.json({ exists });
}

export async function checkOwnership(req, res) {
    const { key } = req.params;

    // Get client's IP address
    const clientAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
    
    if (!clientAddress) {
        return res.status(200).json({ isOwner: false });
    }

    // Try to find link in the database and check if the client is the owner
    try {
        const link = await Link.findOne({ key });

        if (!link) {
            return res.status(404).json({ error: 'Link not found in database' });
        }

        const isOwner = link.ownerAddress === clientAddress;

        return res.status(200).json({ isOwner });
    } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
    }
}

export async function changeKey(req, res) {
    const { key } = req.params;
    const { newKey } = req.body;

    // Check if newKey matches a reserved route
    if (reserved.includes(newKey.toLowerCase())) {
        return res.status(400).json({ error: 'New key is an internal route' });
    }

    // Check if newKey matches specified format
    if (!/^[a-zA-Z0-9_-]{1,15}$/.test(newKey)) {
        return res.status(400).json({ error: 'New key does not follow the format' });
    }

    // Check if newKey already exists
    const exists = await Link.exists({ key: newKey });
    if (exists) {
        return res.status(400).json({ error: 'New key already exists' });
    }

    
    const link = await Link.findOne({ key });

    // Check original key exists
    if (!link) {
        return res.status(404).json({ error: 'Original key not found' });
    }

    // Update the key in the database
    link.key = newKey;
    await link.save();

    return res.status(200).json({ message: 'Key changed successfully', newKey });
}
