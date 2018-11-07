var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  })
})


router.get('/vacancies', function (req, res, next) {
  res.render('vacancies', {
    layout: 'layout-royalhaskoning',
    title: 'Vacancies'
  })
})

router.get('/vacancies-detail', function (req, res, next) {
  res.render('vacancies-detail', {
    layout: 'layout-royalhaskoning',
    title: 'Vacancies Detail'
  })
})

router.get('/projects', function (req, res, next) {
  res.render('projects', {
    layout: 'layout-royalhaskoning',
    title: 'Vacancies Detail'
  })
})

router.get('/other', function (req, res, next) {
  res.render('other', {
    layout: 'layout-empty',
    title: 'Other'
  })
})

module.exports = router