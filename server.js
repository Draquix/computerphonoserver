//home server code

require('dotenv').config();

const express = require('express');
const app = express();
PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
let Task = require('./api/models/homeServerModel');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb')
  .catch(error => {
    console.log(error);
  });

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('pubWeb'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));


//below was suggested as error handler, but it broke everything and I think atm it 
//was a red heron.  It may be useful in a more complex setup, but in this case it
//breaks the server functions.
      // app.use(function(req, res) {
      //     res.status(404).send({url: req.originalUrl + ' not found'})
      //   });

app.get('/', homeConnectionTest);
let routes = require('./api/routes/homeServerRoutes');
routes(app);


function homeConnectionTest(req, res) {
  res.send('index.html');
}

app.listen(PORT, '0.0.0.0', function() {
  console.log('Home server booted up on port: ' + PORT);
});
