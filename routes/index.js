var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sessionLogin = req.session;

  res.render('index', { title: 'BooKs WiKi', login  : sessionLogin.login });
});

router.get('/logout', (req,res)=>{
  req.session.destroy();
  res.redirect('/')
})

module.exports = router;
