const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️  Email credentials not configured. Email notifications will be disabled.');
    return null;
  }

  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email notification
const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    if (!transporter) {
      console.log('Email not sent (email not configured):', { to, subject });
      return false;
    }

    await transporter.sendMail({
      from: `"EventHub" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log('✅ Email sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};

// Send event registration confirmation
const sendRegistrationConfirmation = async (userEmail, userName, eventTitle, eventDate) => {
  const subject = 'Event Registration Confirmation - EventHub';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4CAF50;">Registration Confirmed! 🎉</h2>
      <p>Hello ${userName || 'there'},</p>
      <p>You have successfully registered for the following event:</p>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3>${eventTitle}</h3>
        <p><strong>Date:</strong> ${new Date(eventDate).toLocaleDateString()}</p>
      </div>
      <p>We look forward to seeing you there!</p>
      <p>Best regards,<br>The EventHub Team</p>
    </div>
  `;

  return await sendEmail(userEmail, subject, html);
};

// Send event creation notification
const sendEventCreatedNotification = async (userEmail, userName, eventTitle) => {
  const subject = 'Event Created Successfully - EventHub';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2196F3;">Event Created! ✨</h2>
      <p>Hello ${userName || 'there'},</p>
      <p>Your event "<strong>${eventTitle}</strong>" has been created successfully and is now live on EventHub!</p>
      <p>You can manage your event from your dashboard.</p>
      <p>Best regards,<br>The EventHub Team</p>
    </div>
  `;

  return await sendEmail(userEmail, subject, html);
};

module.exports = {
  sendEmail,
  sendRegistrationConfirmation,
  sendEventCreatedNotification
};

