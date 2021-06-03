import { readFileSync } from "fs";
import nodemailer from "nodemailer";
import handlebars from 'handlebars';
import User from "~/models/User";
import path from 'path'
import Organization from "~/models/Organization";

export const getHTML = async (fileName: String) => {
    const filePath = path.join(__dirname, `../html/${fileName}.html`);
    return readFileSync(filePath, 'utf-8').toString();
}

export const sendMail = async(subject: String, info: any, htlm: String) => {
    let source = await getHTML(htlm)
    source = addAttributes(source, info)
    let email = await getEmail(info._id);
    mailTransporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        html: source
    });
}

export const sendAdminMail = async(subject: String, organizationId, htlm: String) => {
    let source = await getHTML(htlm)
    let email = await getAdminEmail(organizationId);
    mailTransporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        html: source
    });
}

const addAttributes = (source, attributes) => {
    const template = handlebars.compile(source);
    source = template(attributes);
    return source
}

const getEmail = async (userId) => {
    const email = await User.findOne({_id: userId}, "email");
    return email["email"];
}

const getAdminEmail = async (organizationId) => {
    const email = await Organization.findOne({_id: organizationId}).populate('emailCredentials');
    return email["email"];
}

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});