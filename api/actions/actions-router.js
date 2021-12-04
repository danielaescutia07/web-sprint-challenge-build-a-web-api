// Write your "actions" router here!
const express = require('express');

const { validateActionsId, validateAction, errorHandlingActions } = require('./actions-middlware');

const Actions = require('./actions-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            if (actions) {
                res.status(200).json(actions)
            } else {
                res.json([])
            }
        })
        .catch(next)
})

router.get('/:id', validateActionsId, (req, res, next) => {
    res.json(req.actions)
})

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})
router.put('/:id', validateActionsId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(updatedAction => {
            res.json(updatedAction)
        })
        .catch(next)
})
router.delete('/:id', validateActionsId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.project)
        })
        .catch(next)
})

router.use(errorHandlingActions);


module.exports = router;


