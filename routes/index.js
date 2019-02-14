require('dotenv').config();

const express = require('express');
const router  = express.Router();
const Dive = require("../models/Dive");
const Comment = require("../models/Comment");
const cloudinary = require("../options/cloudinary");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const keyG = process.env.GOOGLEKEY;


/* GET home page */
router.get('/', (req, res, next) => {
  Dive.find()
    .then(dive =>{ res.render('index', { dive, user: req.session.passport.user,ruta:true}) })
    .catch(error => { console.log(error) }) 
  
});

router.get('/myDives', ensureLoggedIn("/"),(req, res, next) => {
  Dive.find({creatorId: req.session.passport.user })
    .then(dive =>{ res.render('myDives', { dive, user: req.session.passport.user, ruta:false }) })
    .catch(error => { console.log(error) }) 
});

router.get('/dive/:id', ensureLoggedIn("/"),(req, res, next) => {
  Dive.findById(req.params.id)
    .then(dive =>{
       res.render('dive', { dive, keyG }) 
      })
    .catch(error => { console.log(error) }) 
});

router.get('/diveHome/:id', ensureLoggedIn("/"),(req, res, next) => {
  Dive.findById(req.params.id)
    .then(dive =>{ 
      Comment.find({diveId: dive._id})
      .populate('creatorId')
      .then(comment => {
        res.render('diveHome', {comment, dive, user: req.session.passport.user, keyG , ruta:true }) })
        
      })
    .catch(error => { console.log(error) }) 
});

router.get('/addComment/:id', ensureLoggedIn("/"),(req, res, next) => {
  Dive.findById(req.params.id)    
    .then(dive =>{  res.render('addComment', { dive }) })
    .catch(error => { console.log(error) }) 

});

router.post('/addComment',(req, res, next) => {
  
  const newComment = new Comment({
      creatorId  :  req.session.passport.user,
      diveId     :  req.body.id,
      valuation  :  req.body.valuation,
      description:  req.body.description,
      
  });
  newComment
    .save()
    .then(() => res.redirect("/"))
    .catch(err => console.log("An error ocurred sabing a post"));
});


router.get('/addDive', ensureLoggedIn("/"),(req, res, next) => {
  res.render('addDive');
});


router.post('/addDive',cloudinary.single("photo"),(req, res, next) => {
  
  const newDive = new Dive({
      creatorId  :  req.user._id,
      namePlace  :  req.body.namePlace,
      description:  req.body.description,
      depthMeters:  req.body.depthMeters,
      temperature:  req.body.temperature,
      dateDive   :  req.body.dateDive,
      timeDiveMin:  req.body.timeDiveMin,
      valuations :  req.body.valuations,
      lng        :  +req.body.lng,
      lat        :  +req.body.lat,
      picPath    :  req.file.secure_url,
      picName    :  req.file.originalname
  });
  console.log("no encuentro el camino",req.file.picPath);
  newDive
    .save()
    .then(() => res.redirect("/myDives"))
    .catch(err => console.log("An error ocurred sabing a post"));
});

router.get('/updateDive/:id', ensureLoggedIn("/"),(req, res, next) => {
  Dive.findById(req.params.id)
    .then(dive =>{  res.render('updateDive', { dive }) })
    .catch(error => { console.log(error) }) 
  
});

router.post('/updateDive',(req, res, next) => {
 
  const diveId = req.body.id;
  const diveUpdate = { 
    namePlace  :  req.body.namePlace,
    description:  req.body.description,
    depthMeters:  req.body.depthMeters,
    temperature:  req.body.temperature,
    dateDive   :  req.body.dateDive,
    timeDiveMin:  req.body.timeDiveMin,
    valuations :  req.body.valuations,
    lng        :  +req.body.lng,
    lat        :  +req.body.lat,
  }

  Dive.findOneAndUpdate({_id: diveId}, diveUpdate, {new: true})
    .then(() => res.redirect('/myDives'))
    .catch(error => { console.log(error) }) 
  
});


module.exports = router;
