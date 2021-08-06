const router = require("express").Router();

const { doesExist } = require("../helpers_functions/doesExsit");
const tokenValidator = require("../Joe/tokenValidator");
const tokenSchema = require("../Schema/tokenSchema");

router.get("/", async (req, res) => {
    await tokenSchema.find({}, { _id: false, __v: false }, (err, tokens) => {
        if (err) {
            res.status(500).send(err
                .message
                .toString()
            )
        } else {
            res.status(200).json(tokens)
        };
    })
})

router.post("/", async (req, res) => {
    const data = req.body;
    try {
        await tokenValidator.validateAsync(data);
    } catch (e) {
        res.status(400).json({
            error: e
        });
    }
    try {
        const DBerror = await doesExist(data);
        if (DBerror) res.status(400).json({ "message ": DBerror });
        else {
            const newToken = new tokenSchema(data);
            newToken.save(
                (err) => {
                    if (err) {
                        res.status(400).json({ "message ": `Error while saving token : ${err}` });
                    }
                    res.json({ "message ": `Token saved successfully`, "data": newToken });
                }
            );
        }
    } catch (e) {
        res.status(400).json({
            error: e
        });
    }
});
router.get("/:id", (req, res) => {
    const id = req.params.id;

    tokenSchema.findOne({ "_id": id }, (err, doc) => {
        if (err) res.status(404).json(err);
        else {
            res.status(200).json(doc);
        }
    })
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        await tokenValidator.validateAsync(data);
    }
    catch (e) {
        res.status(400).json({
            error: e.message
        });
        return;
    }
    try {
        const DBerror = await doesExist(data, res);
        if (DBerror) res.status(400).json({ "message ": DBerror });
        else {
            await tokenSchema.findOneAndUpdate({ "_id": id }, { $set: data }, (err, doc) => {
                if (err) res.status(400).json({ "message": "cannot update" });
                else res.json({ "message": "updated successfully", data: doc });
            })
        }
    } catch (e) {
        res.status(400).json({
            error: e
        });
    }

});

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    tokenSchema.findOneAndDelete({ "_id": id }, (err) => {
        if (err) res.status(400).json({ "message": "Can't be deleted" });
        res.status(200).json({ "message": "Deleted sucessfully" })
    })
});



module.exports = router;
