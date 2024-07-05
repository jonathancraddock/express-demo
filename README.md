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

