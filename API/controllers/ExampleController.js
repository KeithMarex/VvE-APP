const Example = require('../models/Example');

// Get examples
exports.getExamples = async (req, res) => {
    try {
        const examples = await Example.find();
        res.status(200).json({success: true, examples});
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
