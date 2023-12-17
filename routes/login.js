var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var schema = require('../models/schema')
var bcrypt = require('bcrypt')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login',{title : "login form", error: null,  login  : false});
});

router.get('/new', (req,res)=>{
  res.render('new',{title : "Create Account", error: null,  login  : false})
})

router.post('/new-acc',async (req,res)=>{
  let email = req.body.email
  let pwd = req.body.pwd
  
  
  if(email != "" && pwd != ""){
    let user = schema.user;
    let qry = {email:email};
    let userS = await user.findOne(qry).then(async (data)=>{
      if(data){
        res.render('login', {title: "login Fail", error: "Already Exits", login: false})
      } else {
        let saltRounds = 10;
        let passSalt = await bcrypt.genSalt(saltRounds, async (err, salt)=>{
          let passHash = await bcrypt.hash(pwd, salt, async (err, hash)=>{
            let account = {email:email, pwd: hash};
            let newUser = new user(account);
            let saveUser = await newUser.save();
          })
        })
        res.render('login',{title: 'success', error : "Ready to Login", login  : false})
      }
    })
  }

  
  res.render('login',{title: 'Login', error :null})
})



router.post('/',async (req,res)=>{
  let email = req.body.email;
  let pwd = req.body.pwd;
  let sessionLogin = req.session;
  sessionLogin.login = false;
  let loginSuccess = false;
  let qry = {email:email};
  let user = schema.user;
  
    if (email != '' && pwd != ''){
      let userCheck = await user.findOne(qry).then(async (data)=>{
        if(data){
          let passCheck = await bcrypt.compare(pwd, data.pwd).then((isMatch)=>{
            if(isMatch){
              loginSuccess = true;
              sessionLogin.login = true;
            }
          })
        } 
        if( loginSuccess === true){
          res.redirect('/')
        }
      })
    } else {
        res.render('login', {title: "Login Fail", error: "Username Or Password Does Not Match", login : false})
    }

})


module.exports = router;
