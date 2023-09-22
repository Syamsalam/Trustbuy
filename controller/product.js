const { roleValidations } = require('../middleware/authValidation');
const handleServerResponse = require('../middleware/generateRespon');
const ProductService = require('../services/product')

class ProductController {

    static CreateProduct = roleValidations(1,async (req,res,next) => {
        try{
            const product = await ProductService.addProduct(req.body);
            return handleServerResponse(res,product.status,product.message,product.data);
        } catch (err) {
            next(err)
        }
    })

    static UpdateProduct = roleValidations(1, async (req,res,next) => {
        try{
            const product = await ProductService.editProduct(req.user);
            return handleServerResponse(res, product.status,product.message,product.data);
        }catch(err) {
            next(err)
        }
    })

    static DeleteProduct = roleValidations(1, async (req,res,next) => {
        try {
            const product = await ProductService.deleteProduct(req.user);
            return handleServerResponse(res, product.status,product.message,product.data);
        } catch (err) {
            next(err)
        }
    })
}

module.exports = ProductController;