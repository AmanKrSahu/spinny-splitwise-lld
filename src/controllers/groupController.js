const groupService = require('../services/groupService');

exports.createGroup = async (req, res) => {
  try {
    const group = await groupService.createGroup(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addMemberToGroup = async (req, res) => {
  try {
    const member = await groupService.addMemberToGroup(req.params.id, req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};