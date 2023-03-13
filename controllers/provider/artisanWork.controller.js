const Artisan = require("../../models/artisanWorks.model");
const Cloudinary = require("../../utils/artisanCloudinary");
const Provider = require("../../models/provider.model");



exports.createArtisan = async(req, res)=>{
    try {
        const id = req.user;
        const artist = await Provider.findOne({ id })
        if(artist == null){
            return res.status(404).send("Please, kindly login to perform this task")
        };
        const artistPic = await Cloudinary.uploader.upload(req.file.path);
        const user = await Artisan.create({
            userId: artist._id,
            artisanJobs: artistPic ,
            jobTitle,
        })
        return res.status(201).send({ message: "You have successfully upload your work", user })
    } catch (error) {
        return res.status(500).send({
            error: error.message,
            message: "internal error"
        })
    }
};



exports.artistView = async(req, res)=>{
    try {
        const id = req.user;
        const viewJobs = await Artisan.find({ id })
        .sort({ createAt: -1 })
        .limit(10)
        .skip()
        return res.status(200).send(viewJobs)
    } catch (error) {
        return res.status(500).send({
            error: error.message,
            message: "internal error"
        })
    }
};



exports.updateArtisan = async(req, res)=>{
    try {
        const id = req.user;
        const user = await Artisan.findOne({ id })
        const {  artisanJobs, jobTitle, } = req.body;
        const artistPic = await Cloudinary.uploader.upload(req.file.path);
        const userUpdate = await Artisan.findOneAndUpdate(
            {
                _id: user._id
            },
            {
                artisanJobs: artistPic,
                jobTitle,
            },
            {
                new: true
            }
        );
        return res.status(200).send(userUpdate)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
};



exports.artistDelete = async(req, res)=>{
    try {
        const id = req.user;
        const user = await Artisan.findOne({ id })
        if(user){
            const userDelete = await Artisan.findOneAndDelete(
                {
                    _id: user._id
                }
            )
            return res.status(200).send({status: "Deleted successfully", userDelete })
        }
    } catch (error) {
        return res.status(404).send({
            error: error.message
        })
    }
}



 