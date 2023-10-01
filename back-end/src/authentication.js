const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';


// generate is create in the client-side (front), but I put here to show the Logic
function generateToken(user) {
  const payload = {
    userId: user.id,
    // Add any other relevant user data to the payload
  };

  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}



function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null; // Token is invalid
  }
}

// guys, this is our middleware to pass in every single route
const requireAuthentication = function (req, res, next) {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if the token is present and valid
  if (token) {
    const user = verifyToken(token.replace('Bearer ', '')); // Remove 'Bearer ' from the token string
    if (user) {
      req.user = user; // Set user data on the request object
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized - Token missing' });
  }
}

exports.requireAuthentication = requireAuthentication;