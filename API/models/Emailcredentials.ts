import mongoose from 'mongoose';
import { validateEmail } from '~/validators/mailValidator';

const Schema = mongoose.Schema;

const Emailcredentials = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: "Email does already exist",
        lowercase: true,
        trim: true,
        validate: {
            validator: validateEmail,
            message: 'Please fill a valid email address'
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    host: {
        type: String,
        required: [true, 'The host is required']
    },
    port: {
        type: Number,
        required: [true, `The port is required`]
    }
}, { timestamps: true });

export default mongoose.model('Emailcredentials', Emailcredentials);