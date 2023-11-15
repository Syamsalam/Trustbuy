const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { ImageBase64 } = require('../tools/index');
const fs = require("fs")
class ImageService {

    //ini semuanya bisa
    static async uploadProfile(file , user) {
        // const { id } = req.users

        

        const image = file

        try {

            const curImage = await prisma.image.findFirst({
                where : {
                    users_id : Number(user.id)
                }
            })

            console.log(curImage)

            if(curImage != null) {
                try {
                    fs.unlinkSync("images/photoprofile/"+curImage.image)
                }catch(err) {
                    console.log(err)
                }
            }
            console.log("Berhasil Lewat")
            const users = await prisma.image.upsert({
                where: {
                    users_id: Number(user.id),
                },
                update: {
                    image: image
                },
                create: {
                    users_id: Number(user.id),
                    jenis_image_id: Number(1),
                    image: image
                }
            })
            return {
                status: 200,
                message: "Berhasil Update Image Profile",
                data: users
            }
        } catch (err) {
            console.error(err , 'ini error');
            return {
                status: 500,
                message: "Gagal Update Image Profile",
                data: null
            }
        }

    }

    //ini semuanya bisa
    static async getImageProfile(id) {
        try{
            const image = await prisma.image.findUnique({
                where: {
                    users_id: Number(id)
                }
            })
            return {
                status: 200,
                message: "Image Profile berhasil",
                data: image
            }
        } catch (err) {
            return {
                status: 500,
                message: "Image profile gagal",
                data: null
            }
        }
    }

    //ini semuanya bisa
    static async updateImageProfile(_data,user) {
        try{
            const image = await prisma.image.update({
                where: {
                    users_id: Number(user.id)
                },
                data: _data
            })
            return {
                status: 200,
                message: "Berhasil Update Image",
                data: image
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Update Image",
                data: null
            }
        }
    }

    //ini semuanya bisa
    static async deleteImageProfile(id) {
        try{
            const image = await prisma.image.delete({
                where: {
                    users_id: Number(id)
                }
            })
            return {
                status: 200,
                message: "Image Profile Berhasil Dihapus",
                data: null
            }
        } catch (err) {
            return {
                status: 500,
                message: "Image Profile Gagal Dihapus",
                data: null
            }
        }
    }

}

module.exports = ImageService