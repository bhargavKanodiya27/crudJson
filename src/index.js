let express = require('express');
let bodyParser = require('body-parser');
let routes = require('./router')
let app = express();
app.use(bodyParser.json());
app.use('/',routes);
app.listen(3000,()=>{
    console.log('listening on port 3000')
})