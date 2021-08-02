const msgSchema = require("../helpers_functions/msgSchema");
const teamSchema = require("../Schema/teamSchema");

const getTeam = (msg, type) => {
  const [original, teamName, operator, ...info] = type.toLowerCase().split(" ");
  let team;
  console.log("Operatorrr", operator);
  switch (operator) {
    case "add":
      team = new teamSchema({
        name: teamName,
        members: [msg.author.id],
        message: null,
        workingOn: null,
      });
      team.save();
      break;
    default:
      if (teamName) {
        teamSchema.find(
          {
            name: teamName,
          },
          (err, data) => {
            if (err) {
              console.log(err);
              msgSchema(false, "error", true);
            } else {
              team = data;
              console.log(data);
            }
          }
        );
      }
      if (team) {
        msgSchema(msg, JSON.stringify(team, 0, 2), true);
      } else {
        msgSchema(msg, "Paila Team Banana \n Khatey", true);
      }
  }
};

module.exports = getTeam;
