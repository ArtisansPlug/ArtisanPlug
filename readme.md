#NodeJs packages to Used
Express
Mongoose
Bcryptj
Nodemailer
Cloudinary
MongoDB for Database
socket .io
# Artisan_user_api









const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examSchema = new Schema({
    name:{
        type:String,
    },
    duration: {
        type: Number,
    },
    instruction:{
        type: String,
    },
    questions: [{question: String, options: [String], answerPosition: Number}]
});

module.exports = mongoose.model('exam',examSchema);

//module.exports = exam;