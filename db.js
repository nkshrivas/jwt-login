const mongoose = require('mongoose');
const db = () =>{
mongoose.connect('mongodb://localhost:27017/hexa',
   { 
    useNewUrlParser: true,
     useUnifiedTopology: true 
    }).then(console.log("mongodb connected successfully") )
    .catch(err => console.log(err));
}
module.exports = db;