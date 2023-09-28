const express = require('express');
const cors = require('cors')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');

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
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Initialize Passport and session management
app.use(passport.initialize());
app.use(passport.session());

// Set up Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: 'your-client-id',
      clientSecret: 'your-client-secret',
      callbackURL: 'http://localhost:3000/auth/google/callback', // Your callback URL
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
app.use('/veiculos', vehicles.router);

// Get review items route
const itemReview = require('../routes/ItemReview');
app.use('/revisao', itemReview.router);

// Define routes for authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/',
                                                                   failureRedirect: '/login'
                                                                 }));

// TODO remove it if not used
//// Protected route example
//app.get('/', (req, res) => {
//  if (req.isAuthenticated()) {
//    res.send(`Hello, ${req.user.displayName}!`);
//  } else {
//    res.redirect('/auth/google');
//  }
//});

/**************************************************************************************************/
/* Finalizing server start...                                                                     */
/**************************************************************************************************/

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
