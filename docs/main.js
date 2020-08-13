const express = require('express');
const handlebars = require('express-handlebars');
const pkg = require('./package');

// Create the server
const app = express();

// Set some locals
app.locals.version = pkg.version;
app.locals.devCdnUrl = `https://unpkg.com/m-@${pkg.version}/dist/dev.`;
app.locals.prodCdnUrl = `https://unpkg.com/m-@${pkg.version}/dist/min.`;
app.locals.localUrl = process.env.NODE_ENV === 'development' ? '/min.' : app.locals.prodCdnUrl;

// Set up template engine
app.engine('handlebars', handlebars()).set('view engine', 'handlebars');

// Log all requests
app.use((req, res, next) => {
  console.log(req.originalUrl, req.headers);
  next();
});

// Serve public files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/demo', (req, res) => res.render('demo', {layout: 'demo'}));
app.get('/examples/{example}', (req, res) => res.render(`examples/${req.params.example}`, {layout: 'demo'}));
app.get('/examples', (req, res) => res.render('examples', {layout: 'examples'}));
app.get('/*', (req, res) => res.render(req.path.substr(1, req.path.length)));

// Start the server
app.listen(3000, () => console.log(`M- doc site running at localhost:3000 with process.env.NODE_ENV=${process.env.NODE_ENV}.`));