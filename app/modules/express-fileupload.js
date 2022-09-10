const fileUpload = require('express-fileupload');
const path = require('path');

const { createUploadPath } = require('../modules/functions')

const uploadFile = async (req, res, next) => {
    try {
        if (req.file || Object.keys(req.files).length == 0) throw { status: 400, message: "تصویر شاخص پروزه را ارسال نمایید" };
        let image = req.files.image;
        let type = path.extname(image.name);
        if (![".png", ".jpg", ".jpeg", ".webp", ".gif"].includes(type)) throw {
            status: 400,
            message : "فرمت ارسال شده صحیح نمیباشد"
        }
        const image_path = path.join(createUploadPath(), (Date.now() + type));
        req.body.image = image_path.substring(7); // یعنی آدرس عکس را از بعد از پابلیک در نظر بگیر
        let uploadPath = path.join(__dirname, "..", "..", image_path);
        console.log(uploadPath);
        image.mv(uploadPath, (err) => {
            console.log(err);
            if (err) throw { status: 500, message: "بارگذاری تصویر انجام نشد" };
            next();
        })
    } catch (error) {
        next(error)
    }
};
module.exports = {
    uploadFile
}