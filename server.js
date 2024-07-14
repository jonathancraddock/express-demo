const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// render with twig, and set views directory
app.set('view engine', 'twig');
app.set('views', './views');

// log all requests
app.use(logRequest);

// routes for "/"
app.get('/', (req, res) => {
    console.log('you are here: //');
    res.render('index', { title: 'Twig Welcome', message: 'Sent this wording!'});
});

// routes for "/posts/..."
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

// log the URL of each request
function logRequest(req, res, next) {
    console.log(`Request URL is: ${req.url}`);
    next();
}

app.listen(3000);