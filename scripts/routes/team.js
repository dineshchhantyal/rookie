const router = require("express").Router();

const teamValidator = require("../Joe/teamValidator");
const teamSchema = require("../Schema/teamSchema");

router.get("/", function (req, res) {
  teamSchema.find({}, (err, teams) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(teams);
    }
  });
});

router.post("/", function (req, res) {
  data = req.body;
  teamValidator.validate(data, (err) => {
    teamSchema.find(
      {
        name: data.name,
      },
      (err, data) => {
        if (data) {
          res.send(400).json({
            message: "Team already exist",
          });
          return;
        }
      }
    );
    if (err) {
      res.send(400).json({
        message: "Team data is invalid",
      });
      return;
    }
  });
  console.log("dataaa", data);
  teamSchema.create(data, (err, team) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(team);
    }
  });
});

router.put("/:teamId", function (req, res) {
  data = req.body;
  teamValidator.validate(data, (err) => {
    if (err) {
      res.status(400).send(err);
    }
  });
  console.log("dataaa", data);
  teamSchema.updateOne({ _id: req.params.teamId }, data, (err, team) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(team);
    }
  });
});

router.get("/:teamId", function (req, res) {
  teamSchema.findOne({ _id: req.params.teamId }, (err, team) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(team);
    }
  });
});

// delete certain field
router.delete("/:teamId/:field", function (req, res) {
  teamSchema.updateOne(
    { _id: req.params.teamId },
    { $unset: { [req.params.field]: "" } },
    (err, team) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(team);
      }
    }
  );
});

module.exports = router;
