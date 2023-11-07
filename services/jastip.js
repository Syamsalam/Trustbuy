const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class JastipService {

    //ini ke admin
    static async listJastip() {
        try {
            const user = await prisma.users.findMany({
                where: {
                    role_id: 3
                },
                include: {
                    role: true,
                    user_details: true
                }
            })

            return {
                status: 200,
                message: "List user jastip berhasil didapatkan",
                data: user
            }
        } catch (err) {
            return {
                status: 500,
                message: err.message,
                data: null
            }
        }
    }

    //ini ke jastip
    static async isOnline(status, user) {
        try {

            const data = prisma.users.findFirst({
                where: {
                    id: Number(user.id)
                },
                include: {
                    jastiper_post: true
                }
            })

            if (data) {
                await prisma.users.update({
                    where: {
                        id: Number(user.id)
                    },
                    data: {
                        jastiper_post: {
                            status: status
                        }
                    }
                })
            }



            let message = ''
            if (status == 'aktif') {
                message = 'Jastip Online'
            } else {
                message = 'Jastip Offline'
            }
            return {
                status: 200,
                message: message,
                data: null
            }
        } catch (err) {
            return {
                status: 500,
                message: err.message,
                data: null
            }
        }
    }

    static async editJastip(user, data) {
        try {
            const idUser = user.id
            const user_details_update = data.user_details
            console.log(idUser)

            const users = await prisma.users.update({
                where: {
                    id: Number(idUser)

                },
                data: {
                    user_details: {
                        update: user_details_update
                    }
                }
            })

            const datas = await prisma.users.findUnique({
                where: {
                    id: Number(users.id)
                },
                include: {
                    user_details: true
                }
            })

            delete datas.password
            delete datas.id
            delete datas.role_id
            delete datas.user_details_id
            delete datas.user_details.data_identifikasi

            return {
                status: 200,
                message: "Berhasil Mengubah Data User",
                data: datas
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mengubah Data User",
                data: err.message
            }
        }
    }

    static async getDetailProfile(user) {
        try {
            console.log(user)
            const users = await prisma.users.findUnique({
                where: {
                    id: Number(user.id)
                },
                include: {
                    user_details: true,
                    image: {
                        select: {
                            image: true,
                        }
                    }
                }
            })

            return {
                status: 200,
                message: "Berhasil Mendapatkan Data User",
                data: users
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mendapatkan Data User",
                data: err.message
            }
        }


    }

}

module.exports = JastipService;