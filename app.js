const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./auth'); // Import your authentication module
const eventsRoutes = require('./events'); // Import the event module
const paymentsRoutes = require('./payments'); // Import your payments module
const db = require('./database'); // Import your database module

const app = express();

app.use(bodyParser.json()); // Middleware for parsing JSON requests

// Mount your authentication routes
app.use('/auth', authRoutes);

// Mount your session management routes
app.use('/events', eventsRoutes);

// Mount your payment routes
app.use('/payments', paymentsRoutes);

// Define other routes, middleware, and configurations as needed

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
