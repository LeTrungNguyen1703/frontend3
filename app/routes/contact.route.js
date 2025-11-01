const express = require('express');
const {
    findAll, createContact, update, deleteContact, findAllFavortie, findOne,
    deleteAllContacts
} = require("../controller/contact.controller");
const router = express.Router();

router.post('', createContact);
router.get('', findAll)
router.delete('', deleteAllContacts);
router.get('/favorite', findAllFavortie)
router.get('/:id', findOne)
router.put('/:id', update)
router.delete('/:id', deleteContact)

module.exports = router;