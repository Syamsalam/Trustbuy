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

    static async getProfile(user){
        try{
            const users = await prisma.user_details.findUnique({
                where: {
                    id: Number(user.id)
                }
            })
            return {
                status: 200,
                message: "Data Profil user berhasil didapat",
                data: users
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

    static async editUser(user) {
        try{
            const users = await prisma.users.update({
                where: {
                    id: Number(user.id),
                    
                },
                data: _data
            })
            return {
                status: 200,
                message: "Berhasil Mengubah Data User",
                data: users
            }
        } catch (err) {
            return{
                status: 500,
                message: "Gagal Mengubah Data User",
                data: err
            }
        }
    }

    static async deleteUser(user) {
        try{
            const user = await prisma.users.delete({
                where: {
                    id: Number(user.id)
                }
            })
            return({
                status: 200,
                message: "Berhasil Delete Data User",
                data: user
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