const express = require('express');
const server = express();
const port = 8000;
const { PrismaClient } = require('@prisma/client');
const { Decimal } = require('@prisma/client/runtime');
const prisma = new PrismaClient();

server.use(express.json());

//read atau get semua data user
server.get('/all-users', async (request, response) => {
    try {
        const users = await prisma.users.findMany({
            include: {
                role : true,
            },
        });
        
        response.statusCode = 200;
        response.json(users);
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

//post atau create data user
server.post('/create-user', async (request, response) => {
    try {
        const { username, email, password, full_name, address, phone_number, role_id } = request.body;
        const data = await prisma.users.create({
            data: {
                username : username,
                email    :   email ,
                password : password,
                full_name: full_name,
                address  : address,
                phone_number: phone_number,
                role_id : Number(role_id),
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

//update nama user atau put
server.put('/update-user/:id', async (request, response) => {
    try {
        const { username } = request.body;
        const { id } = request.params;
        const data = await prisma.users.update({
            where: {
                id: Number(id)
            },
            data: {
                username: username
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

//delete data user atau delete

server.delete('/delete-user/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const data = await prisma.users.delete({
            where: {
                id: Number(id)
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

//mengambil data products

server.get('/all-products', async (request, response) => {
    try{
        const products = await prisma.products.findMany({
            include: {
                category : true,
            },
        });
        response.statusCode = 200;
        response.json(products);
    } catch (err) {
        response.statusCode = 500;
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

server.post('/create-product', async (request, response) => {
    try {
        const {product_name, description, price, stock, category_id} = request.body;
        const data = await prisma.products.create({
            data: {
                product_name    : product_name,
                description     : description,
                price           : Number(price),
                stock           : Number(stock),
                category_id     : Number(category_id),
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

server.put('/update-product/:id', async (request, response) => {
    try {
        const {product_name} = request.body;
        const {id} = request.params;
        const data = await prisma.products.update({
            where: {
                id : Number(id)
            },
            data: {
                product_name: product_name
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

server.delete('/delete-product/:id', async (request, response) => {
    try{
        const {id}=request.params;
        const data = await prisma.products.delete({
            where:{
                id : Number(id)
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

//mengambil data orders
server.get('/all-orders', async (request, response) => {
    try {
        const orders = await prisma.orders.findMany({
            include:{
                payment_methods : true,
                users : true,
                status : true,
            },
        });
        response.statusCode = 200;
        response.json(orders);
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

server.post('/create-order', async (request,response) => {
    try {
        const {user_id,order_date,status_id,shipping_address,payment_method_id} = request.body;
        const data = await prisma.orders.create({
            data: {
                user_id     : Number(user_id),
                order_date  : order_date,
                status_id   : Number(status_id),
                shipping_address : shipping_address,
                payment_method_id: Number(payment_method_id),
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data : err
        })
    }
})

server.put('/update-orders/:id', async (request, response) => {
    try {
        const { shipping_address } = request.body;
        const { id } = request.params;
        const data = await prisma.orders.update({
            where: {
                id: Number(id)
            },
            data: {
                shipping_address: shipping_address
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

server.delete('/delete-orders/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const data = await prisma.orders.delete({
            where: {
                id: Number(id)
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

//mengambil order-items
server.get('/all-order-items', async (request, response) => {
    try {
        const order_items = await prisma.order_items.findMany({
            include: {
                orders : true,
                products : true,
            }
        });
        response.statusCode = 200;
        response.json(order_items);
    } catch (err) {
        response.statusCode = 500
        response.json({
            message: "Internal Server Error",
            data: err
        })
    }
})

server.post('/create-order-item', async (request,response) => {
    try{
        const {order_id,product_id,quantity,subtotal} = request.body;
        const data = await prisma.order_items.create({
            data: {
                order_id : Number(order_id),
                product_id : Number(product_id), 
                quantity : Number(quantity), 
                subtotal : Decimal(subtotal) 
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500
        response.json({
            message:"Internal server error" ,
            data: err
        })
    }
})

server.put('/update-order-item/:id', async (request,response) =>{
    try{
        const {quantity} = request.body;
        const {id} = request.params;
        const data = await prisma.order_items.update({
            where: {
                id : Number(id)
            },
            data: {
                quantity: quantity
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500;
        response.json({
            message :"internal server error ",
            data:  err
        })
    }
})

server.delete('/delete-order-item/:id', async (request,response) => {
    try {
        const {id} = request.params;
        const data = await prisma.order_items.delete({
            where: {
                id: Number(id)
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500;
        response.json({
            message:'internal server error ',
            data: err
        })
    }
})

//mengambil data payment
server.get('/all-payment',async (request,response) => {
    try{
        const payment = await prisma.payment.findMany({
            include: {
                orders: true,
            }
        })
        response.statusCode = 200;
        response.json(payment);
    } catch (err) {
        response.statusCode = 500;
        response.json({
            message : "Internal Server Error",
            data: err
        })
    }
})

server.post('/create-payment',async (request,response) => {
    try {
        const {order_id,payment_date,amount} = request.body;
        const data = await prisma.payment.create({
            data: {
                order_id: Number(order_id),
                payment_date: payment_date,
                amount: amount
            }
        })
        response.statusCode = 200;
        response.json(data);
    } catch (err) {
        response.statusCode = 500;
        response.json({
            message:"Internal Server Error" ,
            data: err
        })
    }
})

server.put('/update-payment/:id', async (request,response) => {
    try {
        const {amount} = request.body;
        const {id} = request.params;
        const data = await prisma.payment.update({
            where: {
                id: Number(id)
            },
            data: {
                amount: amount
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500;
        response.json({
            message :"Internal server error ",
            data: err
        })
    }
})

server.delete('/delete-payment/:id', async (request,response) => {
    try{
        const {id}=request.params;
        const data = await prisma.payment.delete({
            where:{
                id: Number(id)
            }
        })
        response.statusCode = 200;
        response.json(data)
    } catch (err) {
        response.statusCode = 500;
        response.json({
            message : "internal server error",
            data: err
        })
    }
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})



