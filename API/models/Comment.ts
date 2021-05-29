import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'A user is required']
    },
    comment: {
        type: String,
        required: [true, 'A comment is required'],
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: "Image"
    }],
}, { timestamps: true });
export default mongoose.model('Comment', CommentSchema);