import isUrlHttp from 'is-url-http';
import Link from '../models/Link.js';
import {nanoid} from 'nanoid';

const reserved = ['analytics', 'shorten', 'analyze', 'error', 'api'];

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
        return res.status(400).json({error: 'No or invalid URL provided'});
    }

    // Check and use customKey if provided
    let key;
    if (customKey) {
        // Check if customKey matches a reserved route
        if (reserved.includes(customKey.toLowerCase())) {
            return res.status(400).json({error: 'Custom key is a reserved route'});
        }
    
        // Check if customKey matches specified format
        if (!/^[a-zA-Z0-9_-]{3,30}$/.test(customKey)) {
            return res.status(400).json({error: 'Custom key does not follow the format'});
        }

        const exists = await Link.exists({key: customKey});
        if (exists) {
            return res.status(400).json({error: 'Custom key already exists'});
        }

        key = customKey;
    } else {key = await generateUniqueKey(4);}

    // Add the key and redirectURL to the database
    await Link.create({
        key,
        redirectUrl,
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

/**
 * @description Redirects to the saved URL based on the provided key
 * 
 * @param {Object} req - The request object containing the key to look up
 * @param {Object} res - The response object to redirect to the saved URL
 * @returns {void}
*/
export async function redirectUrl(req, res) {
    const {id} = req.params;

    try {
        // Find the link in the database
        const link = await Link.findOne({key: id});

        // If the link is not found, return a 404 error
        if (!link) {
            return res.status(404).json({error: 'Link not found'});
        }

        // Track Analytics (ip address and timestamp)
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        link.clicks.push({timestamp: new Date(), ip});
        await link.save();

        return res.redirect(link.redirectUrl);
    } catch (error) {
        return res.status(500).json({error: 'Server Error'});
    }
}

/**
 * 
 * @description Retrieves the analytics for a given key
 * @param {Object} req - The request object containing the key to look up
 * @param {Object} res - The response object to send the analytics data
 * @returns {Object} - The analytics data for the key
*/
export async function getUrlAnalytics(req, res) {
    const {id} = req.params;

    try {
        // Find the link in the database
        const link = await Link.findOne({key: id});

        // If the link is not found, return a 404 error
        if (!link) {
            return res.status(404).json({error: 'Link not found'});
        }

        return res.json({
            createdAt: link.createdAt,
            totalClicks: link.clicks.length,
            clicks: link.clicks,
        });
    } catch (error) {
        return res.status(500).json({error: 'Server Error'});
    }
}
