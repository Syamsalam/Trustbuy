const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PaymentService {
    static async pendapatanApp(user) {
        const payment = await prisma.payment.findMany({
            where: {
                order_id: Number(user)
            }
        })
    }
}

module.exports = PaymentService;