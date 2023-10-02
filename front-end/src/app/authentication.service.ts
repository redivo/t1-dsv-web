import * as jwt from 'jsonwebtoken';


type User = {
  id: string
}

const SK = "your-secret-key";

// generate is create in the client-side (front), but I put here to show the Logic
export function generateToken(user: User) {
  const payload = {
    userId: user.id,
    // Add any other relevant user data to the payload
  };
  
  return jwt.sign(payload, SK, { expiresIn: '1h' }); // Token expires in 1 hour
}