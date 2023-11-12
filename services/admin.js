const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { countUser, Riyawat } = require('../tools/index')
class AdminService {

    static detailJastip = async (id) => {
        try {
            let riyawat = []
            const jastip = await prisma.users.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    user_details: true,
                }
            })
            delete jastip.password

            const dataTotal = await prisma.users.findMany({
                where: {
                    id: Number(id)
                },
                select: {
                    saldo: true
                }
            })

            const history = await prisma.history.findMany({
                where: {
                    id_jastip: Number(id)
                }
            })

            jastip.saldo = dataTotal[0].saldo.saldo
            history.forEach(async (item) => {
                let ri = await Riyawat(item.id_user, item.orders_id, item.payment_id)
                console.log(ri, 'ini ri');
                await riyawat.push(ri)
                console.log(riyawat, 'ini riyawat');
            })
            jastip.riyawat = riyawat
            return {
                status: 200,
                message: "Berhasil Mendapat User",
                data: jastip
            }
        } catch (err) {
            console.log('ini er' + err);
            return {
                status: 500,
                message: "Gagal Mendapat User",
                data: null
            }
        }
    }

    static async countUsers(id) {
        try {
            const count = await countUser(id)
            return {
                status: 200,
                message: "Berhasil Mendapat User",
                data: count
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mendapat User",
                data: null
            }
        }
    }
    static async dataUsers() {
        try {
            const data = await prisma.users.count({
                where: {
                    role_id: 2,
                }
            })
            return {
                status: 200,
                message: "Berhasil mendapat user",
                data: data
            }
        } catch (err) {
            return {
                status: 500,
                message: "gagal mendapat user",
                data: null
            }
        }
    }

    static async dataJastip() {
        try {
            const data = await prisma.users.count({
                where: {
                    role_id: 3
                }
            })
            return {
                status: 200,
                message: "Berhasil Mendapat Jastiper",
                data: data
            }
        } catch (err) {
            return {
                status: 500,
                message: "gagal mendapat user",
                data: null
            }
        }
    }

    static async TotalSemuaJastip(id) {
        try {
            const history = await prisma.history.findMany({
                include: {
                    payment: {
                        select: {
                            amount: true
                        }
                    }
                }
            })
            history.forEach((item) => {
                totalPendapatan += Number(item.payment.amount)
            })
            return {
                status: 200,
                message: "Total Berhasil Didapat",
                data: history
            }
        } catch (err) {
            return {
                status: 500,
                message: "Total Gagal Didapat",
                data: null
            }
        }
    }

    static async validateJastip(data) {
        try {
            const id = Number(data.id)
            const jastip = await prisma.users.update({
                where: {
                    id: Number(id)
                },
                data: {
                    saldo: {
                        create: {
                            saldo: 0
                        }
                    }
                }
            })
            return {
                status: 200,
                message: "Berhasil Validasi",
                data: jastip
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Validasi",
                data: null
            }
        }
    }
}

module.exports = AdminService;