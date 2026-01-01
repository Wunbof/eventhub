import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    {
      id: 1,
      icon: '📅',
      title: 'Easy Scheduling',
      description: 'Create and manage events with our intuitive scheduling system'
    },
    {
      id: 2,
      icon: '🎫',
      title: 'Ticketing System',
      description: 'Seamless registration and ticketing for all your events'
    },
    {
      id: 3,
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Track attendance, engagement, and event performance'
    },
    {
      id: 4,
      icon: '🔔',
      title: 'Notifications',
      description: 'Keep attendees updated with automated notifications'
    }
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to EventHub</h1>
            <p className="hero-subtitle">
              Your All-in-One Platform for Event Management
            </p>
            <p className="hero-description">
              Create, manage, and register for events seamlessly. Perfect for conferences,
              workshops, and social gatherings with real-time updates and analytics.
            </p>
            <div className="hero-buttons">
              <Link to="/events" className="btn btn-primary">Browse Events</Link>
              <Link to="/create-event" className="btn btn-secondary">Create Event</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose EventHub?</h2>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.id} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Events Created</p>
            </div>
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Registered Users</p>
            </div>
            <div className="stat-item">
              <h3>200+</h3>
              <p>Active Organizers</p>
            </div>
            <div className="stat-item">
              <h3>99%</h3>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of event organizers using EventHub</p>
            <Link to="/create-event" className="btn btn-primary">Create Your First Event</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
