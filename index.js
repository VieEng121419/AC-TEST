import { createInterface } from "readline";
import { readFileSync } from "fs";
import chalk from "chalk";
import { searchData } from "./helper.js";


const nations = JSON.parse(readFileSync("./nations.json"));
const teams = JSON.parse(readFileSync("./teams.json"));
const players = JSON.parse(readFileSync("./players.json"));
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
const OPTIONS = {
  SEARCH: "1",
  VIEW: "2",
  QUIT: "quit",
};
const SUB_OPTIONS = {
  PLAYERS: "1",
  TEAMS: "2",
  NATIONS: "3",
};
const optionsName = {
  1: {
    data: players,
    name: "Players",
  },
  2: {
    data: teams,
    name: "Teams",
  },
  3: {
    data: nations,
    name: "Nations",
  },
};
let option;
let objSearch = {
  key: "",
  value: "",
};

const handleSearch = () => {
  if (objSearch.key.trim() === "" || objSearch.value.trim() === "") {
    rl.write("Term or value is invalid!! \n");
    return;
  }

  switch (option) {
    case SUB_OPTIONS.PLAYERS:
      handleSearchPlayers();
      break;
    case SUB_OPTIONS.TEAMS:
      handleSearchTeams();
      break;
    default:
      handleSearchNations();
      break;
  }
};

const handleSearchPlayers = () => {
  const result = searchData(players, objSearch.key, objSearch.value);

  if (result.length === 0) {
    rl.write("Not found!!\n");
    rl.write("Select again, please!\n");
    handleSelectSearch();
    return;
  }

  result.forEach((item) => {
    const teamFinded = teams.find((team) => {
      return team._id === item.team_id;
    });
    const nationFinded = nations.find((nation) => {
      return nation._id === item.nation_id;
    });

    item.team = teamFinded.name;
    item.nation = nationFinded.name;
  });
  console.log(result);
};

const handleSearchTeams = () => {
  const result = searchData(teams, objSearch.key, objSearch.value);

  if (result.length === 0) {
    rl.write("Not found!!\n");
    rl.write("Select again, please!\n");
    handleSelectSearch();
    return;
  }

  result.forEach((item) => {
    const listPlayers = players
      .filter((player) => {
        return player.team_id === item._id;
      })
      .map((player) => player.name);
    const nationFinded = nations.find((nation) => {
      return nation._id === item.nation_id;
    });

    item.players = listPlayers;
    item.nation = nationFinded.name;
  });
  console.log(result);
};

const handleSearchNations = () => {
  const result = searchData(nations, objSearch.key, objSearch.value);

  if (result.length === 0) {
    rl.write("Not found!!\n");
    rl.write("Select again, please!\n");
    handleSelectSearch();
    return;
  }

  result.forEach((item) => {
    const listPlayers = players
      .filter((player) => {
        return player.nation_id === item._id;
      })
      .map((player) => player.name);
    const listTeams = teams
      .filter((team) => {
        return team.nation_id === item._id;
      })
      .map((team) => team.name);

    item.players = listPlayers;
    item.teams = listTeams;
  });
  console.log(result);
};

const handleInvalidValue = () => {
  run();
};

const handleSelectOptions = (value) => {
  if (
    value !== OPTIONS.SEARCH &&
    value !== OPTIONS.VIEW &&
    value !== OPTIONS.QUIT
  ) {
    handleInvalidValue();
    return;
  }
  switch (value) {
    case OPTIONS.SEARCH:
      handleSelectSearch();
      break;
    case OPTIONS.VIEW:
      handleSelectView();
      break;
    case OPTIONS.QUIT:
      rl.close();
      break;
  }
};

const handleSelectSearch = async () => {
  option = await new Promise((resolve) => {
    rl.write("Select 1: Players or 2: Team or 3: Nations \n");
    rl.question("", resolve);
  });

  objSearch.key = await new Promise((resolve) => {
    rl.write("Enter search term \n");
    rl.question("", resolve);
  });

  objSearch.value = await new Promise((resolve) => {
    rl.write("Enter search value \n");
    rl.question("", resolve);
  });

  handleSearch();
};

const handleSelectView = async () => {
  option = await new Promise((resolve) => {
    rl.write("Select 1: Players or 2: Team or 3: Nations \n");
    rl.question("", resolve);
  });

  if (optionsName.hasOwnProperty(option)) {
    console.log(`=> Result: \n Search ${optionsName[option]?.name} with`);
    for (const key in optionsName[option]?.data[0]) {
      console.log(key);
    }
  }
  handleSelectView();
};

const run = async () => {
  rl.write(
    `Type ${chalk.yellow("quit")} to exit at any time. Press ${chalk.yellow(
      "Enter"
    )} to ${chalk.green("continue")} \n \n `
  );
  rl.write("\t Select search options: \n");
  rl.write("\t - Press 1 to search \n");
  rl.write("\t - Press 2 to view a list of searchable fields \n");
  rl.write(`\t - Type ${chalk.yellow("quit")} to ${chalk.green("exit")} \n`);

  const option = await new Promise((resolve) => {
    rl.question("", resolve);
  });
  handleSelectOptions(option);
};

run();

rl.on("close", () => {
  rl.close();
});
