const Rest = require('../restaurant')
const restaurantList = require('../../restaurant.json')

// mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection
// db.on('error', () => {
//   console.log('mongodb error!')
// })
const db = require('../../config/mongoose')
db.once('open', () => {
  // console.log('mongodb connected!')
  restaurantList.results.forEach((restaurant) => {
    Rest.create(restaurant)
  })
  console.log('done')
})