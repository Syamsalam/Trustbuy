const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
class HistoryService {

    //create history
    static async createHistory(datas,users) {
        try{

            const order = await prisma.orders.findFirst({
                where: {
                    jastip_id: Number(users.id),
                    id: Number(datas.id)
                },
                select: {
                    id: true,
                    jastip_id: true,
                    user_id: true

                }
            })
            // console.log("data : "+user);
            const pembayaran = await prisma.payment.findFirst({
                where: {
                    order_id: Number(order.id)
                }
            })

            console.log(pembayaran)


            const data = {
                id_user: order.user_id,
                id_jastip:order.jastip_id,
                payment_id:Number(pembayaran.id),
                orders_id:order.id,
                history_time: new Date()
            }


            const history = await prisma.history.create({
                data:data
            })
            return {
                status: 200,
                message: "Berhasil Membuat History",
                data: null
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
                    OR: [
                        {id_jastip:Number(user.id)},
                        {id_user:Number(user.id)}
                    ]
                },
                include:{
                   payment:{
                    select:{
                        total_pembayaran: true
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
            return {
                status: 200,
                message: 'success get history jastip',
                data: history
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
    static async historyUser(id) {
        try{
            const history = await prisma.history.findMany({
                where: {
                    OR: [
                        {id_jastip:Number(id)},
                        {id_user:Number(id)}
                    ]
                },
                include:{
                   payment:{
                    select:{
                        total_pembayaran: true
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
            return {
                status: 200,
                message: 'success get history jastip',
                data: history
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