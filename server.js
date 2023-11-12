const express = require('express');
const port = 8000;
const server = express();
const apiRouter = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { applyPassportStrategy } = require('./auth/passport-jwt');

server.use(bodyParser.json());
server.use(express.urlencoded({
    extended: true
}));

server.use(cors({
    origin : "*"
}));

applyPassportStrategy(passport);
server.use(passport.initialize());

(async () => {
    await prisma.$connect()
        .then(() => {
            console.log(`\nDatabase connected success`)
            // console.log(`Info : \n Server :${process.env.nameServer} \n Port :${process.env.port} \n Database :${process.env.databaseName}`);
            server.use('/api', apiRouter);
            server.get('/', (req, res) => {
                return res.status(200).send({
                    message: "backend trustBuy by Syamsul Alam"
                })
            })
            server.listen(port, () => {
                console.log(`Server is running at http://localhost:${port}`);
            })
        })
        .catch((err) => {
            console.log('Database connected :failed')
            console.log(err.message);
        })
})()
