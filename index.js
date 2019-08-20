const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const leagueRoute = require('./src/route/league.route');

dotenv.config();

const app = express();

//connect to mongodb
const DB_NAME = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(DB_NAME, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send('Welcome to the League Side API');
});
app.use('/leagues', leagueRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('App running on PORT', PORT);
});
