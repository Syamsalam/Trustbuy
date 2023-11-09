const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
class HistoryService {

    //create history
    static async createHistory(id,users) {
        try{

            const user = await prisma.users.findUnique({
                where: {
                    id: Number(users.id)
                },
                include: {
                    orders: {
                        where: {
                            id: Number(id)
                        },
                        select: {
                            id:true,
                            payment: {
                                select: {
                                    id: true
                                }
                            },
                            user_id: true,
                            jastip_id: true
                        }

                    },

                }
            })

            const data = user.orders[0];

            const history = await prisma.history.create({
                data: {
                    id_user: Number(data.user_id),
                    id_jastip: Number(data.jastip_id),
                    id_payment: Number(data.payment.id),
                    id_order: Number(data.id),
                    history_time: new Date()
                }
            })
            return {
                status: 200,
                message: "Berhasil Membuat History",
                data: history,
            }
        } catch(err) {
            return {
                status: 500,
                message: "Gagal Membuat History",
                data: err.message,
            }
        }
    }    

    //ini ke jastip
    static async historyJastip(user) {
        try{
            const history = await prisma.history.findMany({
                where: {
                    id_jastip:Number(user.id)
                },
                include:{
                   payment:{
                     select:{
                        amount: true,
                        payment_date: true
                     }
                   },
                   users_history_id_jastipTousers: {
                    select:{
                        jastiper_post: {
                            select: {
                                judul: true,
                            }
                        }
                    }
                   },
                   orders: {
                    select: {
                        jastiper_post: {
                            select: {
                                judul: true
                            }
                        }
                    }
                   },
                   
                }
            })

            let totalAmount = 0
            history.forEach((item)=>{
                totalAmount += Number(item.payment.amount)
            })

            history.push({
                totalAmount
            })  
            return {
                status: 200,
                data: history,
                message: 'success get history jastip'
            }
        }catch(err){
            return {
                status: false,
                data: null,
                message: err.message
            }
        }
    }

    //ini ke user
    static async historyUser(user) {
        try{
            const history = await prisma.history.findMany({
                where: {
                    id_user:Number(user.id),
                    // history_time:{
                    //     gte:time
                    // }
                },
                include: {
                    users: {
                        select: {
                            username: true,
                            user_details: {
                                select: {
                                    nama:true,
                                }
                            }
                        }
                    },
                    users_history_id_jastipTousers: {
                        select:{
                            jastiper_post: {
                                select: {
                                    judul: true,
                                }
                            }
                        }
                    }
                }
            })
            return {
                status: 200,
                data: history,
                message: 'success get history user'
            }
        }catch(err){
            return {
                status: 500,
                data: null,
                message: err.message
            }
        }
    }

    //ini ke jastip
    static async historyJastipDetail(user) {
        try{
            const history = await prisma.history.findMany({
                where: {
                    id_jastip:Number(user.id)
                },
                include:{
                   payment:{
                     select:{
                        amount: true,
                     }
                   },
                   users :{
                    select :{
                        username: true,
                        user_details:{
                            select:{
                                nama : true,
                            }
                        }
                    }
                   },
                   users_history_id_jastipTousers: {
                    select:{
                        jastiper_post: true
                    }
                   },
                   orders: {
                    select: {
                        order_items: true
                    }
                }
                }
            })

            let totalAmount = 0
            history.forEach((item)=>{
                totalAmount += item.payment.amount
            })
            return {
                status: 200,
                data: history,
                message: 'success get history jastip'
            }
        }catch(err){
            return {
                status: false,
                data: null,
                message: err.message
            }
        }
    }

    //ini ke user
    static async historyUserDetails(user) {
        try {
            const history = await prisma.history.findMany({
                where:{
                    id_user: Number(user.id)
                },
                include: {
                    payment: {
                        select: {
                            amount: true,
                        }
                    },
                    users: {
                        select: {
                            username: true,
                            user_details: {
                                select: {
                                    nama:true,
                                }
                            }
                        }
                    },
                    users_history_id_jastipTousers: {
                        select:{
                            jastiper_post: true,
                        }
                    },
                    orders: {
                        select: {
                            order_items: true
                        }
                    }
                }
            })

            return {
                status :  200 ,
                message: "success get history user",
                data: history
            }
        } catch (err) {
            return {
                status: false,
                message: err.message,
                data: null
            }
        }
    }
}

module.exports = HistoryService;