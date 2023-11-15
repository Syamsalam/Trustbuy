const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PostService {
    static async createPost(_data, users) {
        try {

            const user = await prisma.users.findUnique({
                where: {
                    id: Number(users.id)
                }
             })

             let createdPost = _data

            createdPost.user_id = Number(user.id)
            createdPost.aktif = "aktif"

            console.log(createdPost)
            const post = await prisma.jastiper_post.create({
                data : createdPost
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

    static async updatePost(data) {
        try {

            const post = await prisma.jastiper_post.update({
                where: {
                    id: Number(data.id)
                },
                data: data
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
            
            const post = await prisma.jastiper_post.update({
                where: {
                    id: Number(id)
                },
                data: {
                    status: "Delete",
                    aktif: "non_aktif",
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
                data: err.message
            }
        }
    }

    static async getPost(user) {
        try {
            const post = await prisma.jastiper_post.findMany({
                where: {
                    user_id: Number(user.id),
                    status: "Aktif"
                }
            })
            
            if(post.length === 0) return {
                status: 204,
                message: "Post 0",
                data: null
            }

            return {
                status: 200,
                message: "Berhasil Mengambil Post",
                data: post
            }
        } catch (err) {
            console.log(err)
            return {
                status: 500,
                message: "Gagal Mengambil Post",
                data: err.message
            }
        }
    }

    static async getPostId(id) {
        try {
            const post = await prisma.jastiper_post.findUnique({
                where: {
                    id: Number(id)
                }
            })

            return {
                status: 200,
                message: "Berhasil Mengambil Post",
                data: post
            }
        } catch (err) {
            return {
                status : 500,
                message : "Gagal Mengambil Post",
                data: null
            }
        }
    }

    static async getAllPost() {
        try {
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
            const user = await prisma.jastiper_post.findMany({
                where: {
                    aktif: "aktif",
                    status: "Aktif"

                },  
                include: {
                    users: {
                        select: {
                            
                            user_details: {
                                select: {
                                    nama : true,
                                    nomor_telepon: true
                                }
                            },
                            image: {
                                select: {
                                    image: true
                                }
                            }
                        }
                    }

                },
            })

            // const post = await prisma.jastiper_post.findMany({
            //     where: {
            //         aktif: "aktif"
            //     }
            // })

            if(user.length === 0) return {
                status: 200,
                message: "Tidak ada Postingan",
                data: null
            }

            return {
                status: 200,
                message: "Berhasil Mendapat seluruh post aktif",
                data: user
            }
        } catch (err) {
            console.log(err)
            return {
                status: 500,
                message: "Gagal Mendapat seluruh post aktif",
                data: null
            }
        }
    }

    static async checkStatusPost(user) {
        try {

                const users = await prisma.users.findFirst({
                    where: {
                        id: Number(user.id)
                    },
                    select: {
                        saldo: {
                            select: {
                                saldo: true,
                            }
                        }
                    }
                })

                if(users.saldo.saldo < 10000) return {
                    status: 204,
                    message: "Saldo anda kurang dari 10000",
                    data: null
                }

                const post = await prisma.jastiper_post.findMany({
                    where: {
                        user_id: Number(user.id),
                        status: "Aktif"
                    },
                    select: {
                        aktif: true
                    }
                })



    
                if(post.length == 0) return {
                    status: 404,
                    message: "belum ada post",
                    data: null
                }
            


            return {
                status: 200,
                message: "Berhasil Mengambil Post",
                data: post
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mengambil Status",
                data: null
            }
        }
    }

    static async toggleAktifJastip(user) {
        try {
            
            const prev = await prisma.users.findFirst({
                where: {
                    id: Number(user.id)

                },
                select : {
                    id: true,
                    jastiper_post: {
                        select: {
                            aktif: true
                        }
                    },
                    saldo: {
                        select: {
                            saldo: true,
                        }
                    }
                }
            })

            if(prev.saldo.saldo < 10000) {
                await prisma.jastiper_post.updateMany({
                    where: {
                        users: {
                            id: prev.id
                        },
                        status: "Aktif"
                    },
                    data: {
                        aktif: "non_aktif"
                    }
                })
                return {
                    status : 204,
                    message : "Saldo anda kurang dari 10000",
                    data : null
                }
            } else{

                await prisma.jastiper_post.updateMany({
                    where : {
                        users : {
                            id: Number(user.id)
                        },
                        status: "Aktif"
                    },
                    data : {
                        aktif : prev.jastiper_post[0].aktif == "aktif" ? "non_aktif" : "aktif"
                    }
                })
                
                return {
                    status : 200,
                    message : "Berhasil Mengubah Status",
                    data : null
                }
            }

        } catch (err) {
            return {
                status : 500,
                message : "Gagal Mengubah Status",
                data : err.message
            }
        }
    }
}

module.exports = PostService