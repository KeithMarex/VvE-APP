import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { validateEmail } from '../validators/emailValidator';
import beautifyUnique from 'mongoose-beautiful-unique-validation';

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
    }
}, { timestamps: true });

UserSchema.plugin(beautifyUnique);

export default mongoose.model('User', UserSchema);