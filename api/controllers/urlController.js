import isUrlHttp from 'is-url-http';
import Link from '../models/Link.js';
import {nanoid} from 'nanoid';

export async function shortenUrl(req, res) {
    // method that creates an object in the db with its url to redirect to

    let {redirectUrl} = req.body;

    if (!redirectUrl || !isUrlHttp(redirectUrl)) {
        return res.status(400).json({error: 'Valid url is required'});
    }

    const shortenedUrl = nanoid(4);

    const link = await Link.create({
        key: shortenedUrl,
        redirectUrl: redirectUrl,
    });

    res.status(201).json({shortenedUrl: shortenedUrl});
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
        link.clicks.push(Date.now());
        await link.save();

        return res.redirect(link.redirectUrl);
    } catch (error) {
        return res.status(500).json({error: 'Server Error'});
    }
}

export async function getUrlAnalytics(req, res) {
    // finds the id in the db and returns the saved analytics
    console.log('Get Url Analytics');
}
