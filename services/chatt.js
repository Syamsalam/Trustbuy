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
            const chatt = await prisma.chatt.findMany({
                where: {
                    OR : [
                        {
                            receiver_id : userId,
                            sender_id : userId
                        }
                    ]
                },
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

    static async getChatt(senderId, receiver_id) {
        try {
            const chatt = await prisma.chatt.findMany({
                where: {
                    AND : [
                        {
                            receiver_id : senderId,
                            sender_id : receiver_id
                        }
                    ]
                },
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
