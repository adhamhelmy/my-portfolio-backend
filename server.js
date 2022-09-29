const express = require('express');
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.PROJECTS_DB_URI || 'mongodb://adhamhelmy:adhamhelmy@ac-oxr6seb-shard-00-00.32isubn.mongodb.net:27017,ac-oxr6seb-shard-00-01.32isubn.mongodb.net:27017,ac-oxr6seb-shard-00-02.32isubn.mongodb.net:27017/?ssl=true&replicaSet=atlas-zmtjs7-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(uri , {
    useNewUrlParser: false,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', ()=> {
    try {
        console.log("MongoDB database connection established successfully");
    }
     catch (error) {
        console.log(error)
    }
});
const projectsRouter = require('./backend/api/projects.route');
app.use("/api/v1/projects", projectsRouter)

if(process.env.NODE_ENV=== 'production') {
    app.use(express.static('frontend2.0/build'));
}
// code above was addd for deployment
app.use(express.static(__dirname + '/public'))
//app.use(require('./ServerRouting/index.jsx'))
app.get('/*', function (req, res){
    //res.json(__dirname)
    
    res.sendFile(path.join(__dirname, 'frontend2.0/public/index.html'))
  })

  

app.listen(port, ()=> {
    console.log('server is running on port: ' + port)
});


