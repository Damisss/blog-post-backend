const devConfig = { mongo_url: 'mongodb://localhost:27017/MongoDB-dev' };
const testConfig = { mongo_url: 'mongodb://localhost:27017/MongoDB-test' };
const prodConfig = { mongo_url: 'mongodb://localhost:27017/MongoDB-pro' };
const defaultConfig = { PORT: process.env.PORT || 3000 };

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

module.exports = {
  ...defaultConfig, 
  ...envConfig(process.env.NODE_ENV),
};

