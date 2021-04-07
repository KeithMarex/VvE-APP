import mongoose from 'mongoose';
import { validateColor } from '~/validators/colorValidator';
import { validateName } from '~/validators/nameValidator';

const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A name is required'],
        maxlength: [10, 'Tag name can\'t be longer then 10 characters'],
        trim: true,
        validate: {
            validator: validateName,
            message: 'Please fill a valid tag name'
        },

    },
    color: {
        type: String,
        required: [true, 'A color is required'],
        validate: {
            validator: validateColor,
            message: 'Please fill a valid hex color (# needs to be included)'
        }

    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, 'An organization needs to be connected to a tag']
    }
}, { timestamps: true });
export default mongoose.model('Tag', TagSchema);