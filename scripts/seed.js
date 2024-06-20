
  /* import 'dotenv/config';
import { db } from '@vercel/postgres';

async function createTable() {
  const client = await db.connect();
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS actions (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        action VARCHAR(50) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        details JSONB,
        FOREIGN KEY (user_id) REFERENCES authusers(id)
      );
    `;
    console.log('Table "user_actions" created successfully.');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    client.release();
  } 
}


createTable();*/
