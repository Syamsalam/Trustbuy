const { roleValidations } = require('../middleware/authValidation');
const handleServerResponse = require('../middleware/generateRespon');
const AdminService = require('../services/admin');
const JastipService = require('../services/jastip');
const PostService = require('../services/post');
const ProductService = require('../services/product');
const UserService = require('../services/user');

class AdminController {

    static DetailJastip = roleValidations(1, async (req, res, next) => {
        try {
            const jastip = await AdminService.detailJastip(req.params.id);
            return handleServerResponse(res, jastip.status, jastip.message, jastip.data);
        } catch (err) {
            next(err)
        }
    })
    static CountUsers = roleValidations(1, async (req, res, next) => {
        try {
            const users = await AdminService.dataUsers();
            return handleServerResponse(res, users.status, users.message, users.data);
        } catch (err) {
            next(err)
        }
    })

    static CountJastip = roleValidations(1, async (req, res, next) => {
        try {
            const jastip = await AdminService.dataJastip();
            return handleServerResponse(res, jastip.status, jastip.message, jastip.data);
        } catch (err) {
            next(err)
        }
    })

    static TotalJastipAmount = roleValidations(1, async (req, res, next) => {
        try {
            const historyTotal = await AdminService.TotalSemuaJastip();
            return handleServerResponse(res, historyTotal.status, historyTotal.message, historyTotal.data);
        } catch (err) {
            next(err)
        }
    })

    //User delete user
    static DeleteUser = roleValidations(1, async (req, res, next) => {
        try {
            const user = await UserService.deleteUser(req.user);
            return handleServerResponse(res, user.status, user.message, user.data);
        } catch (err) {
            next(err)
        }
    })

    //Admin untuk Lihat semua user
    static AllUsers = roleValidations(1, async (req, res, next) => {
        try {
            const users = await UserService.getAllUsers(req.params.limit);
            return handleServerResponse(res, users.status, users.message, users.data);
        } catch (err) {
            next(err)
        }
    })

    static Alljastip = roleValidations(1, async (req, res, next) => {
        try {
            const jastip = await JastipService.listJastip();
            return handleServerResponse(res, jastip.status, jastip.message, jastip.data);
        } catch (err) {
            next(err)
        }
    })


    static GetAllProduct = roleValidations(1, async (req, res, next) => {
        try {
            const product = await ProductService.getAllProducts();
            return handleServerResponse(res, product.status, product.message, product.data);
        } catch (err) {
            next(err)
        }
    })

    static allPost = roleValidations(1, async (req, res, next) => {
        try {
            const post = await PostService.getAllPost();
            return handleServerResponse(res, post.status, post.message, post.data);
        } catch (err) {
            next(err);
        }
    })

    static allPostUser = roleValidations(3, async (req, res, next) => {
        try {
            const post = await PostService.getAllPost();
            return handleServerResponse(res, post.status, post.message, post.data);
        } catch (err) {
            next(err);
        }
    })


    static validateJastip = roleValidations(1, async (req, res, next) => {
        try {
            const user = await AdminService.validateJastip(req.body)
            return handleServerResponse(res, user.status, user.message, user.data);
        } catch (err) {
            next(err)
        }
    })

}

module.exports = AdminController