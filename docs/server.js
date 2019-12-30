const express = require('express');
const handlebars = require('express-handlebars');
const pkg = require('../package');

const app = express();

// Set some locals
app.locals.version = pkg.version;
app.locals.devCdnUrl = 'https://cdnjs.com/m-/1.0.0/dev.'; // pkg.devCdnUrl
app.locals.prodCdnUrl = 'https://cdnjs.com/m-/1.0.0/min.'; // pkg.prodCdnUrl

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
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/*', (req, res) => {
  const viewPath = req.path.substr(1, req.path.length);
  res.render(viewPath);
});

// Start the server
app.listen(3000, () => console.log(`Doc site started.`));