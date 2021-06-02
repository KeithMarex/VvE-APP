import { readFileSync } from "fs";
import nodemailer from "nodemailer";
import User from "~/models/User";

export const getHTML = async function(fileName){
    const pathToHtml = "./html/";

    return readFileSync(pathToHtml + fileName, 'utf8');;
}

export const getAllBoardMemberMails = async function() {
    let emailComposition = [];

    await User.find({ role: 'admin'}, "email", {}, function(err, docs){ // was async
        if (!docs.length) return;
        docs.forEach(function(user) {
            emailComposition.push(user["email"]);
        });
    });
    return emailComposition;
}

export const getMailFromCreatorObject = async function(creatorObject) {
    const usermail = await User.find({_id: creatorObject}, "email");
    return usermail[0]['email'];
}

export const sendMail = async function(subject, htmlFilePath, emailList) {
    if(!emailList.length || !process.env.MAIL_USER || !process.env.MAIL_PASS) return;
    mailTransporter.sendMail({
        from: process.env.MAIL_USER,
        to: emailList,
        subject: subject,
        html: await getHTML(htmlFilePath)
    });
}

export const sendMailToBestuur = async function (subject, htmlFilePath) {
    sendMail(subject, htmlFilePath, await getAllBoardMemberMails());
}

export const sendMailToBewoner = async function (subject, htmlFilePath, bewonerID) {
    sendMail(subject, htmlFilePath, await getMailFromCreatorObject(bewonerID));
}

export const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});