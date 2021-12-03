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
    if (!req.body.name || !req.body.description) {
        next({ status: 400, message: 'Missing requirements'})
        } else {
            next()
    }
}

async function validateActions(req, res, next) {
    try {
        const actions = await Project.getProjectActions(req.params.id)
        if (actions) {
            req.actions = actions
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