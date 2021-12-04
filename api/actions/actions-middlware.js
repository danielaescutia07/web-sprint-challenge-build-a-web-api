// add middlewares here related to actions
const Action = require('./actions-model');


async function validateActionsId(req, res, next) {
    try {
        const actions = await Action.get(req.params.id)
        if (!actions) {
            next({ status: 404, message: 'not found'})
        } else {
            req.actions = actions
            next ()
        }
    } catch (error) {
        next(error)
    }
}

function validateAction(req, res, next) {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        next({ status: 400, message: 'Missing requirements'})
    } else {
        next()
    }
}

function errorHandlingActions(err, req, res, next) {
    res.status(err.status || 500).json({
        message: `Project router: ${err.message}`,
        stack: err.stack
    })
}

module.exports = {
    validateActionsId,
    validateAction,
    errorHandlingActions
}