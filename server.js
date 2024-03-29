const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Add this line
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'valentineswebsite0210@gmail.com',
    pass: 'abry hjpf fnoo iuxw',
  },
});

// Add the CORS headers for the sendEmail route
app.options('/sendEmail', cors()); // Enable preflight request

app.post('/sendEmail', (req, res) => {
  // Handle the email sending logic here
  const mailOptions = {
    from: 'valentineswebsite0210@gmail.com',
    to: 'valentineswebsite0210@gmail.com',
    subject: "Valentine's Day Confirmation",
    text: 'Yay! They said yes to being your valentine! 💖',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully!');
    }
  });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
