import { readFileSync } from "fs";
import nodemailer from "nodemailer";
import handlebars from 'handlebars';
import User from "~/models/User";
import path from 'path'

export const getHTML = async (fileName) => {
    const filePath = path.join(__dirname, `../html/${fileName}.html`);
    return readFileSync(filePath, 'utf-8').toString();
}

export const sendMail = async(subject, info, htlm) => {
    let source = await getHTML(htlm)
    if (info) {
        source = addAttributes(source, info)
    }
    mailTransporter.sendMail({
        from: process.env.MAIL_USER,
        to: info.email,
        subject: subject,
        html: source
    });
}

export const sendMailToAdmin = async  (subject, htmlFilePath) => {
    sendMail(subject, htmlFilePath, await getAdminEmails());
}

const getAdminEmails = async () => {
    let emailComposition = [];

    await User.find({ role: 'admin'}, "email", {}, function(err, docs){
        if (!docs.length) return;
        docs.forEach(function(user) {
            emailComposition.push(user["email"]);
        });
    });
    return emailComposition;
}

const addAttributes = (source, attributes) => {
    const template = handlebars.compile(source);
    source = template(attributes);
    return source
}

const getEmail = async (userId) => {
    const usermail = await User.find({_id: userId}, "email");
    return usermail[0]['email'];
}

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});