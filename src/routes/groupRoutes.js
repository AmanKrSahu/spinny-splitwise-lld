const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/', groupController.createGroup);
router.post('/:id/members', groupController.addMemberToGroup);

module.exports = router;