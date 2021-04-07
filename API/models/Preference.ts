import mongoose from 'mongoose';
import { validateLanguage } from '~/validators/languageValidator';

const Schema = mongoose.Schema;

const PreferenceSchema = new Schema({
    language: {
        type: String,
        default: 'NL',
        maxLength: [2, 'Language only contains 2 letters'],
        validate: {
            validator: validateLanguage,
            message: 'Please fill a valid language'
        },
        uppercase: true
    }
}, { timestamps: true });

export default mongoose.model('Preference', PreferenceSchema);