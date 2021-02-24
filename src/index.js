require('dotenv').config(); //this method check if exist a file called .env, read the content of this and assign the values to Environment Variable

const app = require('./server');
require('./database');

app.listen(app.get('port'), () => {
    console.log('listening on port', app.get('port'));
});