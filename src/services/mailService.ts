import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendOTPEmail = async (to: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER as string,
      pass: process.env.MAIL_PASSWORD as string,
    },
  });

  const mailOptions = {
    from: '"Arthuriousk" <' + process.env.MAIL_USER + '>',
    to,
    subject: 'Code de vérification',
    text: `Voici votre code OTP : ${otp}. Il expire dans 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};
