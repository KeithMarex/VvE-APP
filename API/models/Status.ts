import mongoose from 'mongoose';
import { validateName } from '~/validators/NameValidator';
import { validateColor } from '~/validators/ColorValidator';

const Schema = mongoose.Schema;

const StatusSchema = new Schema({
    status: {
        type: String,
        required: [true, 'A status is required'],
        maxlength: [10, 'Status can\'t be longer then 10 characters'],
        trim: true,
        validate: {
            validator: validateName,
            message: 'Please fill a valid status'
        }
    },
    color: {
        type: String,
        required: [true, 'A color is required'],
        validate: {
            validator: validateColor,
            message: 'Please fill a valid hex color (# needs to be included)'
        }
    },
}, { timestamps: false });
export default mongoose.model('Status', StatusSchema);