let os = require("os");
var path = require("path");
var fs = require("fs");

function mkdir(path: string) {
  if (fs.existsSync(path)) {
    return;
  } else {
    fs.mkdirSync(path);
  }
}

interface SharedConfig {
  userLocaleDir: string;
  configPath: string;
  configDir: string;
  style: string;
  shortcut: string;
}

interface DiffConfig {
  systemLocaleDir: string;
  iconPath: string;
  styleTemplate: string;
  shortcutTemplate: string;
}

interface EnvConfig {
  diffConfig: DiffConfig;
  sharedConfig: SharedConfig;
}

const sharedConfig: SharedConfig = {
  configDir: path.join(os.homedir(), "copytranslator"),
  userLocaleDir: path.join(os.homedir(), "copytranslator", "locales"),
  configPath: path.join(os.homedir(), "copytranslator", "copytranslator.json"),
  style: path.join(os.homedir(), "copytranslator", "styles.css"),
  shortcut: path.join(os.homedir(), "copytranslator", "shortcuts.json")
};

const ProductionConfig: DiffConfig = {
  systemLocaleDir: path.join(process.resourcesPath, "locales"),
  iconPath: path.join(process.resourcesPath, "icon.ico"),
  styleTemplate: path.join(process.resourcesPath, "styles.css"),
  shortcutTemplate: path.join(process.resourcesPath, "shortcuts.json")
};

const DevConfig: DiffConfig = {
  systemLocaleDir: path.join(process.cwd(), "dist_locales"),
  iconPath: path.join(process.cwd(), "icon.ico"),
  styleTemplate: path.join(process.cwd(), "src", "styles.css"),
  shortcutTemplate: path.join(process.cwd(), "src", "shortcuts.json")
};

const envConfig: EnvConfig = {
  sharedConfig: sharedConfig,
  diffConfig:
    process.env.NODE_ENV == "production" ? ProductionConfig : DevConfig
};

mkdir(envConfig.sharedConfig.configDir);
mkdir(envConfig.sharedConfig.userLocaleDir);

export { envConfig };
