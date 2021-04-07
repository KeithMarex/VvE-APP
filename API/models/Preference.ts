import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { validateLanguage } from '~/validators/languageValidator';

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