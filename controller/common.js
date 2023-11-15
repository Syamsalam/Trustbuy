const CommonSercive = require('../services/common');
const ProductService = require('../services/product');
const ImageService = require('../services/images');
const formidable = require('formidable');
const sharp = require('sharp');
const fs = require("fs")
class CommonController {
    static async GetProfile(req, res) {
        try {
            const profile = await CommonSercive.getProfile(req.user);
            res.status(profile.status).json(profile.data);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static async UploadProfile(req, res) {
        const form = formidable.formidable()

        form.parse(req, async (err, field, files) => {
            try {
                if (err) throw new Error("Server Error")

                if (files.image.length == 0) throw new Error("Image Not Found")

                const image = files.image[0]

                if (image == null) return res.status(400).json({
                    message: "Tidak menemukan gambar",
                    data: null
                })

                const filename = image.newFilename + ".webp"

                await sharp(fs.readFileSync(image.filepath)).webp({ quality: 50 }).toFile("images/photoprofile/" + filename)


                const upload = await ImageService.uploadProfile(filename, req.user)

                res.status(upload.status).json(upload)
            } catch (err) {
                console.error(err);
                res.status(500).json(err)
            }

        })

    }

    static async UpdateProfile(req, res) {
        try {
            const update = await ImageService.updateImageProfile(req.file, req.user)
            res.status(update.status.json(update.data))
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async GetProduct(req, res) {
        try {
            const product = await ProductService.getProduct(req.params.id);
            res.status(product.status).json(product.data);
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = CommonController