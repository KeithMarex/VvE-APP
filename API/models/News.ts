import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'A title is required'],
    },
    author: {
        type: String,
        required: [true, 'A author is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    organization: {
        type:Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, 'A news article need to be connected to an organization'],
    },
    thumbnail: {
        type: Schema.Types.ObjectId,
        ref: "Image"
    }
}, { timestamps: true});

export default mongoose.model('News', NewsSchema);