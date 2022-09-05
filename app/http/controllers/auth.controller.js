
const { userModel } = require('../../models/user')
const { hashString } = require('../../modules/functions')

class AuthController {
    async register(req, res, next) {
        try {
            const { username, email, mobile, password } = req.body;
            const hashPassword = hashString(password)
            const user = await userModel.create({ username, email, mobile, password: hashPassword })
                .catch(err => {
                    if (err?.code == 11000) {
                        throw { status: 400, message: "نام کاربری از قبل در سیستم وجود دارد" }
                    }
                });
            return res.json(user)
        } catch (error) {
            next(error)
        }
    };
    login() {
        
    };
    resetPassword() {

    };
};

module.exports = {
    AuthController : new AuthController(),
}