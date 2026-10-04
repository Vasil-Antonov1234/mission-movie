import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     host: "smtp.resend.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: "resend",
//         pass: process.env.RESEND_API_KEY
//     }
// });

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

export default transporter;