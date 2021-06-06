import mongoose from 'mongoose';
import { validateEndDate } from '~/validators/DateValidator';
// Aanmaken datum validator en importen -> use

const Schema = mongoose.Schema;

const AgendaSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title for Agenda_item is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'A description is required for Agenda_item'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'A date/time is required for Agenda_item'],
    },
    enddate: {
        type: Date,
        validate: [validateEndDate, 'Start date must be less or equal to end date'],
        default: null
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    organisation: {
        type: Schema.Types.ObjectId,
        ref: "Organisation",
        required: [true, 'An associated Organisation is required for Agenda_item']
    }
}, {timestamps: true});


export default mongoose.model('Agenda_items', AgendaSchema);