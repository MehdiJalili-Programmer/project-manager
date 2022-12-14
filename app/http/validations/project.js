const { body } = require("express-validator");

function createProjectValidator() {
    return [
        body("title").notEmpty().withMessage("عنوان پروزه نمیتواند خالی باشد"),
        body("tags").isArray({ min: 0, max: 10 }).withMessage("حداکثر استفاده از هشتگ ها 10 عدد میباشد"),
        body("text").notEmpty().isLength({ min: 20 }).withMessage("توضیحات پروزه نمیتواند خالی باشد و حداقل نویسه باید 20 کاراکتر باشد")
    ]
};
module.exports = {
    createProjectValidator
}