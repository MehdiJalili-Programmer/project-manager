const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    mobile: { type: mongoose.Types.ObjectId, required: true },
}, {
    timestamps: true
});
const teamModel = mongoose.model("team", teamSchema)

module.exports = {
    teamModel
}