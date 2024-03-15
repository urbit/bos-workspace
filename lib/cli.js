// const { deploy_app, deploy_data } = require("./deploy");
const { version, name, description } = require("../package.json");
const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

const { dev } = require("./dev.js");

async function run() {
  program.name(name).description(description).version(version);

  program
    .command("dev")
    // .description("Run the development server")
    .action((opts) => {
      dev(opts).catch((err) => {
        console.error(err);
        process.exit(1);
      });
    });
  program.parse();
}

// function getAppFolders() {
//   const dir = "./apps";

//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true }, (err) => {
//       if (err) {
//         return console.error(err);
//       }
//     });
//   }

//   return fs.readdirSync(dir);
// }

module.exports = {
  run,
};
