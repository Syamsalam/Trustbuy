const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductService {

  //ini ke semuanya
  static async getAllProducts() {
    try{
        const product = await prisma.products.findMany({
          include: {
            category: true,
          }
        });
        return {
            status:200,
            message:"Berhasil mengambil data product",
            data : product
        }
    }catch (err) {
         return {
                status:500,
                message:"Masalah pada saat mengambil data product ces",
                data : null
          }
    }
  }

  //ini ke jastip
  static async getProduct(id) {
    try {
      const product = await prisma.products.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          category: true
        }
      })
      return {
        status: 200,
        message: "Berhasil Mengambil Data Product",
        data: product
      }
    } catch (err) {
      return {
        status: 200,
        message: "Gagal Mengambil Data Product",
        data: null
      }
    }
  }

  //ini ke jastip
  static async addProduct(body) {
    try{
      const {product_name,description,price,stock,category_id} = body;
      const product = await prisma.products.create({
        data: {
          product_name: product_name,
          description : description,
          price       : price,
          stock       : stock,
          category_id : category_id,
        }
      })
      return {
        status: 200,
        message: "Berhasil Membuat Product Baru",
        data: product
      }
    } catch (err) {
      return {
        status: 500,
        message: "Gagal Membuat Product Baru",
        data: err
      }
    }
  }

  //ini ke jastip
  static async editProduct(user) {
    try{
      const product = await prisma.products.update({
        where: {
          id: Number(user.id),
        },
        data: {
          description: user.description,
        }
      })
      return {
        status: 200,
        message: "Berhasil Mengubah Data Product",
        data: product
      }
    } catch (err) {
      return {
        status: 500,
        message: "Gagal Mengubah Data Product",
        data: err
      }
    }
  }

  //ini ke jastip
  static async deleteProduct(user){
    try{
      const product = await prisma.products.delete({
        where: {
          id: Number(user.id),
        }
      })
      return{
        status: 200,
        message: "Berhasil Menghapus Data Product",
        data: product
      }
    } catch (err) {
      return {
        status: 500,
        message: "Gagal Menghapus Data Product",
        data: err.message
      }
    }
  }
}

module.exports = ProductService;