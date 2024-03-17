const { glob } = require("glob");
const fs = require("fs");
const path = require("path");
const { read_bos_config } = require("./config");

// dist folder name when building an app
const distFolder = "apps";
//const distFolder = process.env.DIST_FOLDER || "build";

// Main function to orchestrate the dev script
async function dev(opts) {
  generateAllDevJson();
}

function buildFolder(appFolder) {
  if (!fs.existsSync("./build")) {
    fs.mkdirSync(`./build`, { recursive: true });
  }
  if (!fs.existsSync(`./build`)) {
    fs.mkdirSync(`./build`, { recursive: true });
  }
}

// generate the development json from the apps widgets
function generateDevJson(appFolder) {
  let devJson = { components: {}, data: {} };

  const appConfig = read_bos_config(appFolder);
  if (!appConfig.appAccount) {
    return devJson;
  }
  const widgetFiles = glob.sync(`./${distFolder}/widget/**/*.{js,jsx,ts,tsx}`, {
    windowsPathsNoEscape: true,
  });

  widgetFiles.forEach((file) => {
    let fileContent = fs.readFileSync(file, "utf8");
    let widgetPath = file
      .replace(path.join(".", distFolder, "widget"), "")
      .replace(path.extname(file), "");
    let widgetKey = `${appConfig.appAccount}/widget/${widgetPath
      .slice(1)
      .split(path.sep)
      .join(".")}`;
    devJson.components[widgetKey] = { code: fileContent };
  });

  return devJson;
}

function generateAllDevJson() {
  let devJson = { components: {}, data: {} };
  //array of file in folder /apps
  const appFolders = fs.readdirSync("./apps");
  buildFolder(appFolders[0]);

  for (const appFolder of appFolders) {
    let appDevJson = generateDevJson(appFolder);
    devJson.components = {
      ...devJson.components,
      ...appDevJson.components,
    };
    devJson.data = { ...devJson.data, ...appDevJson.data };
  }
  fs.writeFileSync(`./build/data.json`, JSON.stringify(devJson.components));

  return devJson;
}

module.exports = {
  dev,
  generateDevJson,
};
