module.exports = function (api) {
  api.cache(true);

  // console.log('env', process.env.NODE_ENV);
  // console.log('benv', process.env.BABEL_ENV);

  const plugins = [
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env"
    }]
  ]
  return {
    presets: ['babel-preset-expo'],
    // plugins,
  };
};

