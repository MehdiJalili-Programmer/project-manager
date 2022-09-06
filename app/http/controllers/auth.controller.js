const bcrypt = require('bcrypt');

const { userModel } = require('../../models/user')
const { hashString, tokenGenerator } = require('../../modules/functions')

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
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await userModel.findOne({ username });
            if (!user) throw { status: 401, message: 'نام کاربری یا رمز عبور اشتباه میباشد' };
            const compareResult = bcrypt.compareSync(password, user.password);        
            if (!compareResult) throw { status: 401, message: 'نام کاربری یا رمز عبور اشتباه میباشد' };
            const token = tokenGenerator({ username });
            user.token = token;
            user.save();
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'ورود به حساب کاربری با موفقیت انجام شد',
                token
            })
        } catch (error) {
            next(error)
        }
    };
    resetPassword() {

    };
};

module.exports = {
    AuthController : new AuthController(),
}