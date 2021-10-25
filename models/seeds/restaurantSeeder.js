const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Rest = require('../restaurant')
const restaurantList = require('../../restaurant.json')
const User = require('../user')

// mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection
// db.on('error', () => {
//   console.log('mongodb error!')
// })
const db = require('../../config/mongoose')
const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]
db.once('open', () => {

  for (let i = 0; i < 2; i++) {

    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash => User.create({
        name: SEED_USER[i].name,
        email: SEED_USER[i].email,
        password: hash
      })
      )
      .then(user => {
        const userId = user._id
        if (i === 0) {
          // const name = restaurantList.name
          restaurantList.results.slice(0, 3).forEach((restaurant) => {
            Rest.create({ name: restaurant.name, name_en: restaurant.name_en, category: restaurant.category, image: restaurant.image, location: restaurant.location, phone: restaurant.phone, google_map: restaurant.google_map, rating: restaurant.rating, description: restaurant.description, userId })
          })
        }
        if (i === 1) {
          return restaurantList.results.slice(3, 6).forEach((restaurant) => {
            Rest.create({ name: restaurant.name, name_en: restaurant.name_en, category: restaurant.category, image: restaurant.image, location: restaurant.location, phone: restaurant.phone, google_map: restaurant.google_map, rating: restaurant.rating, description: restaurant.description, userId })
          })
        }
      }

      )
      .then(() => {
        console.log('done.')
      })
  }
})