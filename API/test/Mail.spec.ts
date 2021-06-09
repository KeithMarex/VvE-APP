import 'dotenv/config'
import {describe, it } from 'mocha';
import { mailTransporter } from '~/util/Mailer';

describe("Mailer test", function() {
    it("should return a valid response for sending mail", function(done) {
        mailTransporter.sendMail({
            from: process.env.MAIL_USER,
            to: 'sanderericscheenstra@outlook.com',
            subject: 'testemail',
            html: 'testmail'}, (err, info) => {
                console.log(info);
            });
        mailTransporter.sendMail({
            from: process.env.MAIL_USER,
            to: 'sanderericsheenstra@outlook.com',
            subject: 'test mail',
            html: 'Test html' 
        }, (err, info) => {
            if(info.response.startsWith("250")) {
                done();
            }
        });
    })
});