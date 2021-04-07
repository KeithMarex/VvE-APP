import mongoose from 'mongoose';
import { validateLanguage } from '~/validators/languageValidator';

const Schema = mongoose.Schema;

const PreferenceSchema = new Schema({
    language: {
        type: String,
        default: 'NL',
        maxlength: [2, 'Language can only contain 2 letters'],
        validate: {
            validator: validateLanguage,
            message: 'Please fill a valid language'
        },
        uppercase: true
    }
}, { timestamps: true });

export default mongoose.model('Preference', PreferenceSchema);