import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { eventsAPI } from '../services/api';
import EventCard from '../components/EventCard';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const { isAuthenticated } = useAuth();

  const categories = ['All', 'Conference', 'Workshop', 'Festival', 'Networking', 'Webinar', 'Social'];

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserRegistrations();
    }
  }, [isAuthenticated]);

  const fetchUserRegistrations = async () => {
    try {
      // Fetch all events and check which ones the user is registered for
      const response = await eventsAPI.getAll({ limit: 1000 });
      // Note: In a real app, you'd have a dedicated endpoint for user registrations
      // For now, we'll track registrations locally after user actions
    } catch (err) {
      console.error('Error fetching registrations:', err);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (selectedCategory !== 'All') filters.category = selectedCategory;
      if (searchTerm) filters.search = searchTerm;
      
      const response = await eventsAPI.getAll(filters);
      setEvents(response.events || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    if (!isAuthenticated) {
      alert('Please login to register for events');
      return;
    }

    try {
      const isRegistered = registeredEvents.includes(eventId);
      
      if (isRegistered) {
        await eventsAPI.cancelRegistration(eventId);
        setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
        alert('Registration cancelled successfully!');
      } else {
        await eventsAPI.register(eventId);
        setRegisteredEvents([...registeredEvents, eventId]);
        alert('Registration successful!');
      }
      
      // Refresh events to update registration count
      fetchEvents();
    } catch (err) {
      alert(err.message || 'Failed to update registration');
    }
  };

  return (
    <div className="events">
      <section className="events-hero">
        <div className="container">
          <h1>Discover Events</h1>
          <p>Find and register for amazing events near you</p>
        </div>
      </section>

      <section className="events-content">
        <div className="container">
          <div className="events-filters">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search events by name or location..."
                className="form-control search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <p>Loading events...</p>
            </div>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="events-stats">
                <p>Showing {events.length} {events.length === 1 ? 'event' : 'events'}</p>
              </div>

              <div className="events-grid">
                {events.length > 0 ? (
                  events.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isRegistered={registeredEvents.includes(event.id)}
                      onRegister={handleRegister}
                    />
                  ))
                ) : (
                  <div className="no-events">
                    <p>No events found matching your criteria.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
