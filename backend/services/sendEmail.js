const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS,

  },

});


const sendEmail = async (

  to,

  subject,

  text

) => {

  try {

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to,

      subject,

      html: `

        <div style="font-family:sans-serif;padding:20px;">

          <h1 style="color:#7c3aed;">

            CRM Ticket Notification
          </h1>

          <p>${text}</p>

        </div>

      `,

    });


    console.log("Email Sent 😭🔥");

  } catch (error) {

    console.log(error);

  }

};


module.exports = sendEmail;