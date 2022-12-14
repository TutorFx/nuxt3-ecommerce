import nodemailer from 'nodemailer';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';


const transport = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: '587',
  auth: {user: process.env.MAIL_USER, pass: process.env.MAIL_PASS},
});

transport.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./resources/mail/')
  },
  viewPath: path.resolve('./resources/mail/'),
  extName: '.html',
}));

export {transport};