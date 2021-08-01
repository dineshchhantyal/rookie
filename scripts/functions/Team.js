const msgSchema = require("../helpers_functions/msgSchema");
const Teams = require("../../files/team.json").teams;

const getTeam = (msg, type) => {
  const [original, teamName, operator, ...info] = type.toLowerCase().split(" ");
  let teamInfo;
  console.log("This are teams", Teams);
  console.log("Info", info.join(" "));

  if (teamName) {
    if (!operator) {
      if (Teams.findIndex((e) => e === teamName) != -1) {
        teamInfo = require(`../../files/teams/${teamName}.json`);
        msgSchema(
          msg,
          "**" +
            teamName +
            "** \n \n```json\n \n" +
            JSON.stringify(teamInfo, null, 2) +
            "\n```"
        );
      } else {
        msgSchema(msg, "team not found", true);
        return;
      }
    }
  } else if (operator == "create") {
    if (Teams.findIndex((e) => e === teamName) != -1) {
      msgSchema(msg, "team already exists", true);
    } else {
      Teams.push(teamName.toLowerCase());
      teamInfo = {
        teams: teamName,
        ...JSON.parse(info.join(" ")),
      };
      fs.writeFile(
        `../../files/teams/${teamName}.json`,
        JSON.stringify(teamInfo),
        (err) => {
          if (!err) {
            msgSchema(
              msg,
              "**" +
                teamName +
                "** \n \n```json\n \n" +
                JSON.stringify(teamInfo, null, 2) +
                "\n```"
            );
          } else {
            console.log(err);
          }
        }
      );
    }
  }
};

module.exports = getTeam;
