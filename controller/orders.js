const { roleValidations } = require('../middleware/authValidation');
const handleServerResponse = require('../middleware/generateRespon');
const OrderService = require('../services/orders');

class OrderController {
    static AllOrders = roleValidations(1, async (req,res, next) => {
        try{
            const order = await OrderService.getAllOrders();
            return handleServerResponse(req,order.status,order.message,order.data);
        } catch (err){
            next(err)
        }
    })

    
    static CreateOrder = roleValidations(1, async (req,res,next) => {
        try {
            const order = await OrderService.createOrder(req.body);
            return handleServerResponse(req,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })

    static UpdateOrder = roleValidations(1, async (req,res,next) => {
        try {
            const order = await OrderService.editOrder(req.user);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })

    static DeleteOrder = roleValidations(1,async (req,res,next) => {
        try {
            const order = await OrderService.deleteOrder(req.user);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })
}

module.exports = OrderController;