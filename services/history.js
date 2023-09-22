const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
class HistoryService {

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
                     }
                   },
                   users :{
                    select :{
                        id: true,
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
                        jastiper_post: {
                            select: {
                                judul: true,
                            }
                        }
                    }
                   }
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