import nodemailer from "nodemailer";

export default function EmailSender({ name, email, type }) {
    
  const getEmailContent = (type, name, token) => {
    switch (type) {
      case "registration":
        return {
          subject: "Welcome to Our App!",
          html: `
                <h1>Welcome, ${name}!</h1>
                <p>Thank you for registering at our app. We're glad to have you on board.</p>
                <p>Best regards,<br>The Team</p>
              `,
        };
      case "resetpassword":
        return {
          subject: "Password Reset Request",
          html: `
                <h1>Password Reset Request</h1>
                <p>Hello, ${name}. You requested to reset your password.</p>
                <p>Click the link below to reset your password:</p>
                <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,<br>The Team</p>
              `,
        };
      default:
        return {
          subject: "Notification from Our App",
          html: `
                <h1>Hello, ${name}!</h1>
                <p>This is a notification from our app.</p>
                <p>Best regards,<br>The Team</p>
              `,
        };
    }
  };

  const transport = nodemailer.createTestAccount({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "muhamadimranmunir@gmail.com",
      pass: "03041672724787898iI",
    },
  });

  const { subject, html } = getEmailContent(type, name);
  const mailOptions = {
    from: "munir787898@gmail.com",
    to: email,
    subject: subject,
    html: html,
  };

  return transport.sendMail(mailOptions);
}
