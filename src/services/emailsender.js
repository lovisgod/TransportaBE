import { transporter } from '../config/nodemailer-config';

const SendMail = (to, token, id) => {
  const hostUrl = 'mediamall.herokuapp.com';
  const mailOptions = {
    from: 'mediamall@kodehauz.com',
    to,
    subject: 'Thank you for choosing MediaMall',
    text: `Click on this link to verify your email ${hostUrl}/api/v1/auth/verification?token=${token}&email=${to}&id=${id}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return ('error sending verification');
    }
    console.log(`Email sent: ${info.response}`);
  });
};

export default SendMail;
