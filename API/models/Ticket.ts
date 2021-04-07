import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    title: {
        type: String,
        required: [true, 'A title is required'],

    },
    description: {
        type: String,
        required: [true, 'A description is required']
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: "Image"
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: "Status"
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    Tag: {
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }
});
export default mongoose.model('Ticket', TicketSchema);