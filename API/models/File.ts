import { Binary } from 'bson';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FileSchema = new Schema({
    filename: {
        type: String,
        required: [true, 'Files required']
    },
    type: String,
    data: {
        type: Buffer,
        required: [true, 'A file is required to create File'],
    },
    filesize: {
        type: Number
    },
    organisation: {
        type: Schema.Types.ObjectId,
        ref: "Organisation",
        required: [true, 'An associated Organisation is required for Files']
    }
}, {timestamps: true});

export default mongoose.model('Files', FileSchema);