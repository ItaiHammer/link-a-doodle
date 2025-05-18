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

    const key = nanoid(4);

    await Link.create({
        key,
        redirectUrl: redirectUrl,
    });

    return res.status(201).json({key});
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
