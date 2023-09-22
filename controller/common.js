const CommonSercive = require('../services/common');
const ProductService = require('../services/product');
const ImageService = require('../services/images');

class CommonController {
    static async GetProfile(req,res) {
        try{
            const profile = await CommonSercive.getProfile(req.user);
            res.status(profile.status).json(profile.data);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async UploadProfile(req,res) {
        try {
            const upload = await ImageService.uploadProfile(req.file, req.user)
            res.status(upload.status).json(upload.data)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    }

    static async UpdateProfile(req,res) {
        try{
            const update = await ImageService.updateImageProfile(req.file,req.user)
            res.status(update.status.json(update.data))
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async GetProduct(req,res) {
        try {
            const product = await ProductService.getProduct(req.params.id);
            res.status(product.status).json(product.data);
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = CommonController