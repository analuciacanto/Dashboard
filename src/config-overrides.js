import settings  from "./settings";

module.exports = function override(config, env) {
    
    config.externals = {
      ...config.externals,
      settings: settings,
    };
  
    return config;
  };
  
