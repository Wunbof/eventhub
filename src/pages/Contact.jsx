import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Contact form submitted:', formData);
      setSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  const contactInfo = [
    {
      id: 1,
      icon: '📧',
      title: 'Email',
      value: 'info@eventhub.com',
      link: 'mailto:info@eventhub.com'
    },
    {
      id: 2,
      icon: '📱',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      id: 3,
      icon: '📍',
      title: 'Address',
      value: '123 Event Street, City, Country',
      link: '#'
    },
    {
      id: 4,
      icon: '🕐',
      title: 'Business Hours',
      value: 'Mon - Fri: 9AM - 6PM',
      link: '#'
    }
  ];

  return (
    <div className="contact">
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team!</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-section">
              <h2>Get In Touch</h2>
              <p className="contact-intro">
                Have questions about our platform or need assistance with your event?
                Our team is here to help you every step of the way.
              </p>

              <div className="contact-info-cards">
                {contactInfo.map((info) => (
                  <div key={info.id} className="contact-info-card card">
                    <div className="contact-icon">{info.icon}</div>
                    <div className="contact-details">
                      <h4>{info.title}</h4>
                      {info.link !== '#' ? (
                        <a href={info.link}>{info.value}</a>
                      ) : (
                        <p>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-section">
                <h3>Follow Us</h3>
                <div className="social-links-contact">
                  <a href="#" className="social-link">📘 Facebook</a>
                  <a href="#" className="social-link">🐦 Twitter</a>
                  <a href="#" className="social-link">📷 Instagram</a>
                  <a href="#" className="social-link">💼 LinkedIn</a>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              {submitted && (
                <div className="success-alert">
                  <h3>✅ Message Sent!</h3>
                  <p>Thank you for contacting us. We'll get back to you soon.</p>
                </div>
              )}

              <form className="contact-form card" onSubmit={handleSubmit}>
                <h2>Send Us a Message</h2>

                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email *</label>
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
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={`form-control ${errors.subject ? 'error' : ''}`}
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-control ${errors.message ? 'error' : ''}`}
                    placeholder="Type your message here..."
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-block">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
