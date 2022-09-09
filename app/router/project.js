const router = require('express').Router();

const { ProjectController } = require('../http/controllers/project.controller');
const { createProjectValidator } = require('../http/validations/project');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { uploadFile } = require('../modules/express-fileupload');
const fileUpload = require('express-fileupload');
const { mongoIDValidator } = require('../http/validations/public');

router.post("/create", fileUpload(), checkLogin, uploadFile, createProjectValidator(), expressValidatorMapper, ProjectController.createProject)
router.post("/list", checkLogin, ProjectController.getAllProjects);
router.post("/:id", checkLogin, mongoIDValidator() , expressValidatorMapper, ProjectController.getProjectById);
router.post("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject);
router.post("/edit/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.updateProject);

module.exports = {
    projectRoutes : router
}