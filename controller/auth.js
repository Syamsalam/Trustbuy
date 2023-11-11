const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const {
    generateHashedPassword,
    searchUser,
    createUser
} = require('../tools')

const {
    config
} = require('../auth/passport-jwt');
const { createSaldo } = require('../services/saldo');

class AuthController {

    static async register(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: errors.array(),
                data: "Kelengkapan data tidak sesuai"
            })
        }
        const { username } = req.body
        const userExist = await searchUser(username)
        if (userExist) {
            return res.status(400).json({
                status: 400,
                message: "Username sudah digunakan , Akun tidak dapat dibuat",
                data: null
            })
        }       
        await createUser(req.body , 2)
        return res.status(200).json({
            status: 200,
            message: "Berhasil membuat user baru",
            data: null
        })
    }

    static async registerJastip(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: errors.array(),
                data: "Kelengkapan data tidak sesuai"
            })
        }
        const { username, email, password} = req.body
        const userExist = await searchUser(username)
        if (userExist) {
            return res.status(400).json({
                status: 400,
                message: "Username sudah digunakan , Akun tidak dapat dibuat",
                data: null
            })
        }
        const user = await createUser(req.body , 3)
        await createSaldo(user)
        return res.status(200).json({
            status: 200,
            message: "Berhasil membuat user baru",
            data: user
        })
    }

    static async registerAdmin(req,res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: errors.array(),
                data: "Kelengkapan data tidak sesuai"
            })
        }
        const { username } = req.body
        const userExist = await searchUser(username)
        if (userExist) {
            return res.status(400).json({
                status: 400,
                message: "Username sudah digunakan , Akun tidak dapat dibuat",
                data: null
            })
        }       
        await createUser(req.body , 1)
        return res.status(200).json({
            status: 200,
            message: "Berhasil membuat user baru",
            data: null
        })
    }

    static async login(req, res) {
        const { email, password } = req.body
        
        const user = await prisma.users.findFirst({
            where: {
                OR : [
                    {email: email},
                    {username: email}
                ]
            }
        })

        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Akun tidak ditemukan , silahkan daftar terlebih dahulu"
            })
        }

        const hashedPassword = generateHashedPassword(password)

        if (user.password !== hashedPassword) {
            return res.status(400).json({
                status: 400,
                message: "Password salah"
            })
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            username: user.username
        }, config.secret, {
            expiresIn: config.expiresIn
        })

        delete user.password

        return res.status(200).json({
            status: 200,
            message: "Berhasil login",
            data: {
                user: user,
                token: token
            }
        })
    }

    static async forgetPassword() {
        try {

        } catch (err) {
            
        }
    }
}

module.exports = AuthController