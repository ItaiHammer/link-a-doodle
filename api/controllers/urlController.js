import isUrlHttp from 'is-url-http';
import Link from '../models/Link.js';
import {nanoid} from 'nanoid';

export async function shortenUrl(req, res) {
    // method that creates an object in the db with its url to redirect to

    console.log('shortenUrl called');
    console.log(req.body);
    console.log(req.body.redirectUrl);
    console.log("-----------------------");

    let {redirectUrl} = req.body;

    if (!redirectUrl || !isUrlHttp(redirectUrl)) {
        return res.status(400).json({error: 'Valid url is required'});
    }

    const shortenedUrl = nanoid(4);

    const link = await Link.create({
        key: shortenedUrl,
        redirectUrl: redirectUrl,
    });

    return res.status(201).json({shortUrl: shortenedUrl});
}

export async function redirectUrl(req, res) {
    // finds the id in the db and redirects to the saved url

    const {id} = req.params;

    try {
        const link = await Link.findOne({key: id});

        if (!link) {
            return res.status(404).json({error: 'Link not found'});
        }

        // Track Analytics
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        link.clicks.push({timestamp: new Date(), ip});
        await link.save();

        return res.redirect(link.redirectUrl);
    } catch (error) {
        return res.status(500).json({error: 'Server Error'});
    }
}

export async function getUrlAnalytics(req, res) {
    // finds the id in the db and returns the saved analytics
    const {id} = req.params;

    try {
        const link = await Link.findOne({key: id});

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
