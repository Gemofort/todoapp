# Simple TODO app

Hey, I am Vanya Feofanov and that's mine simple vision of todo app on node.js, using Express and MongoDB

To start a server just type 

## npm run dev

in your terminal.

## App file

```js
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
```

### Routing system

For rouing system I have a folder with Routers called 'routes' and folder with controllers called 'controllers',

where the callbacks are.


Let's look at the example:

### /routes/index.js

```js
const express = require('express');
const router = express.Router();

const { loadMainpage, addTask } = require('../controllers/mainpage');
const { taskDone } = require('../controllers/done');
const { taskDelete } = require('../controllers/deleted');
const { undoDone } = require('../controllers/undo');

router.get('/', loadMainpage);

router.post('/', addTask);

router.post('/:id/completed', taskDone);

router.post('/:id/deleted', taskDelete);

router.post('/:id/undo', undoDone);

module.exports = router;
```

And it's controllers for example

### /controllers/done.js

```js
const Task = require('../models/Task');

const taskDone = async (req, res) => {
  let doc = await Task.findOne({ _id: req.params.id });

  doc.done = true;
  doc.save()
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      res.send('ooooopsie something went wrong');
    });
};

module.exports = { taskDone };
```

## Database

I am using MongoDB Atlas (could database from mongo) and Mongoose for easier using

### Connecting to database

Connecting goes through URI which I have in my '/config/keys.js'

```js
module.exports = {
  MongoURI: 'mongodb+srv://Nickname:password@test-cluster-vvyof.mongodb.net/test?retryWrites=true'
}
```
in 'app.js' it looks like

```js
/* Connect to mongo */
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Mongo db connected');
  })
  .catch(err => {
    console.log(err);
  });
```

### EJS

I also use ejs, simple templating language that lets you generate HTML markup with plain JavaScript.

There is example of code in 'views' folder

```html
<ul class="todoList">
  <% for(var i=0; i < notDone.length; i++) { %>
  <li class="m-2">
    <span style="font-family: 'Questrial', sans-serif; font-size: 20px;"><%= notDone[i].name %></span>
    <form action="/<%= notDone[i]._id %>/completed" method="POST" style="display: inline;">
      <button type="submit" class="doneButton"><i class="fas fa-check fa-lg"></i></button>
    </form>
    <form action="/<%= notDone[i]._id %>/deleted" method="POST" style="display: inline;">
      <button type="submit" class="delButton"><i class="fas fa-times fa-lg"></i></button>
    </form>
  </li>
  <% } %>
</ul>
```
This peace creates a list of tasks to do, which we get from notDone array.


## My social links

* [Facebook](https://www.facebook.com/profile.php?id=100005922974355) 
* [LinkedIn](https://www.linkedin.com/in/ivan-feofanov-0142b2163/) 


