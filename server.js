const express = require('express');
const app = express();

// render with twig, and set views directory
app.set('view engine', 'twig');
app.set('views', './views');

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

app.listen(3000);

