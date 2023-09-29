const express = require('express');
const app = express();
const host = 'localhost';
const port = 8080;

const urls = new Map();

app.use(express.json());

app.get('/', (req, res) => {
    const urlsResponse = [];
    for (const [key, value] of urls) {
        urlsResponse.push({
            "url": value,
            "shortURL": `http://${host}:${port}/${key}`
        });
    }
    return res.json(urlsResponse);
});

app.post('/', (req, res) => {
    if (!Object.keys(req.body).length || !req.body.url) return res.json('No valid url provided.');

    let id = generateRandomString(8);
    const url = req.body.url;

    while (urls.has(id)) {
        id = generateRandomString(8);
    }

    const shortenedURL = `http://${host}:${port}/${id}`;

    urls.set(id, url);

    return res.status(201).json(shortenedURL);
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    if (!req.params.id || !urls.has(id)) return res.json('Invalid id.');
    return res.redirect(urls.get(id));
});

app.listen(port, () => console.log(`Server listening on ${host}:${port}`));

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
