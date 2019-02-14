router.get('/diveHome/:id', ensureLoggedIn("/"),(req, res, next) => {
  Dive.findById(req.params.id)
    .then(dive =>{ 
      Comment.find({diveId: dive._id})
      .populate('creatorId')
      .then(comment => {
        console.log(comment);
        res.render('diveHome', { dive, keyG }) })
        
      })
    .catch(error => { console.log(error) }) 
});


{{#if user}}
    logeado
  {{else}}
   no logeado
  {{/if}}

    username: {{user}}xxx
    <a href="/">Home</a>
    
    <a href="/auth/login">Login</a>
    <a href="/auth//logout">Logout</a>
    <a href="./addDive">Add Place</a>

    
    <a href="/auth/signup">Signup</a>
