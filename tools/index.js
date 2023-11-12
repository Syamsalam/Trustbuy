const md5 = require('md5')
const sha256 = require('sha256')
const base64img = require('base64-img')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateHashedPassword = (password) => md5(sha256(password));


const ImageBase64 = (image) => {
    try{
        const {path} = image
        const data = base64img.base64Sync(path)
        return data;
    } catch (err) {
        return err.message
    }
}

const searchUser =  async (username) => {
    try{    
        const data = await prisma.users.findUnique({
            where: {
                username: username
            }
        })
        data != null ? true : false

        return data
    }catch(err){
        return err.message
    }
}

const createUser = async (data , idRole) => {
    try{

        const user = await prisma.users.create({
            email: data.email,
            username: data.username,
            password: generateHashedPassword(data.password),
            role : {
                connect:{
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
    }catch(err){
        console.log(err.message);
        return err.message
    }
}

module.exports = {
    generateHashedPassword,
    ImageBase64,
    searchUser,
    createUser
}