const Group = require('../models/Group');
const GroupMember = require('../models/GroupMember');

exports.createGroup = async ({ name }) => {
  const group = new Group({ name });
  return await group.save();
};

exports.addMemberToGroup = async (groupId, { userId }) => {
  const member = new GroupMember({
    group: groupId,
    user: userId
  });
  return await member.save();
};