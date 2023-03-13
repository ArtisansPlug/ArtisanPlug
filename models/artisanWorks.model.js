const mongoose = require('mongoose');





const artisanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider"
    },
    artisanJobsPic: {
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