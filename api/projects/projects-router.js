// Write your "projects" router here!
const express = require('express');

const {
    validateProjectId,
    validateProject,
    validateActions,
    errorHandling
} = require('./projects-middleware');

const Project = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            if (projects) {
                res.status(200).json(projects)
            } else {
                res.json([])
            }
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)

})
router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(createdProject => {
            res.status(201).json(createdProject)
        })
        .catch(next)
})
router.put('/:id', validateProjectId, (req, res, next) => {
    Project.update()
        .then()
        .catch(next)
})
router.delete('/:id', validateProjectId, (req, res, next) => {
    Project.remove()
        .then()
        .catch()
})
router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions()
        .then()
        .catch(next)
})

router.use(errorHandling);


module.exports = router;