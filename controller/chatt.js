const ChattService = require('../services/ChattService');

class ChattController {
    // CREATE
    static async createChatt(req, res) {
        const body = {
            sender_id : req.user.id,
            receiver_id : parseInt(req.params.id),
            isi_pesan : req.body.pesan
        }
        const result = await ChattService.createChatt(body);
        res.status(result.status).json(result);
    }

    // READ
    static async getChattAll(req, res) {
        const userId = req.params.userId;
        const result = await ChattService.getChattAll(userId);
        res.status(result.status).json(result);
    }

    static async getChatt(req, res) {
        const senderId = req.user.id;
        const receiverId = parseInt(req.params.receiverId);
        const result = await ChattService.getChatt(senderId, receiverId);
        res.status(result.status).json(result);
    }
}

module.exports = ChattController;
