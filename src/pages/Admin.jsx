import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import './Admin.css';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchData();
  }, [isAuthenticated, user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsResponse, usersResponse] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getUsers()
      ]);
      setStats(statsResponse.stats);
      setUsers(usersResponse.users);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminAPI.updateUserRole(userId, newRole);
      fetchData();
      alert('User role updated successfully');
    } catch (err) {
      alert(err.message || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await adminAPI.deleteUser(userId);
      fetchData();
      alert('User deleted successfully');
    } catch (err) {
      alert(err.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="admin">
        <div className="container">
          <div className="loading">Loading admin panel...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <section className="admin-hero">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Manage users, events, and view statistics</p>
        </div>
      </section>

      <section className="admin-content">
        <div className="container">
          <div className="admin-tabs">
            <button
              className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              Statistics
            </button>
            <button
              className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </div>

          {activeTab === 'stats' && stats && (
            <div className="admin-stats">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Users</h3>
                  <p className="stat-value">{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Events</h3>
                  <p className="stat-value">{stats.totalEvents}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Registrations</h3>
                  <p className="stat-value">{stats.totalRegistrations}</p>
                </div>
              </div>

              <div className="stats-section">
                <h2>Events by Category</h2>
                <div className="category-stats">
                  {stats.eventsByCategory?.map((cat) => (
                    <div key={cat.category} className="category-stat-item">
                      <span className="category-name">{cat.category}</span>
                      <span className="category-count">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="stats-section">
                <h2>Recent Events</h2>
                <div className="recent-list">
                  {stats.recentEvents?.map((event) => (
                    <div key={event.id} className="recent-item">
                      <div>
                        <strong>{event.title}</strong>
                        <p>Created by: {event.creator_username}</p>
                      </div>
                      <span className="date">{new Date(event.created_at).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="admin-users">
              <h2>All Users</h2>
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Full Name</th>
                      <th>Role</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.full_name || '-'}</td>
                        <td>
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td>{new Date(u.created_at).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn-danger btn-sm"
                            onClick={() => handleDeleteUser(u.id)}
                            disabled={u.id === user?.id}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;

