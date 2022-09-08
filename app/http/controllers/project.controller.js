const { projectModel } = require('../../models/project')

class ProjectController {
    async createProject(req, res, next) {
        try {
            const { title, text, image } = req.body;
            const owner = req.user._id;
            const result = await projectModel.create({ title, text, owner, image });
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
    getAllProjects() {

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