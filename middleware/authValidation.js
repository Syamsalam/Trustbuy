const Joi = require('joi');
const handleServerResponse = require('./generateRespon')
const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(6).required();
const usernameSchema = Joi.string().min(3).required();


const loginValidation = (req, res, next) => {
    const { error } = Joi.object({
        email: usernameSchema,
        password: passwordSchema
    }).validate(req.body);

    if (error) {
        handleServerResponse(res, 400, "Bad Request , Login Validasi Gagal", error.message);
    } else {
        next();
    }
}

const registerValidation = (req, res, next) => {
    const { error } = Joi.object({
        email: emailSchema,
        password: passwordSchema,
        username: usernameSchema,
        alamat: Joi.string().required(),
        nama: Joi.string().required(),
        nomor_telepon: Joi.string().required(),
        data_identifikasi: Joi.string().optional()
    }).validate(req.body);

    if (error) {
        handleServerResponse(res, 400, "Bad Request , Register Validasi Gagal", error.message);
    } else {
        next();
    }
}

const roleValidations = (roleUser, callback) => {
    return async (req, res, next) => {
        const { role } = req.user;
        // console.log(req.user)
        if (role !== roleUser) {
            handleServerResponse(res, 401, "Unauthorized Access", "Kamu tidak memiliki akses untuk melakukan ini");
        } else {
            try {
                await callback(req, res, next);
            } catch (err) {
                next(err);
            }
        }
    };
};

module.exports = {
    loginValidation,
    registerValidation,
    roleValidations
}
