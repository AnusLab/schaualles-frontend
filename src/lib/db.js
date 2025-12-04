import mysql from 'mysql2/promise';

// Database connection configuration
const dbConfig = {
  uri: 'mysql://mysql:f584b401e07b0dcaee8a@vhi09o.easypanel.host:6914/allesschauen',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Add SSL if required by the host, usually for external connections
  ssl: {
    rejectUnauthorized: false
  }
};

// Create a connection pool
const pool = mysql.createPool({
  uri: dbConfig.uri,
  waitForConnections: dbConfig.waitForConnections,
  connectionLimit: dbConfig.connectionLimit,
  queueLimit: dbConfig.queueLimit,
  ssl: dbConfig.ssl
});

// Export a helper function to query the database
export async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export default pool;
