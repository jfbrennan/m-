const express = require('express');
const handlebars = require('express-handlebars');
const pkg = require('../package');

const app = express();

// Set some locals
app.locals.version = pkg.version;

// Set up template engine
app.engine('handlebars', handlebars()).set('view engine', 'handlebars');

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