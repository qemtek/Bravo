const { Client } = require('pg');


function createTable(createTableQuery) {
    // Create a new PostgreSQL client
    const client = new Client({
      user: 'christophercollins', // Your PostgreSQL username
      host: 'localhost',     // Your PostgreSQL server host
      database: 'bravodb', // Your database name
      port: 5432,            // Default PostgreSQL port
      dataPath: 'postgres', // Custom data directory path
    });
  // Connect to the database
  client.connect()
    .then(() => {
      console.log('Connected to the database');
      // Execute the query to create the events table
      return client.query(createTableQuery);
    })
    .then(() => {
      console.log('Events table created successfully');
    })
    .catch(error => {
      console.error('Error creating events table:', error);
    })
    .finally(() => {
      // Disconnect from the database
      client.end();
    });
};


function createEventsTable() {
    // Define the SQL query to create the events table
  const eventsTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id serial PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      location VARCHAR(255) NOT NULL,
      description TEXT
    );
  `;
  createTable(eventsTableQuery);
}

function createUsersTable() {
  // Define the SQL query to create the users table
  const usersTableQuery = `
    CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      user_role VARCHAR(50) NOT NULL,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      profile_picture_url TEXT,
      date_of_birth DATE,
      -- Additional user profile information
    );
  `; // Closing backtick corrected
  createTable(usersTableQuery);
}


function createEventOrganizersTable() {
    const eventOrganizersTableQuery = `
        CREATE TABLE event_organizers (
            organizer_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) NOT NULL,
            -- Organizer-specific attributes
            contact_information VARCHAR(255),
            organization_name VARCHAR(255),
            event_management_history TEXT,
        );
    `;
    createTable(eventOrganizersTableQuery);
}


function createPerformersTable() {
    const performersTableQuery = `
        CREATE TABLE performers (
            performer_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) NOT NULL,
            -- Performer-specific attributes
            genre VARCHAR(50),
            skills TEXT,
            experience TEXT,
            performance_history TEXT,
        );
    `;
    createTable(performersTableQuery);
}


function createAttendeesTable() {
    const attendeesTableQuery = `
        CREATE TABLE attendees (
            attendee_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(user_id) NOT NULL,
            -- Attendee-specific attributes
            payment_preferences TEXT,
            billing_information TEXT,
            attendance_history TEXT,
        );
    `;
    createTable(attendeesTableQuery);
}


function createPaymentsTable() {
    const paymentsTableQuery = `
        CREATE TABLE payments (
            payment_id SERIAL PRIMARY KEY,
            sender_id INT REFERENCES users(user_id) NOT NULL,
            receiver_id INT REFERENCES users(user_id) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            payment_date TIMESTAMP NOT NULL,
            payment_description TEXT,
        );
    `;
    createTable(paymentsTableQuery);
}


function createReviewsTable() {
    const reviewsTableQuery = `
        CREATE TABLE reviews (
            review_id SERIAL PRIMARY KEY,
            reviewer_id INT REFERENCES users(user_id) NOT NULL,
            target_id INT NOT NULL,
            rating INT NOT NULL,
            review_text TEXT,
            review_date TIMESTAMP NOT NULL,
        );
    `;
    createTable(reviewsTableQuery);
}


function createNotificationsTable() {
    const notificationsTableQuery = `
        CREATE TABLE notifications (
            notification_id SERIAL PRIMARY KEY,
            recipient_id INT REFERENCES users(user_id) NOT NULL,
            sender_id INT REFERENCES users(user_id) NOT NULL,
            notification_type VARCHAR(50) NOT NULL,
            notification_content TEXT,
            notification_date TIMESTAMP NOT NULL,
        );
    `;
    createTable(notificationsTableQuery);
}


// Call the function to create the events table
createEventsTable();
createUsersTable();
createEventOrganizersTable();
createPerformersTable();
createAttendeesTable();
createPaymentsTable();
createReviewsTable();
createNotificationsTable();