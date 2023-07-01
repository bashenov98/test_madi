const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    id: Number,
    name: { type: String, required: true }
});

module.exports = mongoose.model("Tag", TagSchema);