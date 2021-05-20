const Users = require("./Schema/userSchema");

const addNewUser = () => {
  Users.create(
    {
      name: "Dinesh",
      number: [9866042400, 98606042400],
      message: "Work and React ♥",
      interest: ["Web Development"],
      interest: [
        "Web Development",
        "JavaScript",
        "React",
        "Node.js",
        "Python Thingy",
        "Selenium",
        "Django",
      ],
      workingOn: ["Personal Portfiolio", "077 BCT Control System"],
      maritalStatus: true,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
};

module.exports = addNewUser;
