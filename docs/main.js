const express = require('express');
const handlebars = require('express-handlebars');
const pkg = require('./package');

const app = express();
console.log(process.env.NODE_ENV)

// Set some locals
app.locals.version = pkg.version;
app.locals.devCdnUrl = 'https://unpkg.com/m-@0.0.2-alpha/dist/dev.'; // pkg.devCdnUrl
app.locals.prodCdnUrl = 'https://unpkg.com/m-@0.0.2-alpha/dist/min.'; // pkg.prodCdnUrl
app.locals.localUrl = process.env.NODE_ENV === 'development' ? '/min.' : app.locals.prodCdnUrl; // pkg.prodCdnUrl


// Set up template engine
app.engine('handlebars', handlebars()).set('view engine', 'handlebars');

// Log all requests (this must come before all middleware)
app.use((req, res, next) => {
  console.log(req.originalUrl, req.headers);
  next();
});

// Serve public files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/demo', (req, res) => res.render('demo', {layout: 'demo'}));
app.get('/examples', (req, res) => res.render('examples', {layout: 'examples'}));
app.get('/*', (req, res) => res.render(req.path.substr(1, req.path.length)));

// Start the server
app.listen(process.env.PORT || 3000, () => console.log('M- doc site started.'));