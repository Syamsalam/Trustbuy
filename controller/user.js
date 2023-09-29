const UserService =require('../services/user')
const { roleValidations } = require('../middleware/authValidation')
const handleServerResponse = require('../middleware/generateRespon');
const PostService = require('../services/post');

class UserController {

    //semua user
    static GetUserDetail = roleValidations(2, async (req, res , next) => {
        try{
            const user = await UserService.getDetailProfile(req.user);
            return handleServerResponse(res, user.status, user.message, user.data);
        }catch (err) {
            next(err)
        }
    })

    static async GetProfile(req,res) {
        try{
            const profile = await UserService.getProfile(req.user);
            return res.status(profile.status).json(profile.data);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    //semua user
    static CreateUser = roleValidations(1,async (req,res,next) => {
        try{
            const user = await UserService.addUser(req.body);
            return handleServerResponse(res, user.status,user.message,user.data);
        } catch (err) {
            next(err)
        }
    })

    // user
    static UpdateUser = roleValidations(2, async (req, res , next) => {
        try{
            const user = await UserService.editUser(req.user, req.body);
            return handleServerResponse(res, user.status, user.message, user.data);
        }catch (err) {
            next(err)
        }
    })

    static getPostByStatus = roleValidations(2, async (req,res,next) => {
        try{
            const jPost = await PostService.getPostByStatus();
            return handleServerResponse(res, jPost.status, jPost.message, jPost.data);
        } catch (err) {
            next(err)
        }
    })
}

module.exports = UserController;