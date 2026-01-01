import React from 'react';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Imad Assaf',
      role: 'CEO & Founder',
      icon: '👩‍💼'
    },
    {
      id: 2,
      name: 'Fouad Najem',
      role: 'CTO',
      icon: '👨‍💻'
    },
    {
      id: 3,
      name: 'Michael Jackson',
      role: 'Head of Events',
      icon: '👩‍🎤'
    },
    {
      id: 4,
      name: 'Potato Fries',
      role: 'Lead Developer',
      icon: '👨‍🔧'
    }
  ];

  const values = [
    {
      id: 1,
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology',
      icon: '💡'
    },
    {
      id: 2,
      title: 'Reliability',
      description: 'Providing dependable service you can count on',
      icon: '🛡️'
    },
    {
      id: 3,
      title: 'Customer Focus',
      description: 'Your success is our priority',
      icon: '🎯'
    },
    {
      id: 4,
      title: 'Simplicity',
      description: 'Making event management easy and accessible',
      icon: '✨'
    }
  ];

  return (
    <div className="about">
      <section className="about-hero">
        <div className="container">
          <h1>About EventHub</h1>
          <p className="about-subtitle">Revolutionizing Event Management Since 2020</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-story">
            <h2>Our Story</h2>
            <p>
              EventHub was founded with a simple mission: to make event management accessible,
              efficient, and enjoyable for everyone. What started as a small project has grown
              into a comprehensive platform serving thousands of event organizers worldwide.
            </p>
            <p>
              We understand the challenges of organizing events, from coordinating schedules
              to managing attendees. That's why we've built a platform that streamlines every
              aspect of event management, allowing you to focus on creating memorable experiences.
            </p>
          </div>

          <div className="mission-vision">
            <div className="card mission-card">
              <h3>🎯 Our Mission</h3>
              <p>
                To empower event organizers with intuitive tools that simplify planning,
                enhance attendee experiences, and maximize event success.
              </p>
            </div>
            <div className="card vision-card">
              <h3>🔭 Our Vision</h3>
              <p>
                To become the world's most trusted and user-friendly event management
                platform, connecting people through unforgettable experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            {values.map((value) => (
              <div key={value.id} className="value-card card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card card">
                <div className="team-icon">{member.icon}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Our Impact</h2>
          <div className="impact-stats">
            <div className="impact-stat">
              <h3>5+ Years</h3>
              <p>In Business</p>
            </div>
            <div className="impact-stat">
              <h3>100K+</h3>
              <p>Events Hosted</p>
            </div>
            <div className="impact-stat">
              <h3>1M+</h3>
              <p>Happy Attendees</p>
            </div>
            <div className="impact-stat">
              <h3>50+</h3>
              <p>Countries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
