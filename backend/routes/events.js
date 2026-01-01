const express = require('express');
const { pool } = require('../config/database');
const { authenticate } = require('../middleware/auth');
const { validateEvent } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events (with optional filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        e.*,
        u.username as creator_username,
        u.full_name as creator_name,
        COUNT(DISTINCT r.id) as registered_count
      FROM events e
      LEFT JOIN users u ON e.created_by = u.id
      LEFT JOIN registrations r ON e.id = r.event_id
      WHERE 1=1
    `;
    const params = [];

    if (category && category !== 'All') {
      query += ' AND e.category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (e.title LIKE ? OR e.location LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' GROUP BY e.id ORDER BY e.date ASC, e.time ASC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [events] = await pool.query(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM events WHERE 1=1';
    const countParams = [];

    if (category && category !== 'All') {
      countQuery += ' AND category = ?';
      countParams.push(category);
    }

    if (search) {
      countQuery += ' AND (title LIKE ? OR location LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }

    const [countResult] = await pool.query(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      events,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching events'
    });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [events] = await pool.query(
      `SELECT 
        e.*,
        u.username as creator_username,
        u.full_name as creator_name,
        COUNT(DISTINCT r.id) as registered_count
      FROM events e
      LEFT JOIN users u ON e.created_by = u.id
      LEFT JOIN registrations r ON e.id = r.event_id
      WHERE e.id = ?
      GROUP BY e.id`,
      [id]
    );

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      event: events[0]
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching event'
    });
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private
router.post('/', authenticate, validateEvent, async (req, res) => {
  try {
    const { title, description, category, date, time, location, price, expected_attendees } = req.body;

    const [result] = await pool.query(
      `INSERT INTO events (title, description, category, date, time, location, price, expected_attendees, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, category, date, time, location, price, expected_attendees, req.user.id]
    );

    const [events] = await pool.query(
      `SELECT 
        e.*,
        u.username as creator_username,
        u.full_name as creator_name,
        0 as registered_count
      FROM events e
      LEFT JOIN users u ON e.created_by = u.id
      WHERE e.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: events[0]
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating event'
    });
  }
});

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (only creator or admin)
router.put('/:id', authenticate, validateEvent, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, date, time, location, price, expected_attendees } = req.body;

    // Check if event exists and user has permission
    const [events] = await pool.query(
      'SELECT created_by FROM events WHERE id = ?',
      [id]
    );

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (events[0].created_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this event'
      });
    }

    await pool.query(
      `UPDATE events 
       SET title = ?, description = ?, category = ?, date = ?, time = ?, location = ?, price = ?, expected_attendees = ?
       WHERE id = ?`,
      [title, description, category, date, time, location, price, expected_attendees, id]
    );

    const [updatedEvents] = await pool.query(
      `SELECT 
        e.*,
        u.username as creator_username,
        u.full_name as creator_name,
        COUNT(DISTINCT r.id) as registered_count
      FROM events e
      LEFT JOIN users u ON e.created_by = u.id
      LEFT JOIN registrations r ON e.id = r.event_id
      WHERE e.id = ?
      GROUP BY e.id`,
      [id]
    );

    res.json({
      success: true,
      message: 'Event updated successfully',
      event: updatedEvents[0]
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating event'
    });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (only creator or admin)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if event exists and user has permission
    const [events] = await pool.query(
      'SELECT created_by FROM events WHERE id = ?',
      [id]
    );

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (events[0].created_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to delete this event'
      });
    }

    await pool.query('DELETE FROM events WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting event'
    });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register for an event
// @access  Private
router.post('/:id/register', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if event exists
    const [events] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if already registered
    const [registrations] = await pool.query(
      'SELECT * FROM registrations WHERE user_id = ? AND event_id = ?',
      [userId, id]
    );

    if (registrations.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event'
      });
    }

    // Register for event
    await pool.query(
      'INSERT INTO registrations (user_id, event_id) VALUES (?, ?)',
      [userId, id]
    );

    res.status(201).json({
      success: true,
      message: 'Successfully registered for the event'
    });
  } catch (error) {
    console.error('Register for event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while registering for event'
    });
  }
});

// @route   DELETE /api/events/:id/register
// @desc    Cancel event registration
// @access  Private
router.delete('/:id/register', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if registered
    const [registrations] = await pool.query(
      'SELECT * FROM registrations WHERE user_id = ? AND event_id = ?',
      [userId, id]
    );

    if (registrations.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'You are not registered for this event'
      });
    }

    // Cancel registration
    await pool.query(
      'DELETE FROM registrations WHERE user_id = ? AND event_id = ?',
      [userId, id]
    );

    res.json({
      success: true,
      message: 'Registration cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while cancelling registration'
    });
  }
});

// @route   GET /api/events/:id/registrations
// @desc    Get event registrations (for event creator or admin)
// @access  Private
router.get('/:id/registrations', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if event exists and user has permission
    const [events] = await pool.query(
      'SELECT created_by FROM events WHERE id = ?',
      [id]
    );

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (events[0].created_by !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view registrations for this event'
      });
    }

    const [registrations] = await pool.query(
      `SELECT 
        r.*,
        u.username,
        u.email,
        u.full_name,
        u.phone
      FROM registrations r
      JOIN users u ON r.user_id = u.id
      WHERE r.event_id = ?
      ORDER BY r.registered_at DESC`,
      [id]
    );

    res.json({
      success: true,
      registrations
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching registrations'
    });
  }
});

module.exports = router;

