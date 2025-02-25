import isUrlHttp from 'is-url-http';

export async function shortenUrl(req, res) {
    // method that creates an object in the db with its url to redirect to
    let {redirectUrl} = req.body;
    if (!redirectUrl && !isUrlHttp(redirectUrl)) {
        return res.status(400).json({error: 'Valid url is required'});
    }
}

export async function redirectUrl(req, res) {
    // finds the id in the db and redirects to the saved url
}

export async function getUrlAnalytics(req, res) {
    // finds the id in the db and returns the saved analytics
}
