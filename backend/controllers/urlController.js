export async function shortenUrl(req, res) {
    // method that creates an object in the db with its url to redirect to
    console.log('Shorten Url');
}

export async function redirectUrl(req, res) {
    // finds the id in the db and redirects to the saved url
    console.log('Redirect Url');
}

export async function getUrlAnalytics(req, res) {
    // finds the id in the db and returns the saved analytics
    console.log('Get Url Analytics');
}
