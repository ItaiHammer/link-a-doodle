import Link from '../models/Link.js';

/**
 * @description Retrieves the analytics for a given key
 * 
 * @param {Object} req - The request object containing the key to look up
 * @param {Object} res - The response object to send the analytics data
 * @returns {Object} - The analytics data for the key
*/
export async function getAnalytics(req, res) {
    const { key } = req.params;

    try {
        // Find the link in the database
        const link = await Link.findOne({ key });

        // If the link is not found, return a 404 error
        if (!link) {
            return res.status(404).json({ error: 'Link not found in database' });
        }

        return res.json({
            createdAt: link.createdAt,
            totalClicks: link.clicks.length,
            clicks: link.clicks,
        });
    } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
    }
}