const express = require('express')
const router = express.Router()
const Rest = require('../../models/restaurant')

router.get('/', (req, res) => {
  Rest.find()
    .lean()
    .sort({ _id: 'asc' }) //根據 _id 升冪排序
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))

})

//搜尋功能
router.get('/search', (req, res) => {

  const keyword = req.query.keyword

  return Rest.find()
    .lean()
    .then(restaurants => restaurants.filter(restaurants => {
      return restaurants.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || restaurants.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    }))

    .then((restaurants) => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))

})

module.exports = router