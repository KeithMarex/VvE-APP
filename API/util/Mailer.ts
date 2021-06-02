import { readFileSync } from "fs";
import nodemailer from "nodemailer";
import handlebars from 'handlebars';
import User from "~/models/User";
import path from 'path'

export const getHTML = async (fileName) => {
    const filePath = path.join(__dirname, `../html/${fileName}.html`);
    return readFileSync(filePath, 'utf-8').toString();
}

export const getAllBoardMemberMails = async () => {
    let emailComposition = [];

    await User.find({ role: 'admin'}, "email", {}, function(err, docs){ // was async
        if (!docs.length) return;
        docs.forEach(function(user) {
            emailComposition.push(user["email"]);
        });
    });
    return emailComposition;
}

export const getMailFromCreatorObject = async (creatorObject) => {
    const usermail = await User.find({_id: creatorObject}, "email");
    return usermail[0]['email'];
}

export const sendMail = async (subject, htmlFilePath, emailList) => {
    if(!emailList.length || !process.env.MAIL_USER || !process.env.MAIL_PASS) return;
    mailTransporter.sendMail({
        from: process.env.MAIL_USER,
        to: emailList,
        subject: subject,
        html: await getHTML(htmlFilePath)
    });
}

export const sendMailToBestuur = async  (subject, htmlFilePath) => {
    sendMail(subject, htmlFilePath, await getAllBoardMemberMails());
}

export const sendMailToBewoner = async  (subject, htmlFilePath, bewonerID) => {
    sendMail(subject, htmlFilePath, await getMailFromCreatorObject(bewonerID));
}

export const sendRegisterMail = async(subject, info, htlm) => {
    let source = await getHTML(htlm)
    if (info) {
        const template = handlebars.compile(source);
        const replacements = info;
        source = template(replacements);
    }
    mailTransporter.sendMail({
        from: process.env.MAIL_USER,
        to: info.email,
        subject: subject,
        html: source
    });
}

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});