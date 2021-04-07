import mongoose from 'mongoose';
import { beautifyUnique } from 'mongoose-beautiful-unique-validation';
import { validateEmail } from '../validators/emailValidator';
import { validateName } from '~/validators/nameValidator';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    role: {
        type: String,
        lowercase: true,
        maxlength: [5, 'Role can\'t be longer then 5 characters'],
        minlength: [4, 'Role must contain 4 characters'],
        default: 'user',
    },
    firstname: {
        type: String,
        required: [true, 'Firstname is required'],
        maxlength: [15, 'Firstname can\'t be longer then 25 characters'],
        validate: {
            validator: validateName,
            message: 'Please fill a valid firstname'
        }

    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required'],
        maxlength: [25, 'Lastname can\'t be longer then 25 characters'],
        validate: {
            validator: validateName,
            message: 'Please fill a valid lastname'
        }
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    },
    organizations: {
        type: Schema.Types.ObjectId,
        ref: "Organization"
    },
    parking: {
        type: Boolean,
        default: false
    },
    preference: {
        type: Schema.Types.ObjectId,
        ref: "Preference"
    }
}, { timestamps: true });

UserSchema.plugin(beautifyUnique);

export default mongoose.model('User', UserSchema);