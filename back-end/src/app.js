const express = require('express');
const cors = require('cors')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const { generateToken } = require('./authentication.js')
require('dotenv').config();

const MemoryStore = require('memorystore')(session);




CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;
/**************************************************************************************************/
/* Server Configuration                                                                           */
/**************************************************************************************************/

// Initialize express
const app = express();

// Configure CORS in order to allow Cross-Origin Resource Sharing with front end server
app.use(cors());

// Configure body parser for JSON requests
app.use(bodyParser.json());

/**************************************************************************************************/
/* Authentication                                                                                 */
/**************************************************************************************************/

// Configure session middleware
//app.use(session({
//  secret: 'your-secret-key',
//  resave: false,
//  saveUninitialized: true,
//  cookie: {
//    secure: true,
//    token: '',
//    maxAge: (60 * 60 *1000),
//  },
//}));

app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    secret: 'keyboard cat'
}))

// Initialize Passport and session management
app.use(passport.initialize());
app.use(passport.session());

// Set up Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['profile', 'email']
    },
    (accessToken, refreshToken, profile, done) => {
      // This callback is called after successful authentication.
      // You can create or update a user in your database here.
      // For simplicity, we'll just return the user profile.
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

/**************************************************************************************************/
/* Routes                                                                                         */
/**************************************************************************************************/

// Get vehicles route
const vehicles = require('../routes/Vehicles');
app.use('/vehicles', vehicles.router);

// Get review items route
const itemReview = require('../routes/ItemReview');
app.use('/maintenances', itemReview.router);

let userId = 1;
app.get('/auth/ok',  async(req, res) => {
  req.session.token = generateToken(userId);
  console.log(req.session);
  res.redirect("http://localhost:4200/menu");
});

// Define routes for authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: 'http://localhost:3000/auth/ok',
                                                                   failureRedirect: '/error'
                                                                 }));

app.get('/auth/getToken/:user',  async(req, res) => {
  res.status(200).json({"token" : generateToken(req.params.user)});
});



/**************************************************************************************************/
/* Finalizing server start...                                                                     */
/**************************************************************************************************/

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
