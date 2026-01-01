-- Sample Data for EventHub Database
-- This script inserts sample data for testing purposes
-- Run this AFTER running setup.sql

USE eventhub_db;

-- Insert sample users
-- Note: Passwords are hashed using bcrypt. These are example hashes.
-- In production, passwords should be hashed through the API registration endpoint.

-- Sample user 1 (password: password123)
INSERT INTO users (username, email, password, full_name, phone, role) 
VALUES 
('john_doe', 'john@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'John Doe', '123-456-7890', 'user'),
('jane_smith', 'jane@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Jane Smith', '123-456-7891', 'user'),
('admin_user', 'admin@eventhub.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin User', '123-456-7892', 'admin')
ON DUPLICATE KEY UPDATE username=username;

-- Get user IDs for creating events
SET @john_id = (SELECT id FROM users WHERE username = 'john_doe' LIMIT 1);
SET @jane_id = (SELECT id FROM users WHERE username = 'jane_smith' LIMIT 1);
SET @admin_id = (SELECT id FROM users WHERE username = 'admin_user' LIMIT 1);

-- Insert sample events
INSERT INTO events (title, description, category, date, time, location, price, expected_attendees, created_by) 
VALUES 
('Tech Conference 2025', 'Join industry leaders for the biggest tech conference of the year. Learn about the latest technologies and network with professionals.', 'Conference', '2025-12-15', '09:00:00', 'San Francisco, CA', 199.00, 250, @john_id),
('Digital Marketing Workshop', 'Learn the latest digital marketing strategies from experts. Hands-on sessions and real-world case studies.', 'Workshop', '2025-12-20', '14:00:00', 'New York, NY', 79.00, 50, @jane_id),
('Music Festival 2025', 'Experience live performances from top artists. A weekend full of music, food, and fun!', 'Festival', '2025-12-28', '18:00:00', 'Los Angeles, CA', 150.00, 5000, @admin_id),
('Startup Pitch Night', 'Watch innovative startups pitch their ideas to investors. Great networking opportunity!', 'Networking', '2025-12-10', '19:00:00', 'Austin, TX', 25.00, 100, @john_id),
('Photography Masterclass', 'Master photography techniques with professional photographers. Bring your camera!', 'Workshop', '2025-12-18', '10:00:00', 'Seattle, WA', 120.00, 30, @jane_id),
('Food & Wine Expo', 'Taste exquisite foods and wines from around the world. Culinary experience like no other.', 'Festival', '2025-12-22', '12:00:00', 'Chicago, IL', 45.00, 800, @admin_id)
ON DUPLICATE KEY UPDATE title=title;

-- Note: The password hash above is for 'password123' 
-- In a real scenario, you should register users through the API to get proper password hashing

-- Success message
SELECT 'Sample data inserted successfully!' AS message;
SELECT 'You can now login with:' AS info;
SELECT 'Email: john@example.com, Password: password123' AS credentials;
SELECT 'Email: jane@example.com, Password: password123' AS credentials;
SELECT 'Email: admin@eventhub.com, Password: password123 (Admin)' AS credentials;

