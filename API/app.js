const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exampleRouter = require('./routes/ExampleRoutes');
const http = require('http')
const PORT = 3000;
require('dotenv').config()

const app = express();

app.use(cookieParser());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// External access (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN_URL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.use('/api/example', exampleRouter);

// const httpsServer = https.createServer(app);
const httpServer = http.createServer(app);

// Connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
      // httpsServer.listen(PORT);
      httpServer.listen(PORT);
      console.log('Listening on ' + PORT)
    })
    .catch((err) => console.log(err));
