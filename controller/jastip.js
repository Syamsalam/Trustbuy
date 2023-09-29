const JastipService = require('../services/jastip')
const { roleValidations } = require('../middleware/authValidation')
const handleServerResponse = require('../middleware/generateRespon');
const PostService = require('../services/post');

class JastipController {
    static  IsOnline = roleValidations(3, async (req,res,next) => {
        try{    
            const jastip = await JastipService.isOnline(req.body,req.user);
            return handleServerResponse(res,jastip.status,jastip.message,jastip.data);
        } catch (err) {
            next(err);
        }
    })

    static createpost = roleValidations(3,async (req,res,next) => {
        try{
            console.log(req.user)
            console.log(req.body)
            const jastip = await PostService.createPost(req.body,req.user);
            return handleServerResponse(res,jastip.status,jastip.message,jastip.data);
        } catch (err) {
            next(err);
        }
    })

    static updatePost = roleValidations(3, async (req,res,next) => {
        try {
            const jastip = await PostService.updatePost(req.body,req.params.post_id);
            return handleServerResponse(res,jastip.status,jastip.message,jastip.data);
        } catch (err) {
            next(err);
        }
    })

    static getPost = roleValidations(3,async (req,res,next) => {
        try{
            const jastip = await PostService.getPost(req.user);
            return handleServerResponse(res,jastip.status,jastip.message,jastip.data);
        } catch (err) {
            next(err);
        }
    })

    static GetJastipDetails = roleValidations(3, async (req, res , next) => {
        try{
            const user = await JastipService.getDetailProfile(req.user);
            return handleServerResponse(res, user.status, user.message, user.data);
        }catch (err) {
            next(err)
        }
    })

    static UpdateJastip = roleValidations(3, async (req, res , next) => {
        try{
            const user = await JastipService.editJastip(req.user, req.body);
            return handleServerResponse(res, user.status, user.message, user.data);
        }catch (err) {
            next(err)
        }
    })

    

}

module.exports = JastipController