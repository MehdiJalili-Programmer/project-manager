const router = require('express').Router();

const {authRoutes} = require('./auth')
const {projectRoutes} = require('./project')
const {userRoutes} = require('./user')
const {teamRoutes} = require('./team')

router.use("/auth", authRoutes);
router.use("/project", projectRoutes);
router.use("/team", teamRoutes);
router.use("/user", userRoutes);

module.exports = {
    AllRoutes : router
}