const { PrismaClient } = require('@prisma/client');
const PostService = require('./services/post');
const UserService = require('./services/user');
const prisma = new PrismaClient()

const test = async (id) => {
    const post = await UserService.getUser(id)
    console.log(post)
}

const body = {
    judul: "ini judul",
    deskripsi: "ini deskripsi",
    lokasi: "ini lokasi",
    aktif: "aktif"
}

test(3)