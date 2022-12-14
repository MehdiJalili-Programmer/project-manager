const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true},
    text: { type: String },
    image: { type: String, default: "/defaults/default.png" },
    owner: { type: mongoose.Types.ObjectId, required: true },
    team: { type: mongoose.Types.ObjectId },
    Private: { type: Boolean, default: true },
    tags: { type: Array, default: []}
}, {
    timestamps: true
});
const projectModel = mongoose.model("project", projectSchema)

module.exports = {
    projectModel
}