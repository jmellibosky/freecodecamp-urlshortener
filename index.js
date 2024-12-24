require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let dns = require('dns');
let bodyParser = require('body-parser')
const shortened_urls = [];

app.use(bodyParser.urlencoded({extended: false}));


// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.post("/api/shorturl", (req, res) => {
  if (!req.body.url.startsWith("http")) {
    res.json({error: "invalid url"});
  } else {
    shortened_urls.push(req.body.url)
    console.log({original_url: req.body.url, short_url: shortened_urls.length - 1});
    res.json({original_url: req.body.url, short_url: shortened_urls.length - 1});
  }
});

app.use("/api/shorturl/:shorturl", (req, res) => {
  res.redirect(shortened_urls[req.params.shorturl]);
});
