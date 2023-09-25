const {
    PrismaClient
} = require('@prisma/client');
const { request } = require('express');
const { subscribe } = require('../router');

const prisma = new PrismaClient();

class OrderService {

    //ini ke users
    static async getAllOrders() {
        try {
            const order = await prisma.orders.findMany({
                include: {
                    order_items: true,
                }
            })
            return {
                status: 200,
                message: "Berhasil Menampilkan data order",
                data: order
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Menampilkan Data Order",
                data: null
            }
        }
    }

    //ini ke jastip
    static async createOrder(data) {
        try {
            const { user_id, order_date, status_id, shipping_address, payment_method_id, order_items } = data;
            const order = await prisma.orders.create({
                data: {
                    user_id: user_id,
                    order_date: order_date,
                    status_id: status_id,
                    shipping_address: shipping_address,
                    payment_method_id: payment_method_id,
                    order_items: {
                        createMany: {
                            data: order_items
                        }
                    }
                }
            })
            return {
                status: 200,
                message: "Berhasil Menambahkan Data Order",
                data: order
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Menambahkan Data Order",
                data: err.message
            }
        }
    }

    static async createPayment(id,_data) {
        try{

            const payment = await prisma.orders.update({
                where: {
                    id: Number(id)
                },
                data: {
                    payment: _data
                }
                
            })

            return{
                status : 200,
                message: "Berhasil menambahkan payment",
                data: payment
            }
        } catch(err) {

        }
    }

    //ini ke jastip
    static async editOrder(id,_data) {
        try {
            const order = await prisma.orders.update({
                where: {
                    id: Number(id)
                },
                data: _data
            })
            return {
                status: 200,
                message: "Berhasil Mengubah Data Order",
                data: order
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mengubah Data Order",
                data: null
            }
        }
    }

    //ini ke jastip
    static async deleteOrder(user) {
        try {
            const orderId = Number(user.id);
            await prisma.order_items.deleteMany({
                where: {
                    order_id: orderId
                }
            })

            const order = await prisma.orders.delete({
                where: {
                    id: Number(user.id)
                }
            })
            return {
                status: 200,
                message: " Berhasil menghapus data order",
                data: order
            }
        } catch (err) {
            return {
                status: 500,
                message: " Gagal menghapus data order ",
                data: err.message
            }
        }
    }
}

module.exports = OrderService;