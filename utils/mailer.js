import nodemailer from "nodemailer";

export default function EmailSender(props) {
  const { name, email } = props;
  console.log(name, email, "kya ha issue ");
  // const getEmailContent = () => {
  //   switch (type) {
  //     case "registration":
  //       return {
  //         subject: "Welcome to Our App!",
  //         html: `
  //           <h1>Welcome, ${name}!</h1>
  //           <p>Thank you for registering at our app. We're glad to have you on board.</p>
  //           <p>Best regards,<br>The Team</p>
  //         `,
  //       };
  //     case "resetpassword":
  //       return {
  //         subject: "Password Reset Request",
  //         html: `
  //           <h1>Password Reset Request</h1>
  //           <p>Hello, ${name}. You requested to reset your password.</p>
  //           <p>Click the link below to reset your password:</p>
  //           <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a>
  //           <p>If you did not request this, please ignore this email.</p>
  //           <p>Best regards,<br>The Team</p>
  //         `,
  //       };
  //     default:
  //       return {
  //         subject: "Notification from Our App",
  //         html: `
  //           <h1>Hello, ${name}!</h1>
  //           <p>This is a notification from our app.</p>
  //           <p>Best regards,<br>The Team</p>
  //         `,
  //       };
  //   }
  // };

  // const { subject, html } = getEmailContent();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muhammadimran240105@gmail.com",
      pass: "hhqk oiru dilm xiuy",
    },
  });

  const mailOptions = {
    from: "muhammadimran240105@gmail.com",
    to: email,
    subject: "Notification from Our App",
    html: `
              <h1>Hello, ${name}!</h1>
              <p>This is a notification from our app.</p>
              <p>Best regards,<br>The Team</p>
            `,
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", info.response);
      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    }
  });
}
