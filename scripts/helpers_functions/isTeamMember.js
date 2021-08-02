if (team) {
  if (team.owner.toLowerCase() === msg.author.username.toLowerCase()) {
    return team;
  } else if (team.members.includes(msg.author.id)) {
    return team;
  } else {
    return msgSchema.errorMsg(msg, "You are not a member of this team.");
  }
} else {
  return msgSchema.errorMsg(msg, "This team does not exist.");
}
