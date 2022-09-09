const autoBind = require('auto-bind');
const { projectModel } = require('../../models/project')

class ProjectController {
    constructor() {
        autoBind(this);
    }
    async createProject(req, res, next) {
        try {
            const { title, text, image, tags } = req.body;
            console.log(tags);q
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

    async findProject(projectID, owner) {
        const project = await projectModel.findOne({ owner, _id: projectID });  
        if (!project) throw { status: 404, message: "پروژه ای یافت نشد" };
        return project;
    };

    async getProjectById(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await this.findProject(projectID, owner);
            return res.status(200).json({
                status: 200,
                success: true,
                project
            })
        } catch (error) {
            next(error)
        }
    };
    async removeProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            await this.findProject(projectID, owner);
            const deleteProjectResult = await projectModel.deleteOne({ _id: projectID });
            if (deleteProjectResult.deletedCount == 0) throw { status: 400, message: "پروژه حذف نشد" };
            return res.status(200).json({
                status: 200,
                success: true,
                message: "پروژه باموفقیت حذف شد"
            })
        } catch (error) {
            next(error)
        }
    };
    getAllProjectsOfTeam() {

    };
    getProjectOfUser() {

    };
    updateProject() {

    };
};

module.exports = {
    ProjectController : new ProjectController()
}