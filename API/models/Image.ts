import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'A name of the image is required'],
        MaxLength: [30, 'Name of image can\'t be longer then 30 characters']
    },
    image_url: {
        type: String,
        required: [true, 'A image url is required'],
    },
    delete_url: {
        type: String,
        required: [true, 'An delete url is required']
    }
}, { timestamps: true });
export default mongoose.model('Image', ImageSchema);