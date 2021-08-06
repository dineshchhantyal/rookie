const msgSchema = require("./msgSchema");
const tokenSchema = require("../Schema/tokenSchema");
const tokenValidator = require("../Joe/tokenValidator");
const ObjectID = require('mongodb').ObjectID;

const addToken = async (msg, type) => {
    rollno = type.split(' ')[1];
    token = type.split(' ')[2];
    operator = type.split(' ')[3];
    let validatedData;
    // get name from msg
    const name = msg.author.username;
    // validating the input
    if (!rollno || rollno.toLowerCase() === "help") {
        return msgSchema(msg, "OK! Buddy 😊\n use !rooo token {rollno} {token}");
    };
    if (rollno.toLowerCase() === "all") {
        data = await tokenSchema.find({}, { _id: false, __v: false });
        return msgSchema(msg, "```json \n " + JSON.stringify(data, null, 2) + "\n```");
    };
    if (rollno.toLowerCase() === "reset") {
        await tokenSchema.findOneAndDelete({ name },);
        return msgSchema(msg, "OK! \n token for " + name + " has been reset");
    }
    if (rollno.toLowerCase() === "me") {
        data = await tokenSchema.findOne({ name }, {
            "__v": false
        });
        return msgSchema(msg, "```json \n " + JSON.stringify(data, null, 2) + "\n```");
    }
    try {
        validatedData = await tokenValidator.validateAsync({ name, rollno, token },);
    } catch (e) {
        const errorMessages = e.details.map(m => m.message);
        return msgSchema(msg, "```json \n" + JSON.stringify(errorMessages[0]) + "```", true);
        return;
    }
    // check if token and name already exists in tokenSchema collections mongo
    console.log(`${name} is trying to add token for ${rollno}`);
    if (!operator || operator.toLowerCase() != "-u") {
        const tokenExists = await tokenSchema.findOne({ token: token },
            err => {
                if (err) {
                    console.log(err
                        .details)
                }
            }, { name: true });
        if (tokenExists) {

            return msgSchema(msg, "Token already exists for USER : " + tokenExists.name + " \n --- ** To re-invoke ** --- \n *roo! token {rollno} {token} -u* ", true);
        }
        // check if rollno exists in tokenSchema collections mongo
        const rollnoExists = await tokenSchema.findOne({ rollno });
        if (rollnoExists) {
            return msgSchema(msg, "Rollno already exists for USER :" + rollnoExists.name + " \n --- ** To re-invoke ** --- \n *roo! token {rollno} {token} -u* ", true);
        }
        // check if name exists in tokenSchema collections mongo
        const nameExists = await tokenSchema.findOne({ name });
        if (nameExists) {

            return msgSchema(msg, "name already exists for USER:" + nameExists.name + "\n-- - ** To re-invoke ** --- \n *roo! token {rollno} {token} -u* ", true);
        }
        const newToken = new tokenSchema(validatedData);
        newToken.save(
            (err) => {
                if (err) {
                    return msgSchema(msg, "Error while adding token \n Please try again", true);
                }
                return msgSchema(msg, "Token added successfully \n --- ** To re-invoke ** --- \n *roo! token {rollno} {token} -u* ", true);
            }
        );
    } else {
        // update token
        const oldDoc = await tokenSchema.findOne({ name: name });
        tokenSchema.findOneAndUpdate({ _id: ObjectID(oldDoc._id) }, validatedData, {
            new: true
        }, (err, data) => {
            if (err) {
                return msgSchema(msg, "Error while updating token \n Please try again", true);
            }
            return msgSchema(msg, "Token updated successfully", true);
        });
    }
};


module.exports = addToken;