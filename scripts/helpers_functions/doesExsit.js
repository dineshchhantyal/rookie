const tokenSchema = require("../Schema/tokenSchema")
const doesExist = async (data) => {
    let DBerro;
    await tokenSchema.findOne({ token: data.token }, (err, token) => {
        if (err) { console.log(err.details) }
        if (token) {
            DBerro = "Token already exists for USER :   " + token.name;
        }
    })
    // check if rollno exists in tokenSchema collections mongo
    await tokenSchema.findOne({ rollno: data.rollno }, (err, token) => {
        if (err) { console.log(err.details) }
        if (token) {
            DBerro = "Rollno already exists for USER :   " + token.name;

        }
    });
    // check if name exists in tokenSchema collections mongo
    await tokenSchema.findOne({ name: data.name }, (err, token) => {
        if (err) { console.log(err.details) }
        if (token) {
            DBerro = "Name already exists for USER :   " + token.name;

        }
    });

    return DBerro;
}

module.exports = { doesExist };