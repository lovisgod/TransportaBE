import { transporter } from '../config/nodemailer-config';

const SendMail = (to, token, id) => {
  const hostUrl = 'https://transportabe.herokuapp.com';
  const mailOptions = {
    from: 'admin@transporta.com.ng',
    to,
    subject: 'Thank you for choosing Transporta',
    text: `Click on this link to verify your email ${hostUrl}/api/v1/auth/verify?token=${token}&email=${to}&id=${id}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return ('error sending verification');
    }
    console.log(`Email sent: ${info.response}`);
  });
};

const SendRideMail = (name, details) => {
  const {
    email, price, phone, pickup, destination, paymentMethod,
  } = details;
  const mailOptions = {
    from: 'admin@transporta.com.ng',
    to: 'admin@transporta.com.ng',
    subject: `${name} just made an order`,
    text: `Check the details of the ride below \n\nemail -> ${email}\nmobile no -> ${phone}\nprice -> ${price}\npickup -> ${pickup}\ndestination -> ${destination}}\n payment-method -> ${paymentMethod}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return ('error sending verification');
    }
    console.log(`Email sent: ${info.response}`);
  });
};

export { SendMail, SendRideMail };
