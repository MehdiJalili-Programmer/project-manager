const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, },
    last_name: { type: String, },
    username: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true},
    roles: { type: [String], default: ["USER"]},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    profile_image: { type: String, required: false},
    skills: { type: [String], default: []},
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    token : { type: String, default: ''}
}, {
    timestamps: true
});
const userModel = mongoose.model("user", userSchema)

module.exports = {
    userModel
}