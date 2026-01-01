import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate('/events');
    } else {
      setErrors({ submit: result.message || 'Login failed. Please try again.' });
    }
  };

  return (
    <div className="login">
      <section className="login-hero">
        <div className="container">
          <h1>Welcome Back</h1>
          <p>Login to your EventHub account</p>
        </div>
      </section>

      <section className="login-content">
        <div className="container">
          <div className="login-card card">
            <form onSubmit={handleSubmit}>
              {errors.submit && (
                <div className="error-message alert-error">
                  {errors.submit}
                </div>
              )}

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

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div className="form-footer">
                <p>
                  Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

