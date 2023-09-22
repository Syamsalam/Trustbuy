const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AdminService {
    
    static async dataUsers() {
        try{ 
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
        try{
            const data = await prisma.users.count({
                where: {
                    role_id: 3
                }
            })
            return {
                status:200,
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
                status:500,
                message: "Total Gagal Didapat",
                data: null
            }
         }
    }
}

module.exports = AdminService