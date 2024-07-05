const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('you are here: /');
    res.send('Hello /');
});

app.listen(3000);

