const express = require('express');
const { pool } = require('../config/database');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(isAdmin);

// @route   GET /api/admin/stats
// @desc    Get admin dashboard statistics
// @access  Private (Admin only)
router.get('/stats', async (req, res) => {
  try {
    // Get total users
    const [userCount] = await pool.query('SELECT COUNT(*) as total FROM users');
    
    // Get total events
    const [eventCount] = await pool.query('SELECT COUNT(*) as total FROM events');
    
    // Get total registrations
    const [regCount] = await pool.query('SELECT COUNT(*) as total FROM registrations');
    
    // Get events by category
    const [eventsByCategory] = await pool.query(
      'SELECT category, COUNT(*) as count FROM events GROUP BY category'
    );
    
    // Get recent events
    const [recentEvents] = await pool.query(
      `SELECT e.*, u.username as creator_username 
       FROM events e 
       JOIN users u ON e.created_by = u.id 
       ORDER BY e.created_at DESC 
       LIMIT 10`
    );
    
    // Get recent users
    const [recentUsers] = await pool.query(
      'SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 10'
    );

    res.json({
      success: true,
      stats: {
        totalUsers: userCount[0].total,
        totalEvents: eventCount[0].total,
        totalRegistrations: regCount[0].total,
        eventsByCategory,
        recentEvents,
        recentUsers
      }
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const [users] = await pool.query(
      `SELECT id, username, email, full_name, phone, role, created_at 
       FROM users 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [parseInt(limit), parseInt(offset)]
    );

    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM users');
    const total = countResult[0].total;

    res.json({
      success: true,
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
// @access  Private (Admin only)
router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be "user" or "admin"'
      });
    }

    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);

    res.json({
      success: true,
      message: 'User role updated successfully'
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user role'
    });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Private (Admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting yourself
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    await pool.query('DELETE FROM users WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user'
    });
  }
});

module.exports = router;

