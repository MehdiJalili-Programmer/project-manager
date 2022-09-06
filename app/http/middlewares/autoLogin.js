const { verifyJwtToken } = require("../../modules/functions");
const { userModel } = require("../../models/user")

const checkLogin = async (req, res, next) => {
    try {
        const authorization = req?.headers?.authorization;
        if (!authorization) throw { status: 401, message: 'لطفا وارد حساب کاربری خود شوید' };
        console.log(authorization);
        let token = authorization.split(" ")?.[1];
        if (!token) throw { status: 401, message: 'لطفا وارد حساب کاربری خود شوید' };
        const result = verifyJwtToken(token);
        const { username } = result;
        console.log(result);
        const user = await userModel.findOne({ username }, { password: 0 });
        if (!user) throw { status: 401, message: 'لطفا وارد حساب کاربری خود شوید' };
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkLogin
}