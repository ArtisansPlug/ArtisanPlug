const mongoose = require("mongoose");







const providerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        trim: true,
    },
    Password: {
        type: String,
    },
    PhoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    Profession: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    YearsOfExperience: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
    }, 
    ProfilePicture: {
        type: String,
        default: "my image"
    },
    JobPictures: {
        type: String,
        enum: [],
    }

},
{
    timestamps: true
});





module.exports = mongoose.model("Provider", providerSchema);