const playersRouter = require("express").Router();
const User = require("../models/user");
const NBA = require("nba");
const { response } = require("express");

playersRouter.get("/", async (request, response) => {
  console.log("bukayo saske");
  const bigData = await NBA.stats.playerStats({
    Season: "2022-23",
  });

  console.log("saka");
  const allPlayers = bigData.leagueDashPlayerStats;
  const playerNames = allPlayers.map((player) => ({
    id: player.playerId,
    name: player.playerName,
    team: player.teamAbbreviation,
  }));

  console.log(playerNames, "cmon forsan");
  response.status(201).json(playerNames);
});

playersRouter.post("/", async (request, response, next) => {
  const body = request.body;
  console.log(body.name, "The forsan name");
  try {
    const user = await User.findById(body.userId);

    const index = user.players.findIndex((player) => player.id == body.id);
    index === -1 ? response.status(400) : console.log("Player already exists!");

    const player = {
      name: body.name,
      id: body.id,
    };
    console.log(user, "suser");
    user.players = user.players.concat(player);
    await user.save();

    response.status(201).json(user.players);
  } catch {
    return;
  }
});
playersRouter.delete("/", async (request, response, next) => {
  const body = request.body.source;
  console.log(body, "bodee");

  try {
    const user = await User.findById(body.userId);
    user.players = user.players.filter((player) => player.id !== body.playerId);

    console.log("forrsan");
    await user.save();
    console.log(body.playerId, "The forsan id");
    response.status(201).json(user.players);
  } catch {
    console.log("ERRROR ANT");
    return;
  }
});
module.exports = playersRouter;
