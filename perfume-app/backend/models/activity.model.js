const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    actionType: {type: String, required: true},
    resourceType: {type: String, required: true},
    resourceId: {type: String, required: true},
    method: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model('Activity', activitySchema);
