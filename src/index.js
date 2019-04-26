const express = require('express');
const constants = require('./config/constant');
require('./config/dataBase');
const { middleware } = require('./config/middleware');
const { apiRoutes } = require('./modules/index');

const app = express();
middleware(app);

app.get('/', (req, res) => {
  res.send('working');
});
apiRoutes(app);
 
app.listen(constants.PORT, () => {
  console.log('server is running');
}); 
