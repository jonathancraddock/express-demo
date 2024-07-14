const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('you are here: //posts/');
    res.render('index', { title: 'Posts', message: 'You\'re at the root of /Posts!'});
});

router
.route('/new')
.get((req, res) => {
    console.log('you are GET\'ing here: //posts/new');
    res.render('form', { title: 'New Page' });
})
.post((req, res) => {
    console.log('you are POST\'ing here: //posts/new');
    console.log(`User submitted title of: ${req.body.title}`);
    res.json({ title: `${req.body.title}`, message: 'You posted to /posts/new'});
});

router.get('/page-one', (req, res) => {
    console.log('you are GET\'ing here: //posts/page-one');
    res.render('index', { title: 'Page One', message: 'You\'re on page one!'});
});

router.get('/page-two', (req, res) => {
    console.log('you are GET\'ing here: //posts/page-two');
    res.render('index', { title: 'Page Two', message: 'You\'re on page two'});
});

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