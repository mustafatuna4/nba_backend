const usersRouter = require("express").Router();
const User = require("../models/user");
const NBA = require("nba");

usersRouter.get("/", async (request, response) => {
  console.log(JSON.stringify(request.headers));
  const user = await User.findById(request.headers.userid);
  if (!user) return;
  const playerNames = user.players;

  const array = await Promise.all(
    playerNames.map(async (player) => {
      try {
        return NBA.stats.playerSplits({
          PlayerID: player.id,
          LastNGames: "1",
          Season: "2022-23",
        });
      } catch {
        console.log(player);
        console.log("error mane");
      }
    })
  );
  const avgArray = await Promise.all(
    playerNames.map(async (player) => {
      try {
        return NBA.stats.playerSplits({
          PlayerID: player.id,
          Season: "2022-23",
        });
      } catch {
        console.log(player);
        console.log("error mane");
      }
    })
  );
  const stats = array.map((player) =>
    player ? player.overallPlayerDashboard[0] : null
  );
  //201939
  const avgStats = avgArray.map((player) =>
    player ? player.overallPlayerDashboard[0] : null
  );
  let playerArr = [];
  stats.forEach((playerStat, index) => {
    if (playerStat) {
      const player = {
        name: playerNames[index].name,
        id: playerNames[index].id,
        blocks: playerStat.blk,
        freeThrowPct: playerStat.ftPct,
        assists: playerStat.ast,
        rebounds: playerStat.reb,
        threepts: playerStat.fG3M,
        points: playerStat.pts,
        minutes: playerStat.min,
        plusMinus: playerStat.plusMinus,
        avgBlocks: avgStats[index].blk,
        avgFreeThrowPct: avgStats[index].ftPct,
        avgAssists: avgStats[index].ast,
        avgRebounds: avgStats[index].reb,
        avgThreepts: avgStats[index].fG3M,
        avgPoints: avgStats[index].pts,
        avgMinutes: avgStats[index].min,
        avgPlusMinus: avgStats[index].plusMinus,
      };
      playerArr.push(player);
    } else {
      const player = {
        name: playerNames[index].name,
        id: playerNames[index].id,
        blocks: 0,
        freeThrowPct: 0,
        assists: 0,
        rebounds: 0,
        threepts: 0,
        points: 0,
        minutes: 0,
        plusMinus: 0,
        avgBlocks: avgStats[index].blk,
        avgFreeThrowPct: avgStats[index].ftPct,
        avgAssists: avgStats[index].ast,
        avgRebounds: avgStats[index].reb,
        avgThreepts: avgStats[index].fG3M,
        avgPoints: avgStats[index].pts,
        avgMinutes: avgStats[index].min,
        avgPlusMinus: avgStats[index].plusMinus,
      };
      playerArr.push(player);
    }
  });
  response.status(201).json(playerArr);
  console.log(playerArr);
});

usersRouter.post("/", async (request, response) => {
  const user = new User({});
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
