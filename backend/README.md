# EventHub Backend API

This is the backend API server for the EventHub Event Management System.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp env.example .env
   ```
   Then edit `.env` with your database credentials.

3. Make sure MySQL is running and create the database:
   ```sql
   CREATE DATABASE eventhub_db;
   ```

4. Start the server:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

The server will automatically create all necessary database tables on first run.

## API Documentation

See the main README.md for complete API endpoint documentation.

## Environment Variables

Required:
- `DB_HOST` - MySQL host (default: localhost)
- `DB_USER` - MySQL username (default: root)
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name (default: eventhub_db)
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

Optional:
- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` - For email notifications
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` - For SMS notifications

## Database Schema

The database schema is automatically created when the server starts. See the main README.md for schema details.

## Testing

You can test the API using:
- Postman
- curl
- Any HTTP client

Example:
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

