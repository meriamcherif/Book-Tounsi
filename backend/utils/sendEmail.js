import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv' 
import  'dotenv/config'
dotenv.config({path :'./config.env'})

const sendEmail=async (options)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        }
      });
      const message={
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(message);
}
export default sendEmail;