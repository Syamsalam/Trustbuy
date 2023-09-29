const {
 PrismaClient
} = require('@prisma/client');
const { request } = require('express');

const prisma = new PrismaClient();

class UserService {
    static async getAllUsers() {
        try{
            const users = await prisma.users.findMany({
                where:{
                    role_id : 2
                },
                include:{
                    role:true,
                    user_details: true,
                }
            });
            return {
                status:200,
                message:"Berhasil mengambil data user",
                data : users
            }
        }catch(err){
           return {
                status:500,
                message:"Masalah pada saat mengambil data user",
                data : null
           }
        }
    }

    //get users
    static async getUser(id) {
        try{
            const user = await prisma.users.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    user_details: true
                }
            })
            return {
                status: 200,
                message: "Berhasil Mendapatkan Data User",
                data: user
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mendapatkan Data User",
                data: null
            }
        }
    }

    static async getDetailProfile(user){
        try {
            console.log(user)
            const users = await prisma.users.findUnique({
                where: {
                    id: Number(user.id)
                },
                include: {
                    user_details: true,
                    image: {
                        select: {
                            image: true,
                        }
                    }
                }
            })

            return {
                status: 200,
                message: "Berhasil Mendapatkan Data User",
                data: users
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal Mendapatkan Data User",
                data: err.message
            }
        }


    }

    static async getProfile(user){
        try{

            const idUser = await prisma.users.findFirst({
                where: {
                    id: Number(user.id)
                }
            })

            const data = await prisma.user_details.findUnique({
                where: {
                    id: Number(idUser.user_details_id)
                },
                include: {
                    users: {
                        select: {
                            image: {
                                select: {
                                    image: true
                                }
                            }
                        }
                    }
                }
            })

            
            

            return {
                status: 200,
                message: "Data Profil user berhasil didapat",
                data: data
            }
        } catch (err) {
            return {
                status: 500,
                message: "Data profil user gagal didapat",
                data: null
            }
        }
    }    
    //add users
    static async addUser(body) {
        try{
            const { username, email, password, role_id,user_details } = body;
            const users = await prisma.users.create({
                data: {
                    username    : username,
                    email       : email,
                    password    : password,
                    role     : {
                        connect : {
                            id : role_id
                        }
                    },
                    user_details : {
                        create: {
                            ...user_details,

                        }
                    }
                }
            })
            return {
                status:200,
                message: "Berhasil Mengubah data user",
                data : users
            }
        } catch (err) {
            return{
                status: 500,
                message: "Gagal Mengubah Data USer",
                data: err.message
            }
        }
    }

    static async editUser(user, data) {
        try{
            const user_details_update = data.user_details
            console.log(user_details_update)

            const users = await prisma.users.update({
                where: {
                    id: Number(user.id),
                    
                },
                data: {
                    user_details: {
                        update: user_details_update
                    },
                    image: {
                        update:data.image
                    }
                }
            })

            const datas = await prisma.users.findUnique({
                where: {
                    id: Number(users.id)
                },
                include: {
                    user_details: true
                }
            })

            delete datas.password
            delete datas.id
            delete datas.role_id
            delete datas.user_details_id
            delete datas.user_details.data_identifikasi

            return {
                status: 200,
                message: "Berhasil Mengubah Data User",
                data: datas
            }
        } catch (err) {
            return{
                status: 500,
                message: "Gagal Mengubah Data User",
                data: err.message
            }
        }
    }

    static async deleteUser(user) {
        try{
            const users = await prisma.users.delete({
                where: {
                    id: Number(user.id)
                }
            })
            return({
                status: 200,
                message: "Berhasil Delete Data User",
                data: users
            })
        } catch (err) {
            return{
                status: 500,
                message: "Gagal Delete Data User",
                data: null
            }
        }
    }
}

module.exports = UserService;