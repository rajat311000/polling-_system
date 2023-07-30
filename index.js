const express = require('express')

const port =8000;
const app = express();
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(express.urlencoded);
app.use(cookieParser);

app.use('/',require('./routes/index'));


app.listen(port,(err)=>{
    if(err){
        console.log("error in server", err);
        return;
    }
    console.log(`server in running on port ${port}`)
})


