const express = require('express');
const router  = express.Router();
const Dive = require("../models/Dive");
const cloudinary = require("../options/cloudinary");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/myDives', ensureLoggedIn("/"),(req, res, next) => {
  Dive.find({creatorId: req.session.passport.user })
    .then(dive =>{ res.render('myDives', { dive }) })
    .catch(error => { console.log(error) }) 
});

router.get('/dive/:id', ensureLoggedIn("/"),(req, res, next) => {
  Dive.findById(req.params.id)
    .then(dive =>{ res.render('dive', { dive }) })
    .catch(error => { console.log(error) }) 
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


module.exports = router;
