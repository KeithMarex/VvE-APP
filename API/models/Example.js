const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExampleSchema = new Schema({
    example: {
        type: String,
        required: true
    },
}, { timestamps: true });

ExampleSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ExampleSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Example', ExampleSchema);
