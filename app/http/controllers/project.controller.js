const { projectModel } = require('../../models/project')

class ProjectController {
    async createProject(req, res, next) {
        try {
            const { title, text, image, tags } = req.body;
            console.log(tags);
            const owner = req.user._id;
            const result = await projectModel.create({ title, text, owner, image, tags });
            if (!result) throw { status: 400, message: "افزودن پروزه با مشکل مواجه شد" };
            return res.status(201).json({
                status: 201,
                success: true,
                message: "پروزه باموفقیت ایجاد شد"
            })
        } catch (error) {
            next(error)
        }
    };
    async getAllProjects(req, res, next) {
        try {
            const owner = req.user._id;
            const projects = await projectModel.find({ owner }); 
            return res.status(200).json({
                status: 200,
                success: true,
                projects
            })
        } catch (error) {
            next(error)
        }
    };
    getProjectById() {

    };
    getAllProjectsOfTeam() {

    };
    getProjectOfUser() {

    };
    updateProject() {

    };
    removeProject() {

    }
};

module.exports = {
    ProjectController : new ProjectController()
}