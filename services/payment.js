const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PaymentService {

    static async pendapatanApp(user) {
        try {

            //Mengambil subtotal order_item user dari semua order
            const order = await prisma.orders.findMany({
                where: {
                    user_id: Number(user.id)
                },
                include: {
                    order_items: {
                        select: {
                            subtotal: true,
                        }
                    }
                }
            })


            let totalSubtotal = 0;

            
            order.forEach((items) => {
                items.order_items.forEach((item) => {
                    totalSubtotal += Number(item.subtotal)
                })
            })




            //mengambil ongkir dari payment yang diisi oleh user
            const payment = await prisma.payment.findMany({
                where: {
                    order_id: Number(user.id)
                }
            })

            payment.forEach((item) => {
                item.total_pembayaran = item.amount + item.biaya_ongkir + (item.amount * 0.04);
            })

            return {
                status: 200,
                message: "Berhasil mendapat data payment",
                data: order
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal mendapat data payment",
                data: err.message
            }
        }
    }

    static async getBiayaJastip(order_id) {
        try {
            const payment = await prisma.payment.findFirst({
                where: {
                    order_id: Number(order_id)
                },
                select: {
                    total_pembayaran: true
                }
            })

            return {
                status: 200,
                message: "Berhasil mendapat data payment",
                data: payment
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal mendapat data payment",
                data: err.message
            }
        }
    }

}

module.exports = PaymentService;