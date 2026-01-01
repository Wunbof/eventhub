import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { eventsAPI } from '../services/api';
import './CreateEvent.css';

const CreateEvent = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: 'Conference',
    price: '',
    expected_attendees: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = ['Conference', 'Workshop', 'Festival', 'Networking', 'Webinar', 'Social'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Event time is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.price || formData.price < 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.expected_attendees || formData.expected_attendees < 1) {
      newErrors.expected_attendees = 'Expected attendees must be at least 1';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('Please login to create events');
      navigate('/login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const eventData = {
        ...formData,
        price: parseFloat(formData.price),
        expected_attendees: parseInt(formData.expected_attendees)
      };
      
      await eventsAPI.create(eventData);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          title: '',
          date: '',
          time: '',
          location: '',
          category: 'Conference',
          price: '',
          expected_attendees: '',
          description: ''
        });
        setSubmitted(false);
        navigate('/events');
      }, 3000);
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to create event. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
        setFormData({
          title: '',
          date: '',
          time: '',
          location: '',
          category: 'Conference',
          price: '',
          expected_attendees: '',
          description: ''
        });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="create-event">
      <section className="create-event-hero">
        <div className="container">
          <h1>Create New Event</h1>
          <p>Fill in the details to create your event</p>
        </div>
      </section>

      <section className="create-event-content">
        <div className="container">
          {submitted && (
            <div className="success-message">
              <h3>🎉 Event Created Successfully!</h3>
              <p>Your event has been created and is now live.</p>
            </div>
          )}

          {errors.submit && (
            <div className="error-message alert-error">
              {errors.submit}
            </div>
          )}

          <form className="event-form card" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Event Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`form-control ${errors.title ? 'error' : ''}`}
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <span className="error-message">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Event Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className={`form-control ${errors.date ? 'error' : ''}`}
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && <span className="error-message">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="time">Event Time *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  className={`form-control ${errors.time ? 'error' : ''}`}
                  value={formData.time}
                  onChange={handleChange}
                />
                {errors.time && <span className="error-message">{errors.time}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                className={`form-control ${errors.location ? 'error' : ''}`}
                placeholder="Enter event location"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Ticket Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className={`form-control ${errors.price ? 'error' : ''}`}
                  placeholder="0"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="expected_attendees">Expected Attendees *</label>
                <input
                  type="number"
                  id="expected_attendees"
                  name="expected_attendees"
                  className={`form-control ${errors.expected_attendees ? 'error' : ''}`}
                  placeholder="0"
                  min="1"
                  value={formData.expected_attendees}
                  onChange={handleChange}
                />
                {errors.expected_attendees && <span className="error-message">{errors.expected_attendees}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Event Description *</label>
              <textarea
                id="description"
                name="description"
                className={`form-control ${errors.description ? 'error' : ''}`}
                placeholder="Describe your event in detail..."
                rows="5"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create Event'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={loading}>
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateEvent;
