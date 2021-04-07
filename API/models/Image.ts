import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A name of the image is required'],
        MaxLength: [30, 'Name of image can\'t be longer then 30 characters']
    },
    image: {
        type: String,
        required: [true, 'A image is required'],
    }
}, { timestamps: true });
export default mongoose.model('Image', ImageSchema);