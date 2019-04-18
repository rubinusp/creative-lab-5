const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/pokedex', {
  useNewUrlParser: true
});

const teamSchema = new mongoose.Schema({
  owner: String,
  title: String,
  pokemons: Array,
});

const Team = mongoose.model('Team', teamSchema);

// upload a pokemon team
router.post("/", async (req, res) => {
  try {
    if (!req.body.title) {
	    return res.status(400).send({
		    message: "Missing Team Name",
	    });
    }

    let pokeList = [];
    req.body.boxes.forEach(element => {
	    pokeList.push(element.entry_number);
    });

    const team = new Team({
	owner: req.body.owner,
	title: req.body.title,
	pokemons: pokeList,
    });

    await team.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all pokemon teams
router.get("/all", async (req, res) => {
  try {
    let teams = await Team.find();
    return res.send(teams);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Team,
  routes: router,
}
