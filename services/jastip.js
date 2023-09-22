const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

class JastipService {

    //ini ke admin
    static async listJastip() {
        try{
            const user = await prisma.users.findMany({
                where:{
                    role_id:3
                },
                include:{
                    role:true,
                    user_details:true
                }
            })

            return {
                status:200,
                message:"List user jastip berhasil didapatkan",
                data:user
            }
        }catch(err){
            return {
                status:500,
                message:err.message,
                data:null
            }
        }
    }

    //ini ke jastip
    static async isOnline(status,user) {
        try{
            await prisma.users.update({
                where: {
                    id: Number(user.id)
                },
                data :{
                    jastiper_post :{
                        status : status
                    }
                }
            })

            let message = '' 
            if(status == 'aktif'){
                message = 'Jastip Online'
            }else{
                message = 'Jastip Offline'
            }
            return {
                status:200,
                message: message,
                data:null
            }
        }catch(err){
            return {
                status:500,
                message:err.message,
                data:null
            }
        }
    }

    static async editJastip(_data,id) {
        try{
            const jastip = await prisma.users.update({
                where: {
                    id: Number(id)
                },
                data: _data
            })
            return {
                status: 200,
                message: "Berhasil Mengubah Data Jastip",
                data: jastip
            }
        } catch (err) {
            return{
                status: 500,
                message: "Gagal Mengubah Data Jastip",
                data: err
            }
        }
    } 
}

module.exports = JastipService;