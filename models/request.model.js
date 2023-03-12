const mongoose = require('mongoose');





const requestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
    },
    requestTitle: {
        type: String,
    },
},
{
    timestamps: true
});





module.exports = mongoose.model("Request", requestSchema);