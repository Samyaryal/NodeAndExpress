const express = require('express');
const passport = reequire('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(new GoogleStrategy()); // create new instances of the google passport strategy

const PORT = process.env.PORT || 5001;
app.listen(PORT);

