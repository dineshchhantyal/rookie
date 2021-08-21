const MCQ = require("../Schema/mcqSchema");

var router = require("express").Router();

router.get('/', (req, res, next) => {
    MCQ.find({}, (err, mcq) => {
        if (err) {
            next(err);
        }
        res.json(mcq);
    }
    )
});

router.post('/', async (req, res, next) => {
    const data = req.body.data;
    // add data to MCQ schema in database
    // add json file to file/json folder

    const finalData = {
        "description": data.form.description,
        "questions": data.form.questions
    }
    console.log(finalData);

    try {
        mcq = new MCQ();
        mcq.data = JSON.stringify(finalData);
        await mcq.save(
            (err, mcq) => {
                if (err) {
                    next(err);
                }
                res.json({
                    messae: "MCQ added successfully",
                    mcq: mcq
                });
            }
        );

    }
    catch (err) {
        next(err);
    }
}
)

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    MCQ.findById(id, (err, mcq) => {
        if (err) {
            next(err);
        }
        res.json(mcq);
    }
    )
}
)

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    MCQ.findByIdAndRemove(id, (err, mcq) => {
        if (err) {
            next(err);
        }
        res.json({
            message: "MCQ deleted successfully",
        })
    }
    )
})
module.exports = router;
