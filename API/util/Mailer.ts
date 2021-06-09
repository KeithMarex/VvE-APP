require('dotenv').config({ path: `../.env.${process.env.NODE_ENV}` })
import Emailcredentials from '~/models/Emailcredentials';
import { readFileSync } from "fs";
import nodemailer from "nodemailer";
import handlebars from 'handlebars';
import User from "~/models/User";
import path from 'path'
import Organization from "~/models/Organization";

// Needed to initialize the model
Emailcredentials.count();

export const getHTML = async (fileName: String) => {
    const filePath = path.join(__dirname, `../html/${fileName}.html`);
    return readFileSync(filePath, 'utf-8').toString();
}

export const sendMail = async(subject: String, info: any, htlm: String) => {
    let source = await getHTML(htlm);
    source = addAttributes(source, info);
    let email = info.email || await getEmail(info._id);
    mailTransporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        html: source
    });
}

export const sendAdminMail = async(subject: String, info: any, htlm: String) => {
    let source = await getHTML(htlm);
    source = addAttributes(source, info);
    let email = await getAdminEmail(info.organization);
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
    return source;
}

const getEmail = async (userId) => {
    const email = await User.findOne({_id: userId}, "email");
    return email["email"];
}

const getAdminEmail = async (organizationId) => {
    const email = await Organization.findById(organizationId).populate("emailcredentials");
    return email["emailcredentials"]["email"];
}

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});