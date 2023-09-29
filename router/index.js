const express = require('express');
const { Order } = require('../controller');
const router = express.Router();
const path = require('path');
const multer = require('multer'); 
const passport = require('passport'); 
const { v4: uuidv4 } = require('uuid')
const {
    loginValidation,
    registerValidation
} = require ('../middleware/authValidation');
const JastipController = require('../controller/jastip');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        console.log(file , 'ini file')
        if (file.fieldname === 'photoProfile') {
            cb(null, 'images/photoprofile')
        }
    },
    filename: (req,file,cb) => {
        cb(null,uuidv4() + path.extname(file.originalname));
    }
})
const UserController = require('../controller').User;
const ProducController = require('../controller').Product;
const OrderController = require('../controller').Order;
const HistoryController = require('../controller').History;
const ImageController = require('../controller').Image;
const AuthController = require('../controller').Auth;
const CommonController = require('../controller').Common;
const AdminController = require('../controller').Admin;
const auth = passport.authenticate('jwt', { session: false })

const upload = multer({storage: storage});
const profileFile = upload.single('photoProfile')

//auth
router.post('/register', registerValidation, AuthController.register);
router.post('/register-jastip', registerValidation, AuthController.registerJastip);
router.post('/login', loginValidation, AuthController.login);

//image
// router.post('/images/upload-profile/:id', profileFile , ImageController.UploadProfile);

//user
router.put('/user/update-user', auth , UserController.UpdateUser)
router.get('/user/history-user', auth ,HistoryController.HistoryUser)
router.get('/user/history-user-detail', auth ,HistoryController.HistoryUserDetails)
router.get('/user/get-post-aktif', auth,UserController.getPostByStatus)
router.get('/user/photo-profile',auth,UserController.GetProfile)
router.get('/user/detail-profile',auth,UserController.GetUserDetail)
router.get('/user/get-post', auth,JastipController.getPost)

//jastip
router.post('/jastip/create-product', auth,ProducController.CreateProduct)
.get('/jastip/product', auth, CommonController.GetProduct)
.put('/jastip/update-product', auth,ProducController.UpdateProduct)
.delete('/jastip/delete-product', auth,ProducController.DeleteProduct)
.post('/jastip/create-order', auth,OrderController.CreateOrder)
.put('/jastip/update-order', auth,OrderController.UpdateOrder)
.delete('/jastip/delete-order', auth,OrderController.DeleteOrder)
.get('/jastip/history-jastip', auth,HistoryController.HistoryJastip)
.get('/jastip/history-jastip-detail', auth,HistoryController.HistoryJastipDetails)
.get('/jastip/all-orders', auth,OrderController.AllOrders)
.put('/jastip/set-status', auth,JastipController.IsOnline)
.post('/jastip/create-post', auth,JastipController.createpost)
.put('/jastip/update-post/:post_id', auth,JastipController.updatePost);


//Common
router.get('/common/profile',auth, CommonController.GetProfile);
router.post('/common/upload-profile',auth,profileFile,CommonController.UploadProfile);
router.put('/common/edit-profile',auth, CommonController.UploadProfile);


//Admin
router.get('/admin/count-users', auth,AdminController.CountUsers);
router.get('/admin/count-jastip', auth,AdminController.CountJastip);
router.get('/admin/Total-amount', auth,AdminController.TotalJastipAmount);
router.delete('/admin/delete-user', auth,AdminController.DeleteUser);
router.get('/admin/all-users', auth,AdminController.AllUsers);
router.get('/admin/all-jastip', auth,AdminController.Alljastip);
router.get('/admin/all-product', auth,AdminController.GetAllProduct);
router.get('/admin/get-all-post', auth,AdminController.allPost);



module.exports = router;