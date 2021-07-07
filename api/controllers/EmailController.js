//CONFIG
//We use nodemailer api for email sending
//How email sending work: https://www.howitworksdaily.com/how-does-email-work/

const nodemailer = require("nodemailer");               
const hbs = require('nodemailer-express-handlebars');  
require('dotenv').config();                          

module.exports = {
    testEmail(req, res){
        let transporter = nodemailer.createTransport({
            service: 'gmail', //We use GMAIL's SMTP Server, but in production SendGrid or MailGun needed
            auth: {
                user: process.env.USER,     
                pass: process.env.PASSWORD 
            }
        });

        //We use the TDB/views/email folder for sending email. In this path there is a email.handlebars file. This allows to send emails with HTML + CSS
        transporter.use('compile', hbs({
            viewEngine:{
                ///partialsDir: __dirname + '../../../views/email',
                defaultLayout:''
            },
            viewPath:  __dirname + '../../../views/email',  
        }));

        //email configuration
        let mailOptions = {
            from: "theduskbrewery@gmail.com",
            to: "mbock996@gmail.com",
            subject: "Test is important",
            text:"John Doe has a pink Lamborghini",
            template: 'email'
        }
        
        //This will send the email
        transporter.sendMail(mailOptions, function(err, data){
            if(err){
                console.log(err);
            }else{
                res.send('Email sent sucessfully!');
            }
        })
    }
}