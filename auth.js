const express = require('express');
const { check, validationResult } = require('express-validator');  // from express-validator import check, validationResult
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database'); // Import your database module
const { JWT_SECRET } = require('./config'); // Import your secret key (usually stored in a separate configuration file)

const router = express.Router();

// User registration route
router.post('/register', [
  // Input validation using Express Validator
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({ min: 6 }),
//  The last parameter is the route handler function, which is responsible for
//  handling the actual processing of the POST request. This function is executed
//  after any middleware functions, and it typically sends a response to the client.
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {  //If there are no errors, continue
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract email and password from body
  const { email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await db.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the user's password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user to the database
    await db.createUser(email, hashedPassword);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await db.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token for authentication
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;

