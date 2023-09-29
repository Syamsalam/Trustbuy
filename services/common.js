const {PrismaClient} = require('@prisma/client');
const { date } = require('joi');
const { use } = require('../router');
const prisma = new PrismaClient();

class CommonSercive {

    //ini ke admin
    static async listProfil(id, role_id) {
        try{
            const users = await prisma.users.findUnique({
                where: {
                   id_role_id:{
                    id : Number(id),
                    role_id : role_id
                   }
                },
                include:{
                    user_details : true
                }

            })
            delete users.password;

            return{
                staatus: 200,
                message: "Berhasil Mendapatkan data user",
                data: users
            }
        } catch (err) {
            return {
                status: 500,
                message: "Gagal mendapatkan user",
                data: err.message
            }
        }
    }

    //ini semuanya
    static async getImage(req,res){
        try {
            
        } catch {

        }
    }

    static async getProfile(user) {
        console.log("🚀 ~ file: common.js:49 ~ CommonSercive ~ getProfile ~ user:", user)
        try {
            const profile = await prisma.users.findUnique({
                where: {
                    id: Number(user.id)
                },
                include: {
                    user_details: true
                }
            })
            delete profile.password
            return {
                status: 200,
                message: "Berhasil mendapatkan data profile",
                data: profile
            }
        }catch(err){
            return {
                status: 500,
                message: "Gagal mendapatkan user",
                data: err.message
            }
        }
    }

    
}

module.exports = CommonSercive