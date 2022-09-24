let express = require('express');
const puppeteer = require("puppeteer");

let app = express();

let browserPromise = puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: [
        '--no-sandbox',
    ]
});


app.get('/', async (req, res) => {
    const url = req.query.url || 'http://example.com';

    const browser = await browserPromise;
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.goto(url);

    const image = await page.screenshot();

    res.setHeader('Content-Type', 'image/png');
    res.send(image);

    context.close()
});


app.listen(3000, () => {

    console.log('Example app listening on port 3000!');

});
