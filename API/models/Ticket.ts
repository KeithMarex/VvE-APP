import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'A title is required'],

    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A description is required']
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: "Image"
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'A creator of type User is required']
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: "Status",
        default: "60a79bb6890c71dde3117c21"
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    tag: {
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }
}, { timestamps: true });
export default mongoose.model('Ticket', TicketSchema);