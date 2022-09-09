const router = require('express').Router();

const { ProjectController } = require('../http/controllers/project.controller');
const { createProjectValidator } = require('../http/validations/project');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { uploadFile } = require('../modules/express-fileupload');
const fileUpload = require('express-fileupload');
const { mongoIDValidator } = require('../http/validations/public');

router.post("/create", fileUpload(), checkLogin, uploadFile, createProjectValidator(), expressValidatorMapper, ProjectController.createProject)
router.get("/list", checkLogin, ProjectController.getAllProjects);
router.get("/:id", checkLogin, mongoIDValidator() , expressValidatorMapper, ProjectController.getProjectById);
router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject);
router.put("/edit/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.updateProject);

module.exports = {
    projectRoutes : router
}