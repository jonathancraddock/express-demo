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