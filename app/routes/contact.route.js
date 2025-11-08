const express = require('express');
const {
    findAll, create, update, delete: deleteContact, findAllFavorite, findOne,
    deleteAll
} = require("../controller/contact.controller");
const router = express.Router();

router.post('', create);
router.get('', findAll)
router.delete('', deleteAll);
router.get('/favorite', findAllFavorite)
router.get('/:id', findOne)
router.put('/:id', update)
router.delete('/:id', deleteContact)

module.exports = router;