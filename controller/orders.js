const { roleValidations } = require('../middleware/authValidation');
const handleServerResponse = require('../middleware/generateRespon');
const OrderService = require('../services/orders');
const PaymentService = require('../services/payment');

class OrderController {
    static AllOrders = roleValidations(1, async (req,res, next) => {
        try{
            const order = await OrderService.getAllOrders();
            return handleServerResponse(req,order.status,order.message,order.data);
        } catch (err){
            next(err)
        }
    })

    static CreateOrder = roleValidations(2, async (req,res,next) => {
        try {
            const order = await OrderService.createOrder(req.body);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })

    
    static CreateOrderItems = roleValidations(3, async (req,res,next) => {
        try {
            // console.log(req)
            const order = await OrderService.createOrderItems(req.body,req.user);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })

    static UpdateOrder = roleValidations(1, async (req,res,next) => {
        try {
            const order = await OrderService.editOrder(req.body);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })

    static DeleteOrder = roleValidations(3,async (req,res,next) => {
        try {
            console.log(req.body)
            const order = await OrderService.deleteOrder(req.params.id);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })

    static OrderByStatus = roleValidations(3,async (req, res, next) => {
        try {
            const order = await OrderService.getOrderByStatus(req.user);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })

    static UpdateOrderStatus = roleValidations(3, async (req,res,next) => {
        try {
            const order = await OrderService.updateOrderStatus(req.body);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })

    static async UpdateOrderVerify(req,res) {
        try {
            const order = await OrderService.updateOrderVerify(req.body);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    }

    static GetOrderItems = roleValidations(3, async (req,res,next) => {
        try {
            const order = await OrderService.getOrderItems(req.params.id);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })

    //untuk user melihat postingan yang diterima oleh jastiper
    static GetOrderForUser = roleValidations(2,async (req,res,next) => {
        try {
            const order = await OrderService.getOrderUser(req.user);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    
    })

    static GetOrderItemsUser = roleValidations(2, async (req,res,next) => {
        try {
            const order = await OrderService.getOrderItems(req.params.id);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })

    //payment
    static GetBiayaJastip = roleValidations(3, async (req,res,next) => {
        try {
            const order = await PaymentService.getBiayaJastip(req.params.id);
            return handleServerResponse(res,order.status,order.message,order.data);
        } catch (err) {
            next(err)
        }
    })
}

module.exports = OrderController;