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

    static async createOrder(data) {
        try {
            const datas = data.order
            // console.log(datas)
            const order = await prisma.orders.create({
                data: {
                    ...datas,
                }
            })

            // console.log(order)
            return {
                status: 200,
                message: "Berhasil Membuat Order",
                data: order
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Membuat Order",
                data: err.message
            }
        }
    }

    //ini ke jastip
    static async createOrderItems(data,user) {
        try {
            // console.log(data)

            const order = await prisma.orders.findFirst({
                where: {
                    id: Number(data.id)
                },
                include: {
                    order_items: true,
                    payment: true
                }

            })

            const getSaldo = await prisma.saldo.findUnique({
                where: {
                    jastiper_id: Number(user.id)
                }
            })

            if(getSaldo.saldo <= 0) {
                return {
                    status: 204,
                    message: "Saldo anda tidak mencukupi",
                    data: null
                }
            }


            if (order != null) {

                if (data?.order_items != null) {
                    const create_order_items = await prisma.order_items.createMany({
                        data: data.order_items
                    })
                }

                if (data?.payment != null) {

                    const order_items = await prisma.order_items.findMany({
                        where: {
                            order_id: order.id
                        }
                    })

                    const totalSubtotal = order_items.reduce((total, item) => {
                        return total + (Number(item.subtotal) || 0);
                    }, 0);

                    let createdPayment = {
                        order_id: 0,
                        // payment_date: "", //belum ada
                        amount: 0,
                        biaya_ongkir: 0,
                        biaya_app: 0,
                        biaya_jastip: 0,
                        total_pembayaran: 0,
                    }

                    createdPayment.order_id = Number(data.id)
                    
                    createdPayment.amount = Number(totalSubtotal)

                    const keuntungan = (Number(totalSubtotal) * 0.04)/2;

                    createdPayment.biaya_ongkir = Number(data.payment.biaya_ongkir)
                    createdPayment.biaya_jastip = Number(keuntungan)
                    createdPayment.biaya_app = Number(keuntungan)

                    createdPayment.total_pembayaran = Number(totalSubtotal) + Number(createdPayment.biaya_app) + Number(createdPayment.biaya_jastip) + Number(createdPayment.biaya_ongkir)



                    const updatedSaldo = Number(getSaldo.saldo) - Number(createdPayment.biaya_app)
                    
                    if(updatedSaldo < 0) {

                        await prisma.order_items.deleteMany({
                            where: {
                                order_id: Number(order.id)
                            }
                        })

                        return {
                            status: 204,
                            message: "Saldo anda tidak mencukupi",
                            data: null
                        }
                    } else {
                        
                        await prisma.saldo.update({
                            where: {
                                jastiper_id: Number(user.id)
                            },
                            data: {
                                saldo: Number(updatedSaldo)
                            }
                        })
                    }
 
                    
                    await prisma.payment.create({
                            data: createdPayment
                    })

                    await prisma.orders.update({
                        where: {
                            id: Number(data.id)
                        },
                        data: {
                            status_id: 4
                        }
                    })
                }

            }

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

    static async updateOrderItems(id, data) {
        try {
            const order = await prisma.orders.update({
                where: {
                    id: Number(id)
                },
                include: {
                    order_items: {
                        where: {
                            id: Number(data.id)
                        },

                    },
                    payment: true,
                }
            })

            const order_items = await prisma.order_items.findMany({
                where: {
                    order_id: Number(order.id)
                }
            })

            const totalSubtotal = order_items.reduce((total, item) => {
                return total + (Number(item.subtotal) || 0);
            }, 0);
            let createdPayment = {
                order_id: 0,
                // payment_date: "", //belum ada
                amount: 0,
                biaya_ongkir: 0,
                biaya_app: 0,
                biaya_jastip: 0,
                total_pembayaran: 0,
            }

            createdPayment.order_id = Number(data.id)
            
            createdPayment.amount = Number(totalSubtotal)

            const keuntungan = (Number(totalSubtotal) * 0.04)/2;

            createdPayment.biaya_ongkir = Number(data.payment.biaya_ongkir)
            createdPayment.biaya_jastip = Number(keuntungan)
            createdPayment.biaya_app = Number(keuntungan)

            createdPayment.total_pembayaran = Number(totalSubtotal) + Number(createdPayment.biaya_app) + Number(createdPayment.biaya_jastip) + Number(createdPayment.biaya_ongkir)

                await prisma.payment.update({
                    where: {
                        id: Number(order?.payment?.id)
                    },
                    data: createdPayment
                })

            return {
                status: 200,
                message: "Berhasil Mengubah Status Order",
                data: order
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mengubah Status Order",
                data: null
            }
        }
    }

    static async deleteOrderItems(id) {
        try {
            const order = await prisma.order_items.delete({
                where: {
                    id: Number(id)
                }
            })
            return {
                status: 200,
                message: " Berhasil menghapus data order",
                data: null
            }
        } catch (err) {
            return {
                status: 500,
                message: " Gagal menghapus data order ",
                data: err.message
            }
        }
    }

    static async getOrderItems(data) {
        try {
            // console.log(data)
            const order = await prisma.orders.findUnique({
                where: {
                    id: Number(data)
                },
                include: {
                    order_items: true,
                    jastiper_post: {
                        select: {
                            judul: true
                        }
                    },
                    payment: {
                        where: {
                            order_id: Number(data)
                        }
                    }
                }
            })

            // console.log(order)

            delete order.order_date
            delete order.shipping_address
            delete order.user_id
            delete order.jastip_id

            return {
                status: 200,
                message: "Berhasil Mendapatkan Data Order",
                data: order
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mendapatkan Data Order",
                data: err.message
            }
        }
    }

    static async createPayment(id, _data) {
        try {

            const payment = await prisma.orders.update({
                where: {
                    id: Number(id)
                },
                data: {
                    payment: _data
                }

            })

            return {
                status: 200,
                message: "Berhasil menambahkan payment",
                data: payment
            }
        } catch (err) {

        }
    }

    //ini ke jastip
    static async editOrder(data) {
        try {
            // console.log(data)
            const order = await prisma.orders.update({
                where: {
                    id: Number(data.id)
                },
                select: {
                    status_id: data.status_id
                }

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
                data: err.message
            }
        }
    }

    //ini ke jastip
    static async deleteOrder(id) {
        try {
            // const orderId = Number(data.id);
            // await prisma.order_items.deleteMany({
            //     where: {
            //         order_id: orderId
            //     }
            // })

            // console.log(id)
            const order = await prisma.orders.delete({
                where: {
                    id: Number(id)
                }
            })
            return {
                status: 200,
                message: " Berhasil menghapus data order",
                data: null
            }
        } catch (err) {
            return {
                status: 500,
                message: " Gagal menghapus data order ",
                data: err.message
            }
        }
    }

    static async getOrderByStatus(user) {
        try {

            // console.log(user)
            const orderliat = await prisma.orders.findMany({
                where: {
                    NOT: {
                        status_id: Number(9)
                    },
                    jastip_id: Number(user.id)
                },
                include: {
                    jastiper_post: true,
                    order_items:true,
                    status:true,
                    users: {
                        select: {
                            user_details: {
                                select: {
                                    nama: true,
                                    nomor_telepon: true
                                }
                            },
                            image: {
                                select: {
                                    image: true
                                }
                            },
                            id: true,
                            username: true
                        }
                    },
                }
            })

            // const orderterima = await prisma.orders.findMany({
            //     where: {
            //         status_id: Number(3),
            //         jastip_id: Number(user.id)
            //     },
            //     include: {
            //         jastiper_post: true,
            //         users: {
            //             include: {
            //                 user_details: {
            //                     select: {
            //                         nama: true,
            //                         nomor_telepon: true
            //                     }
            //                 },
            //                 image: {
            //                     select: {
            //                         image: true
            //                     }
            //                 }

            //             }
            //         },
            //         order_items: true
            //     }
            // })

            // const allOrder = orderliat.concat(orderterima);

            // console.info(allOrder)
            return {
                status: 200,
                message: "Berhasil Mendapat seluruh post titip",
                data: orderliat
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mendapat Seluruh post titip",
                data: err.message
            }
        }
    }

    static async updateOrderStatus(data) {
        try {
            // console.log(data)
            const order = await prisma.orders.update({
                where: {
                    id: Number(data.id)
                },
                data: {
                    status_id: Number(data?.status_id),
                }
            })
            return {
                status: 200,
                message: "Berhasil Mengubah Status Order",
                data: order
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mengubah Status Order",
                data: err.message
            }
        }
    }

    static async updateOrderVerify(data) {
        try {
            // console.log(data)
            const order = await prisma.orders.update({
                where: {
                    id: Number(data.id)
                },
                data: {
                    status_id: Number(data.status_id),
                }
            })

            if(order.status_id === 9) {
                await prisma.orders.update({
                    where: {
                        id: Number(data.id)
                    },
                    data: {
                        verification: 'confirm'
                    }
                
                })
            }

        
            return {
                status: 200,
                message: "Berhasil Mengubah Status Order",
                data: order
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mengubah Status Order",
                data: err.message
            }
        }
    }

    // static async getOrderVerify(data)


    //for user
    static async getOrderUser(user) {
        try {
            const order = await prisma.orders.findMany({
                where: {
                    user_id: Number(user.id),
                    OR: [{
                        status_id: Number(3)
                    }, 
                    {
                        status_id: Number(5)
                    },
                    {
                        status_id: Number(4)
                    },
                    {
                        status_id: Number(2)
                    },
                    {
                        status_id: Number(6)
                    },
                    {
                        status_id: Number(7)
                    },
                    {
                        status_id: Number(8)
                    }
                ]
                },
                include: {
                    jastiper_post: true,
                    users_orders_jastip_idTousers: {
                        select: {
                            user_details: {
                                select: {
                                    nama: true,
                                    nomor_telepon: true
                                }
                            },
                            image: {
                                select: {
                                    image: true
                                }
                            },
                            username:true,
                            id: true
                        }
                    },
                    order_items: true,
                }
            })

            // console.log(order)
            return {
                status: 200,
                message: 'Berhasil Mendapat Data Order',
                data: order
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal mendapatkan order user",
                data: err.message
            }
        }
    }
}

module.exports = OrderService;