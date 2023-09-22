const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { ImageBase64 } = require('../tools/index');

class ImageService {

    //ini semuanya bisa
    static async uploadProfile(file , user) {
        // const { id } = req.users
        const image = file
        try {
            const imageBase64 = await ImageBase64(image);
            const users = await prisma.image.upsert({
                where: {
                    users_id: Number(user.id),
                },
                update: {
                    image: imageBase64
                },
                create: {
                    users_id: Number(user.id),
                    jenis_image_id: Number(1),
                    image: imageBase64
                }
            })
            return {
                status: 200,
                message: "Berhasil Update Image Profile",
                data: users
            }
        } catch (err) {
            console.log(err , 'ini error');
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