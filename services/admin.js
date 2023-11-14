const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { countUser, Riwayat } = require('../tools/index')
class AdminService {

    static detailJastip = async (id) => {
        try {
            let riwayat = []
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
            // history.forEach(async (item) => {
            //     let ri = await Riwayat(item.id_user, item.orders_id, item.payment_id)
            //     console.log(ri, 'ini ri');
            //     return ri;
            // })
            const promises = history.map(async (item) => {
                let ri = await Riwayat(item.id_user,item.orders_id,item.payment_id, item.history_time);
                console.log(ri, "ini adalah ri");
                return ri;
            })

            jastip.riwayat = await Promise.all(promises)
            console.log(jastip.riwayat, "ini riwayat")
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
    static async dataUsers(role_id) {
        try {
            const data = await prisma.users.count({
                where: {
                    role_id: Number(role_id),
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

    static async verifyJastip(page,search) {
        try {
            const count = await prisma.users.count({
                where: {
                    role_id: 3,
                    username: {
                        contains: search == null ? "" : search
                    }, 
                    saldo: null
                }
            })


            const jastip = await prisma.users.findMany({
                where: {
                    role_id: 3,
                    username: {
                        contains: search == null ? "" : search
                    }, 
                    saldo: null
                },
                select: {
                    email: true,
                    username: true,
                    user_details: {
                        select: {
                            nomor_telepon:true
                        }
                    }
                },
                take: 10,
                skip: (isNaN(page)?0 : page-1) * 10
            })


            jastip.forEach(jast => {
                jast.nomor_telepon = jast.user_details.nomor_telepon
                delete jast.user_details
            })

            return{
                status:200,
                message: "Berhasil Mengambil Semua Data",
                data: {users : jastip, count}
            }
        } catch(err) {
            return {
                status:500,
                message: "Gagal Mengambil semua data",
                data: err.message
            }
        }
    }

    static async detailJastipVerify(id) {
        try {
            const jastip = await prisma.users.findFirst({
                where: {
                    id: Number(id)
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    user_details: {
                        select: {
                            data_identifikasi: true,
                            alamat: true,
                            nomor_telepon: true

                        }
                    }
                }
            })

            jastip.nik = jastip.user_details.data_identifikasi
            jastip.nomor_hp = jastip.user_details.nomor_telepon
            jastip.alamat = jastip.user_details.alamat

            delete jastip.user_details

            return{
                status:200,
                message: "Berhasil Mengambil Data Jastip",
                data:jastip
            }
        } catch(err) {
            console.log(err)
            return{
                status:500,
                message: "Gagal Mengambil Data jastip",
                data: null
            }
        }
    }

    static async updateSaldo(id,saldo) {
        try{
            const saldos = await prisma.saldo.findUnique({
                where: {
                    jastiper_id: Number(id)
                }
            })

            let updatedSaldo = saldos.saldo + saldo

            const saldoUpdate = await prisma.saldo.update({
                where: {
                    jastiper_id: Number(id)
                },
                data: {
                    saldo: Number(updatedSaldo)
                }
            })

            return{
                status:200,
                message: "Berhasil Update Saldo",
                data: saldoUpdate
            
            }
        } catch(err) {
            console.log(err)
            return{
                status:500,
                message: "Gagal Update Saldo",
                data: err
            }
        }
    }
}

module.exports = AdminService;