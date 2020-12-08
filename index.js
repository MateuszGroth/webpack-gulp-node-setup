require('dotenv').config();
//process.env.NAME
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

const port = process.env.PORT || 3333;

app.set('view engine', 'ejs');
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(port, () => {
    console.log('LISTENING ON PORT ' + port);
});
