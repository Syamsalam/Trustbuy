const md5 = require('md5')
const sha256 = require('sha256')
const base64img = require('base64-img')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateHashedPassword = (password) => md5(sha256(password));


const ImageBase64 = (image) => {
    try {
        const { path } = image
        const data = base64img.base64Sync(path)
        return data;
    } catch (err) {
        return err.message
    }
}

const searchUser = async (username) => {
    try {
        const data = await prisma.users.findUnique({
            where: {
                username: username
            }
        })
        data != null ? true : false

        return data
    } catch (err) {
        return err.message
    }
}

const createUser = async (data, idRole) => {
    try {

        const user = await prisma.users.create({
            email: data.email,
            username: data.username,
            password: generateHashedPassword(data.password),
            role: {
                connect: {
                    id: Number(idRole)
                }
            },
            user_details: {
                create: {
                    alamat: data.alamat,
                    no_hp: data.no_hp,
                    nama: data.nama,
                    nomor_telepon: data.nomor_telepon,
                    data_identifikasi: data.data_identifikasi ?? null,
                },
            },

        })


        return user
    } catch (err) {
        console.log(err.message);
        return err.message
    }
}

const countUser = async (role_id) => {
    try {
        const users = prisma.users.count({
            where: {
                role_id: Number(role_id)
            }
        })
        return users ? users : null
    } catch (err) {
        throw new Error(err.message)
    }
}


const Riwayat = async (id_user, orders_id, payment_id, history_times) => {
    console.log(id_user, orders_id, payment_id, 'ini Riwayat');
    try {
        let respon = {}
        const user = await prisma.users.findUnique({
            where: {
                id: Number(id_user)
            },
            select: {
                username: true,
            }
        })
        const orders = await prisma.orders.findUnique({
            where: {
                id: Number(orders_id)
            }
        })

        const post = await prisma.jastiper_post.findUnique({
            where: {
                id: Number(orders.post_id)
            },
            select: {
                judul:true,
            }
        })

        const payment = await prisma.payment.findUnique({
            where: {
                id: Number(payment_id)
            },
            select: {
                total_pembayaran:true,
            }
        })

        const history = {
            history_time: history_times
        }


        respon.username = user.username
        respon.judul = post.judul
        respon.payment = payment.total_pembayaran
        respon.history_time = history.history_time

        return respon
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    generateHashedPassword,
    ImageBase64,
    searchUser,
    createUser,
    countUser,
    Riwayat
}