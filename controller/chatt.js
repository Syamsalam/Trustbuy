const ChattService = require('../services/chatt')

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
        const userId = req.user.id;
        const result = await ChattService.getChattAll(userId);
        res.status(result.status).json(result);
    }

    static async getChatt(req, res) {
        const userDua = req.user.id;
        const userSatu = parseInt(req.params.id);
        const result = await ChattService.getChatt(userDua, userSatu);
        res.status(result.status).json(result);
    }
}

module.exports = ChattController;
