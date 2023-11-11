const {
    PrismaClient
} = require('@prisma/client');
const { request } = require('express');
   
const prisma = new PrismaClient();

class SaldoService {
    static async createSaldo(user) {
        try {
            const saldo = await prisma.saldo.create({
                data: {
                    user_id: user.id,
                    saldo: 0
                }
            })
            return {
                status: 200,
                message: "Berhasil membuat saldo",
                data: saldo
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal membuat saldo",
                data: null
            }
        }
    }

    static async getSaldo(user) {
        try {
            const saldo = await prisma.saldo.findUnique({
                where: {
                    jastiper_id: Number(user.id)
                }
            })
            return {
                status: 200,
                message: "Berhasil mendapatkan saldo",
                data: saldo
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal mendapatkan saldo",
                data: null
            }
        }
    }

    static async updateSaldo(data, user) {
        try {
            const saldo = await prisma.saldo.update({
                where: {
                    jastiper_id: Number(user.id)
                },
                data: {
                    saldo: Number(data.saldo)
                }
            })

            return {
                status: 200,
                message: "Berhasil mengubah saldo",
                data: saldo
            }
        } catch(err) {
            return {
                status: 500,
                message: "Gagal Mengubah saldo",
                data: null
            }
        }
    }
}

module.exports = SaldoService;