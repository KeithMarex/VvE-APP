import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { validateEmail } from '../validators/emailValidator';
import { beautifyUnique } from 'mongoose-beautiful-unique-validation';
import { validateName } from '~/validators/nameValidator';

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: "Email does already exist",
        lowercase: true,
        trime: true,
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
        default: 'user',
        required: [true]
    },
    firstname: {
        type: String,
        required: [true, 'Firstname is required'],
        MaxLength: [15, 'Firstname can\'t be longer then 25 Characters'],
        validate: {
            validator: validateName,
            message: 'Please fill a valid firstname'
        }

    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required'],
        MaxLength: [25, 'Firstname can\'t be longer then 25 Characters'],
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