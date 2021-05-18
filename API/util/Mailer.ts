import { readFileSync } from "fs";
import nodemailer from "nodemailer";

export const getHTML = async function(fileName){
    const pathToHtml = "./html/";
    
    return readFileSync(pathToHtml + fileName, 'utf8');;
}

export const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});