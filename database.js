const mysql = require('mysql2');

async function createMySQLConnection() {
  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'alexa',
      password: 'alexa',
      database: 'alexa_user_db'
    });

    connection.connect((err) => {
      if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
      }
      console.log('Connected as id ' + connection.threadId);
    });

    // Return the connection for further use
    return connection;

  } catch (error) {
    console.error('Connection failed:', error);
    throw error;
  }
  //return connection;
}

// Export the function
module.exports = createMySQLConnection;
