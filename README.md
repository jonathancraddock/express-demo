# express-demo
(following an express tutorial)

## Notes

Install NodeJS.

In VSCode, clone the repo into a working folder.

* Ctrl+Shift+P for command palette
* `git: clone`
* I'm using this empty (so far!) repo `https://github.com/jonathancraddock/express-demo`
* Point at projects folder
* Clone and add to workspace

Terminal, in folder. Init to initialise the project, creating `package.json`.
```dos
npm init -y
```

Then install express and nodemon:
```dos
npm i express
npm i --save-dev nodemon
```

Update scripts section of package.json as follows:

```js
  "scripts": {
    "devStart": "nodemon server.js"
```

Create the file `server.js` in the root of the project.

At the terminal:
```dos
npm run devStart
```

Test the auto-restart feature by adding code to server.js:

```js
console.log('hello');
```

...and "hello" appears in the terminal.

Basic setup in server.js :

```js
const express = require('express');
const app = express();

app.listen(3000);
```

At this point you can try the URL in a local browser.

* http://localhost:3000/

Returns "Cannot GET /" because you have not set up any routes yet. Create a route in server.js.

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('you are here: /');
    res.send('Hello /');
});

app.listen(3000);
```

* `req` - request
* `res` - response
* `next` - only needed for specific requests

To set a status:

```js
app.get('/', (req, res) => {
    console.log('you are here: /');
    res.status(500).send('Nope!!');
});
```

Note, the headers (in this case a status) has to be the first thing sent to the client, and you can't set it after you've already sent some other message.

In the same way, you could send a status and some json. If you omit the `status` it will be a default 200.

```js
res.status(500).json({ message: 'Nope!!' });
```

Or, download a file, relative to the current path.

```js
res.download('server.js');
```

More common will be the response to "render" a file/template. The default practice is to store all files in a folder called `views`. Testing here with TWIG.

```dos
npm install twig
```

And modify server.js to set the rendering engine and path.

```js
const express = require('express');
const app = express();

// render with twig, and set views directory
app.set('view engine', 'twig');
app.set('views', './views');

app.get('/', (req, res) => {
    console.log('you are here: /');
    res.render('index');
});

app.listen(3000);
```

Then:

```dos
npm run devStart
```

Then create a file, `./views/index.twig`.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Web Page</title>
</head>
<body>

    <h1>Welcome</h1>

    <p>Nothing to see here.</p>

</body>
</html>
```

To pass values to the template, modify index using moustache style markup:

```twig
<!DOCTYPE html>
<html>
<head>
    <title>Web Page</title>
</head>
<body>

    <h1>{{title}}</h1>
    <p>{{message}}</p>

</body>
</html>
```

And add some json to the render command:

```js
const express = require('express');
const app = express();

// render with twig, and set views directory
app.set('view engine', 'twig');
app.set('views', './views');

app.get('/', (req, res) => {
    console.log('you are here: /');
    res.render('index', { title: 'Twig Welcome', message: 'Sent this wording!'});
});

app.listen(3000);
```

And for slightly more robust behaviour in case of a missing value:

```twig
    <h1>{{ title|default('Default title')|e }}</h1>
    <p>{{ message|default('Default Message!')|e }}</p>
```

The `|e` escapes any potentially unsafe characters.

To add extra routes, modify the `server.js` file:

```js
app.get('/', (req, res) => {
    console.log('you are here: //');
    res.render('index', { title: 'Twig Welcome', message: 'Sent this wording!'});
});

app.get('/posts/page-one', (req, res) => {
    console.log('you are here: //posts/page-one');
    res.render('index', { title: 'Page One', message: 'You\'re on page one!'});
});

app.get('/posts/page-two', (req, res) => {
    console.log('you are here: //posts/page-two');
    res.render('index', { title: 'Page Two', message: 'You\'re on page two'});
});
```

But, those routes can me moved into their own file. The convention is a sub-folder `routes`. In this example, `routes/posts.js` because this route will deal with everything in the `/posts/` path. Step one, move the routes from server to posts. The framework is as follows:

```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('you are here: //posts/');
    res.render('index', { title: 'Posts', message: 'You\'re at the root of /Posts!'});
});

router.get('/page-one', (req, res) => {
    console.log('you are here: //posts/page-one');
    res.render('index', { title: 'Page One', message: 'You\'re on page one!'});
});

router.get('/page-two', (req, res) => {
    console.log('you are here: //posts/page-two');
    res.render('index', { title: 'Page Two', message: 'You\'re on page two'});
});

module.exports = router;
```

Modify the `server.js` file to use these routes:

```js
const express = require('express');
const app = express();

// render with twig, and set views directory
app.set('view engine', 'twig');
app.set('views', './views');

app.get('/', (req, res) => {
    console.log('you are here: //');
    res.render('index', { title: 'Twig Welcome', message: 'Sent this wording!'});
});

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

app.listen(3000);
```

To be able to serve static files/routes (CSS files for example) create a `public` subfolder to contain all your CSS, JS, etc.

your-project/  
├── public/  
│   └── css/  
│       ├── bulma.min.css  
│       └── all.min.css  
├── views/  
│   └── index.twig  
├── app.js (or server.js)  
└── package.json  

This requires `path` in `server.js`.

```js
const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// render with twig, and set views directory
app.set('view engine', 'twig');
app.set('views', './views');

app.get('/', (req, res) => {
    console.log('you are here: //');
    res.render('index', { title: 'Twig Welcome', message: 'Sent this wording!'});
});

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

app.listen(3000);
```

Modify the `index.twig` template to reference the CSS.

```twig
<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title|default('Default Title')|e }}</title>
    <link rel="stylesheet" href="/css/bulma.min.css">
    <link rel="stylesheet" href="/css/all.min.css">
</head>

<body>

<section class="section">
<div class="container">
    <h1 class="title">{{ title|default('Default Title')|e }}</h1>
    <p>{{ message|default('Default Message!')|e }}</p>
</div> <!-- /container ->
</section>

</body>
</html>
```

To create a dynamic route, use a `:` to indicate the dynamic part of the URL. (Note the use of backticks!!) For example:

```js
router.get('/id/:pageid', (req, res) => {
    console.log(`you are here: //posts/id/${req.params.pageid}`);
    res.render('index', { title: 'Request For...', message: `You're asking for ${req.params.pageid}`});
});
```

For more advanced routing, you can group requests - for example, a GET and a POST. This example is a modification to `posts.js`.

```js
router
.route('/id/:pageid')
.get((req, res) => {
    console.log(`you are GET'ing here: //posts/id/${req.params.pageid}`);
    res.render('index', { title: 'Request For...', message: `You're asking for ${req.params.pageid}`})
})
.post((req, res) => {
    console.log(`you are POST'ing here: //posts/id/${req.params.pageid}`);
    res.json({ title: 'Request For...', message: `You're asking for ${req.params.pageid}`})
});
```

As a form of middleware, `router.param` runs before the route. For example, `router.param('id'...)` would run between the request and the response. In the file `posts.js` this code is inserted before the `module.exports` and echoes the ID to the console:

```js
router
.route('/id/:pageid')
.get((req, res) => {
    console.log(`you are GET'ing here: //posts/id/${req.params.pageid}`);
    res.render('index', { title: 'Request For...', message: `You're asking for ${req.params.pageid}`})
})
.post((req, res) => {
    console.log(`you are POST'ing here: //posts/id/${req.params.pageid}`);
    res.json({ title: 'Request For...', message: `You're asking for ${req.params.pageid}`})
});

router.param('pageid', (req, res, next, id) => {
    console.log(`router param : ${id}`);
    next();
});

module.exports = router;
```

Another example, to log all URLs requested, with theses additions to `server.js`:

```js
// log all requests
app.use(logRequest);

// routes
...

function logRequest(req, res, next) {
    console.log(`Request URL is: ${req.url}`);
    next();
}
```

