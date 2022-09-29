// import { Db } from 'mongodb';

const router = require('express').Router()

let Project = require('../models/project.model');

router.route("/").get((req,res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    
    const name = req.body.name;
    const description = req.body.description;
    const url = req.body.url;

    const newProject = new Project({
        name,
        description,
        url,
    });

    newProject.save()
        .then(() => res.json('Project added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req,res)=> {
    const deleteid = req.query.id
    Project.findByIdAndDelete(deleteid)
        .then(() => res.json("Project deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;