const { PrismaClient } = require('@prisma/client');
const PostService = require('./services/post');
const UserService = require('./services/user');
const PaymentService = require('./services/payment');
const prisma = new PrismaClient()

const test = async () => {
    const post = await PostService.getPostByStatus()
    
    console.info(post.data)
}

const user = {
    id: 6,
}

test()