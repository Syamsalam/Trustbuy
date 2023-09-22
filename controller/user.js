const UserService =require('../services/user')
const { roleValidations } = require('../middleware/authValidation')
const handleServerResponse = require('../middleware/generateRespon');
const PostService = require('../services/post');

class UserController {

    //semua user
    static GetUser = roleValidations(1, async (req, res , next) => {
        try{
            const user = await UserService.getUser(req.params.id);
            return handleServerResponse(res, user.status, user.message, user.data);
        }catch (err) {
            next(err)
        }
    })

    static GetProfile = roleValidations(1, async (req,res,next) => {
        try{
            const profile = await UserService.getProfile(req.user);
            return handleServerResponse(res, profile.status, profile.message, profile.data);
        } catch (err) {
            next(err)
        }
    })

    //semua user
    static CreateUser = roleValidations(1,async (req,res,next) => {
        try{
            const user = await UserService.addUser(req.body);
            return handleServerResponse(res, user.status,user.message,user.data);
        } catch (err) {
            next(err)
        }
    })

    //semua user
    static UpdateUser = roleValidations(1, async (req, res , next) => {
        try{
            const user = await UserService.editUser(req.user);
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