let projectData = {};

class Dataa {
    data;
    getData = () => this.data
    setData = (data) => {
      this.data = data
    }
  }
  
  const dataa = new Dataa()
  
  const router = require('express').Router()

  router.route("/postData").post((req,res) =>{
    dataa.setData(req.body)
    console.log(req.body);
    res.send(projectData);
  })
  console.log(projectData);
  router.route("/getData").get( (req, res) => {
    console.log(dataa.getData())
    projectData = dataa.getData();
    res.send(projectData);
  })