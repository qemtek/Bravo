const pgp = require('pg-promise')();
const config = require('./config'); // Import your configuration file

const dbConfig = {
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  user: config.database.user,
  password: config.database.password,
};

const db = pgp(dbConfig);

// Function to get a user by their email
function getUserByEmail(email) {
  return db.oneOrNone('SELECT * FROM users WHERE email = $1', email);
}

// Function to create a new user
function createUser(email, password) {
  return db.one('INSERT INTO users(email, password) VALUES($1, $2) RETURNING id', [email, password]);
}

// Function to get a user by their ID
function getUserById(userId) {
  return db.oneOrNone('SELECT * FROM users WHERE id = $1', userId);
}

function updateUserProfile(userId, updatedProfile) {
  // Implement an SQL query to update the user's profile information in the database
}

function changeUserPassword(userId, newPassword) {
  // Implement an SQL query to update the user's password in the database
}

function addUserRole(userId, role) {
  // Implement an SQL query to add a role for the user in the database
}

function getUserSessions(userId) {
  // Implement an SQL query to retrieve sessions associated with a user
}

function getUserReviewsAndRatings(userId) {
  // Implement an SQL query to retrieve reviews and ratings for a user
}

function getUserPaymentTransactions(userId) {
  // Implement an SQL query to retrieve payment transaction history for a user
}

function deleteUserAccount(userId) {
  // Implement an SQL query to delete a user's account and related data
}

function getUsersPage(pageNumber, pageSize) {
  // Implement an SQL query with pagination using LIMIT and OFFSET
}

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
};
