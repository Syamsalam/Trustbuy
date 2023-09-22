const { roleValidations } = require('../middleware/authValidation')
const handleServerResponse = require('../middleware/generateRespon')
const HistoryService = require('../services/history')

class HistoryController {

    static HistoryJastip = roleValidations(3, async (req,res,next) => {
        try {
            const history = await HistoryService.historyJastip(req.user)
            return handleServerResponse(res,history.status,history.message,history.data)
        } catch (err) {
            next(err)
        }
    })

    static HistoryUser = roleValidations(2, async (req, res, next) => {
        try {
            const history = await HistoryService.historyUser(req.params.id)
            return handleServerResponse(res, history.status,history.message,history.data)
        } catch (err) {
            next(err)
        }
    })

    static HistoryJastipDetails = roleValidations(3, async (req,res,next) => {
        try {
            const history = await HistoryService.historyJastipDetail(req.user)
            return handleServerResponse(res,history.status,history.message,history.data)
        } catch (err) {
            next(err)
        }
    })


    static HistoryUserDetails = roleValidations(2, async (req,res,next) => {
        try {
            const history = await HistoryService.historyUserDetails(req.user)
            return handleServerResponse(res,history.status,history.message,history.data)
        } catch (err) {
            next(err)
        }
    })
    
}

module.exports = HistoryController;