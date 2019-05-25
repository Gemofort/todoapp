const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

/* DB config*/
const db = require('./config/keys.js').MongoURI;

/* Connect to mongo */
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Mongo db connected');
  })
  .catch(err => {
    console.log(err);
  });

/* ejs */
app.use(expressLayouts);
app.set('view engine', 'ejs');

/* bodyparser */
app.use(express.urlencoded({ extended: false }));

/* Express session */
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

/* Connect public folder */
app.use(express.static(__dirname + '/public'));

/* Routes */
app.use('/', require('./routes/index.js'));
app.use('/deleted', require('./routes/deldone.js'));
app.use('/search', require('./routes/search.js'));

const PORT = process.env.PORT || 2000;

app.listen(PORT, console.log(`Server started on ${PORT}`));

