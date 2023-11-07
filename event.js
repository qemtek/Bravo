// events.js
const db = require('./database'); // Import your database module

// Function to create a new event
function createEvent(eventData) {
  return db.one(
    'INSERT INTO events (name, date, time, location, description) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [eventData.name, eventData.date, eventData.time, eventData.location, eventData.description]
  );
}

// Function to update an event
function updateEvent(eventId, updatedData) {
  const { name, date, time, location, description } = updatedData;

  return db.none(
    'UPDATE events SET name = $1, date = $2, time = $3, location = $4, description = $5 WHERE id = $6',
    [name, date, time, location, description, eventId]
  );
}

// Function to delete an event
function deleteEvent(eventId) {
  return db.none('DELETE FROM events WHERE id = $1', eventId);
}

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
};
