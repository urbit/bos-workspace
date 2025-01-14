/**
 * Handle bos.config.json under apps folder
 * */
const fs = require("fs");
const path = require("path");

function read_bos_config(appName) {
  const configPath = path.join("./apps", "bos.config.json");
  if (!fs.existsSync(configPath)) {
    throw new Error(`bos.config.json not found in ${appName}`);
  }
  const configRaw = fs.readFileSync(configPath);
  try {
    JSON.parse(configRaw);
  } catch (e) {
    throw new Error(`${appName}/bos.config.json is not a valid json file`);
  }
  const config = JSON.parse(configRaw);
  if (!config.appAccount) {
    console.warn(
      `WARNING: appAccount not found in ${appName}/bos.config.json, build script may work but dev requires it`,
    );
  }
  return config;
}

function init_bos_config(appName) {
  const configPath = path.join("./apps", "bos.config.json");

  if (!fs.existsSync(configPath)) {
    const config = JSON.stringify({ appAccount: "app-name" });

    try {
      fs.writeFileSync(configPath, config);
      console.log("\nInitialized bos.config.json for " + appName);

      return true;
    } catch (error) {
      console.error("\nUnable to generate bos.config.json for " + appName);

      return false;
    }
  }

  return false;
}

module.exports = {
  read_bos_config,
  init_bos_config,
};
