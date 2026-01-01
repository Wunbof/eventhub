import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    setLoading(false);

    if (result.success) {
      navigate('/events');
    } else {
      setErrors({ submit: result.message || 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="signup">
      <section className="signup-hero">
        <div className="container">
          <h1>Join EventHub</h1>
          <p>Create your account and start managing events</p>
        </div>
      </section>

      <section className="signup-content">
        <div className="container">
          <div className="signup-card card">
            <form onSubmit={handleSubmit}>
              {errors.submit && (
                <div className="error-message alert-error">
                  {errors.submit}
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="username">Username *</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-control ${errors.username ? 'error' : ''}`}
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <span className="error-message">{errors.username}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${errors.password ? 'error' : ''}`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="full_name">Full Name</label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className="form-control"
                    placeholder="Your full name (optional)"
                    value={formData.full_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Your phone (optional)"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>

              <div className="form-footer">
                <p>
                  Already have an account? <Link to="/login">Login here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;

