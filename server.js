const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


AWS.config.update({ region: 'eu-north-1' });
const ses = new AWS.SES();


app.post('/send-email', (req, res) => {
  const { to, subject, message } = req.body;

  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: { Data: message }
      },
      Subject: { Data: subject }
    },
    Source: 'kalyanikuntumalla3@gmail.com',
  };

  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      res.json({ message: 'Email sent successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
