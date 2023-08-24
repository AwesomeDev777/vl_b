const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    billing_type: {
        type: String,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    staffs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff'
        }
    ],
    start_date: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    date_finished: {
        type: Date
    },
    progress: {
        type: Number,
        default: 0
    },
    progress_from_tasks: {
        type: Number,
        default: 1
    },
    project_cost: {
        type: Number
    },
    project_rate_per_hour: {
        type: Number
    },
    estimated_hours: {
        type: Number
    },
    addedfrom: {
        type: Number,
        default: 0
    },
    // contact_notification: {
    //     type: Number,
    //     default: 1
    // },
    notify_contacts: {
        type: String
    }
})

const Project= mongoose.model("Project", ProjectSchema);

module.exports = Project;
