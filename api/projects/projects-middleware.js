// add middlewares here related to projects
const Project = require('./projects-model');

async function validateProjectId(req, res, next) {
    try{
        const project = await Project.get(req.params.id)
        if (project) {
            req.project = project
            next()
        } else {
            res.status(404).json({
                message: 'not found'
            })
        }
    } catch (error) {
        next(error)
    }
}

function validateProject(req, res, next) {
    if (!req.body.name) {
        next({ status: 400 })
    } else {
        next()
    }
}

function validateActions(req, res, next) {

}

function errorHandling(err, req, res, next) {
    res.status(err.status || 500).json({
        message: `Project router: ${err.message}`,
        stack: err.stack
    })
}

module.exports = {
    validateProjectId,
    validateProject,
    validateActions,
    errorHandling
}