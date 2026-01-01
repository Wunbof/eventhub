const twilio = require('twilio');

// Create Twilio client
const createClient = () => {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.warn('⚠️  Twilio credentials not configured. SMS notifications will be disabled.');
    return null;
  }

  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
};

// Send SMS notification
const sendSMS = async (to, message) => {
  try {
    const client = createClient();
    if (!client) {
      console.log('SMS not sent (Twilio not configured):', { to, message });
      return false;
    }

    if (!process.env.TWILIO_PHONE_NUMBER) {
      console.warn('⚠️  Twilio phone number not configured.');
      return false;
    }

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    console.log('✅ SMS sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('❌ Error sending SMS:', error);
    return false;
  }
};

// Send event registration confirmation SMS
const sendRegistrationSMS = async (phoneNumber, eventTitle, eventDate) => {
  const message = `EventHub: You've successfully registered for "${eventTitle}" on ${new Date(eventDate).toLocaleDateString()}. See you there! 🎉`;
  return await sendSMS(phoneNumber, message);
};

module.exports = {
  sendSMS,
  sendRegistrationSMS
};

