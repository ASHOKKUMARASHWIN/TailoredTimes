const nodemailer = require('nodemailer');

let transporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_USER !== 'test@example.com') {
  try {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } catch (error) {
    console.error('Error configuring email service:', error.message);
  }
}

const sendRegistrationNotification = async (newUser) => {
  if (!transporter) return;
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'no-reply@tailoredtimes.com',
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER || 'admin@tailoredtimes.com',
      subject: 'New User Registration - TailoredTimes',
      html: `
        <h2>New User Registered</h2>
        <p><strong>Name:</strong> ${newUser.name}</p>
        <p><strong>Email:</strong> ${newUser.email}</p>
        <p><strong>Countries:</strong> ${newUser.countries ? newUser.countries.join(', ') : 'N/A'}</p>
        <p><strong>Profession:</strong> ${newUser.profession || 'N/A'}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send registration notification:', error.message);
  }
};

const sendWelcomeEmail = async (user) => {
  if (!transporter) return;
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'welcome@tailoredtimes.com',
      to: user.email,
      subject: 'Welcome to TailoredTimes!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #2c3e50;">Welcome to TailoredTimes, ${user.name}!</h2>
          <p>We are thrilled to have you on board. TailoredTimes is your personal news platform, designed to deliver the stories that matter most to you.</p>
          <p>Get started by completing your onboarding and personalizing your news feed.</p>
          <br/>
          <p>Happy Reading!</p>
          <p><strong>The TailoredTimes Team</strong></p>
        </div>
      `
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send welcome email:', error.message);
  }
};

module.exports = {
  sendRegistrationNotification,
  sendWelcomeEmail
};
