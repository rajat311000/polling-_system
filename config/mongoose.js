const mongoose = require('mongoose');

<<<<<<< HEAD:configs/db_connection.js

mongoose.connect('mongodb+srv://rajatjain3276:ueK756kX4CKRQCjt@cluster0.ebg6cql.mongodb.net/?retryWrites=true&w=majority');// connecting to db
=======
// const url =mongoose.connect('mongodb://127.0.0.1:27017/myappx') ; // mongoodb url
mongoose.connect('mongodb+srv://rajatjain3276:ueK756kX4CKRQCjt@cluster0.ebg6cql.mongodb.net/?retryWrites=true&w=majority'); 
>>>>>>> edf670a956d706adbae2b44f8c420cd17c6ad1c2:config/mongoose.js

const db = mongoose.connection; // getting connection of db

db.on('error', console.error.bind(console, 'Error: connecting to db :: MongoDB')); // if error while conecting to db


// once connection is open (started)
db.once('open', (err) => {
    if (err) {
        console.log('Error: while opening db connection', err);
    } else {
        console.log('DB connection successfull :: MongoDB');
    }
})


module.exports = db;
