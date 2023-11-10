const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ChattService {
    // CREATE
    static async createChatt(chattData) {
        try {
            const chatt = await prisma.chatt.create({
                data: chattData,
            });
            return {
                status: 200,
                message: 'Chatt created successfully',
                data: chatt,
            };
        } catch (err) {
            return {
                status: 500,
                message: 'Failed to create chatt',
                data: err.message,
            };
        }
    }

    // READ
    static async getChattAll(userId) {
        try {
            // console.log(userId)
            const users = await prisma.users.findMany({
                where: {


                    
                    id: {
                        not: userId
                    }

                },
                select: {
                    id: true,
                    username : true,
                    image : true,
                    chatt_chatt_receiver_idTousers: {
                        take: 1,
                        where : {
                            sender_id : userId
                        },
                        orderBy : {
                            created_at : "desc"
                        }
                    },
                    chatt_chatt_sender_idTousers : {
                        take : 1,
                        where : {
                            receiver_id : userId
                        },
                        orderBy : {
                            created_at : "desc"
                        }
                    }
                    
                }

            })

            const resultUsers = users.map(el => {
                
                if (el.id == userId) return null
                const senderNew = el.chatt_chatt_sender_idTousers[0]
                const receiverNew = el.chatt_chatt_receiver_idTousers[0]

                if (senderNew != null && receiverNew != null) {
                    return senderNew.created_at > receiverNew.created_at ? { id: el.id,username : el.username, image : el.image, chat: senderNew } : { id: el.id, username : el.username, image : el.image,chat: receiverNew }
                }
                else if (senderNew == null && receiverNew != null) {
                    return { id: el.id,username : el.username, image : el.image, chat: receiverNew }
                } else if (senderNew != null && receiverNew == null) {
                    return { id: el.id,username : el.username, image : el.image, chat: senderNew }
                }

                return null
            })

            return {
                status: 200,
                message: 'Chatt retrieved successfully',
                data: resultUsers.filter(Boolean).sort((a,b) => {
                    b.chat.created_at - a.chat.created_at
                }),
            };
        } catch (err) {
            return {
                status: 500,
                message: 'Failed to retrieve chatt',
                data: err.message,
            };
        }
    }

    static async getChatt(senderId, receiver_id) {
        try {
            const chatt = await prisma.chatt.findMany({
                where: {
                    OR: [
                        {
                            receiver_id: senderId,
                            sender_id : receiver_id
                          },
                          {
                            sender_id: senderId,
                            receiver_id : receiver_id
                          }
                    ]
                },
                orderBy : {
                    created_at : "desc"
                }
            });
            return {
                status: 200,
                message: 'Chatt retrieved successfully',
                data: chatt,
            };
        } catch (err) {
            return {
                status: 500,
                message: 'Failed to retrieve chatt',
                data: err.message,
            };
        }
    }


}

module.exports = ChattService;
