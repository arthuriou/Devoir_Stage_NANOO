import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendOtpEmail = async (to: string, otp: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER as string,
        pass: process.env.MAIL_PASSWORD as string,
      },
    });

    const mailOptions = {
      from: `"Arthuriousk" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Code de vérification',
       html:`
       <p>Voici votre code OTP : </p>
       <div style="background-color: #f5f5f5; padding: 10px; text-align: center; border-radius: 3px; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
       <strong>${otp}</strong>
       </div> 
       <p>Il expire dans 10 minutes :) .</p>
       `
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Erreur en envoyant l’email OTP:', error);
    throw error;
  }
};
