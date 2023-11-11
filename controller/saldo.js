const { roleValidations } = require('../middleware/authValidation');
const handleServerResponse = require('../middleware/generateRespon');
const SaldoService = require('../services/saldo')


class SaldoController {
    static createSaldo = roleValidations(1,async (req,res,next) => {
        try {
            const saldo = await SaldoService.createSaldo(req.body)
            handleServerResponse(res,saldo.status,saldo.message,saldo.data);
        } catch (err) {
            next(err)
        }
    })

    static getSaldo = roleValidations(1,async (req,res,next) => {
        try {
            const saldo = await SaldoService.getSaldo(req.user);
            handleServerResponse(res,saldo.status,saldo.message,saldo.data);
        } catch (err) {
            next(err)
        }
    })

    static updateSaldo = roleValidations(1,async (req,res,next) => {
        try {
            const saldo = await SaldoService.updateSaldo(req.body,req.user);
            handleServerResponse(res,saldo.status,saldo.message,saldo.data);
        } catch(err) {
            next(err)
        }
    })
}

module.exports = SaldoController;