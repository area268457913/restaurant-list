const express = require('express')
const router = express.Router()
const Rest = require('../../models/restaurant')

// 新增
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/new', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  // const name = req.body.name
  // const name_en = req.body.name_en
  // const category = req.body.category
  // const image = req.body.image
  // const location = req.body.location
  // const phone = req.body.phone
  // const google_map = req.body.google_map
  // const rating = req.body.rating
  // const description = req.body.description


  return Rest.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 遊覽特定頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Rest.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})
//  修改
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Rest.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  // const name = req.body.name
  // const name_en = req.body.name_en
  // const category = req.body.category
  // const image = req.body.image
  // const location = req.body.location
  // const phone = req.body.phone
  // const google_map = req.body.google_map
  // const rating = req.body.rating
  // const description = req.body.description
  return Rest.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
// 刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Rest.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router