import mongoose from 'mongoose';
import { validateName } from '~/validators/NameValidator';

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
    }
}, { timestamps: false });
export default mongoose.model('Status', StatusSchema);