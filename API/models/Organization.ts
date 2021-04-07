import mongoose from 'mongoose';
import { beautifyUnique } from 'mongoose-beautiful-unique-validation';
import { validateColor } from '~/validators/colorValidator';
import { validateName } from '~/validators/nameValidator';

const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name of organization is required'],
        unique: 'Organization does already exist',
        lowercase: true,
        trim: true,
        validate: {
            validator: validateName,
            message: 'Please fill a valid organization name'
        },
    },
    emailcredentials: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: [true, 'An organization needs to be connected to a email']
    },
    Theme: {
        primarycolor: {
            type: String,
            default: '#451864',
            validate: {
                validator: validateColor,
                message: 'Please fill a valid hex color (# needs to be included)'
            }
        },
        secondarycolor: {
            type: String,
            default: '#A0CAE8',
            validate: {
                validator: validateColor,
                message: 'Please fill a valid hex color (# needs to be included)'
            }
        }
    }
}, { timestamps: true });

OrganizationSchema.plugin(beautifyUnique);


export default mongoose.model('Organization', OrganizationSchema);