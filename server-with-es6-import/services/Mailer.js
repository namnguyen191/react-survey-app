import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

// GLOBAL .env init
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendMail = async ({ subject, recipients }, content) => {
    const msg = {
        to: recipients,
        from: process.env.SENDGRID_ACCOUNT,
        subject,
        html: content,
        text: content
    };

    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
     
        if (error.response) {
          console.error(error.response.body)
        }
    }
};

export default sendMail;
