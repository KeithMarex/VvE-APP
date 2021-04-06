const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const email = require('../validators/emailValidator.js');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: "Email does already exist",
        lowercase: true,
        trime: true,
        validate: {
            validator: email.validateEmail,
            message: 'Please fill a valid email address'
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
}, { timestamps: true });

UserSchema.plugin(beautifyUnique);

module.exports = mongoose.model('User', UserSchema);
