const { version, name, description } = require("../package.json");
const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

const { dev } = require("./dev.js");

async function run() {
  program.name(name).description(description).version(version);

  program.command("dev").action((opts) => {
    dev(opts).catch((err) => {
      console.error(err);
      process.exit(1);
    });
  });
  program.parse();
}

module.exports = {
  run,
};
