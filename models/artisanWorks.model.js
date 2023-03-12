const mongoose = require('mongoose');





const artisanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider"
    },
    artisanJobs: {
        type: String,
        enum: [],
    },
    jobTitle: {
        type: String,
    },
},
{
    timestamps: true
});





module.exports = mongoose.model("Artisan", artisanSchema);