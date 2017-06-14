var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index.html')
})

// add your routes here

router.get('/casework/assign', function (req, res) {
  var assign = req.query.case

  res.render('casework/assign', {
    'case': assign
  })
})
router.get('/casework/assign--confirm', function (req, res) {
  var assign = req.query.case

  res.render('casework/assign--confirm', {
    'case': assign
  })
})









module.exports = router
