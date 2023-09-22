const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PostService {
    static async createPost(_data,users) {
        try{

            const user = await prisma.users.findUnique({
                where: {
                    id: Number(users.id)
                }
            })

            _data.user_id = Number(user.id)
            
            const post = await prisma.jastiper_post.create({
                data: _data
            })
            return {
                status: 200,
                message: "Berhasil Menambah Post",
                data: post
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Menambah Post",
                data: err.message
            }
        }
    }

    static async updatePost(_data,post_id) {
        try{           

            const post = await prisma.jastiper_post.update({
                where: {
                    id: Number(post_id)
                },
                data: _data
            })
            return {
                status: 200,
                message: "Berhasil Mengubah Post",
                data: post
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mengubah Post",
                data: err.message
            }
        }
    }

    static async deletePost(id) {
        try {
            const post = await prisma.jastiper_post.delete({
                where: {
                    id: Number(id)
                }
            })
            return {
                status: 200,
                message: "Berhasil Menghapus Post",
                data: post
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Menghapus Post",
                data: null
            }
        }
    }

    static async getPost(user){
        try{
            const post = await prisma.jastiper_post.findMany({
                where: {
                    user_id: Number(user.id)
                }
            })
            return {
                status: 200,
                message: "Berhasil Mengambil Post",
                data: post
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mengambil Post",
                data: null
            }
        }
    }

    static async getAllPost() {
        try{
            const post = await prisma.jastiper_post.findMany()
            return {
                status: 200,
                message: "Berhasil Mengambil Semua Post",
                data: post
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mengambil Semua Post",
                data: null
            }
        }
    }

    static async getPostByStatus() {
        try {
            const post = await prisma.jastiper_post.findMany({
                where: {
                    aktif: "aktif"
                },
            })
            
            return {
                status: 200,
                message: "Berhasil Mendapat seluruh post aktif",
                data: post
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mendapat seluruh post aktif",
                data: null
            }
        }
    }


}

module.exports = PostService