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

