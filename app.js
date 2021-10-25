const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
// const restaurantList = require('./restaurant.json')
// const mongoose = require('mongoose')
// const Todo = require('./models/todo')
// const db = mongoose.connection
const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const routes = require('./routes')
const port = process.env.PORT


require('./config/mongoose')

const app = express()
// db.on('error', () => {
//   console.log('mongodb error! ')
// })
// db.once('open', () => {
//   console.log('mongodb connected!')
// })
// mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
app.engine('handlebars', exphbs({ defaultlayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
app.use(routes)

// app.get('/', (req, res) => {
//   Todo.find()
//     .lean()
//     .sort({ _id: 'asc' }) //根據 _id 升冪排序
//     .then(todos => res.render('index', { todos }))
//     .catch(error => console.error(error))

// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = restaurantList.results.filter(restaurant => {
//     return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//   })
//   res.render('index', { restaurants: restaurants, keyword: keyword })
// })

// // 新增
// app.get('/todos/new', (req, res) => {
//   return res.render('new')
// })
// app.post('/todos/new', (req, res) => {
//   const name = req.body.name
//   const name_en = req.body.name_en
//   const category = req.body.category
//   const image = req.body.image
//   const location = req.body.location
//   const phone = req.body.phone
//   const google_map = req.body.google_map
//   const rating = req.body.rating
//   const description = req.body.description
//   return Todo.create({ name, name_en, category, image, location, phone, google_map, rating, description })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })
// // 遊覽特定頁面
// app.get('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('detail', { todo }))
//     .catch(error => console.log(error))
// })
// //  修改
// app.get('/todos/:id/edit', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .lean()
//     .then((todo) => res.render('edit', { todo }))
//     .catch(error => console.log(error))
// })
// app.put('/todos/:id', (req, res) => {
//   const id = req.params.id
//   const name = req.body.name
//   const name_en = req.body.name_en
//   const category = req.body.category
//   const image = req.body.image
//   const location = req.body.location
//   const phone = req.body.phone
//   const google_map = req.body.google_map
//   const rating = req.body.rating
//   const description = req.body.description
//   return Todo.findById(id)
//     .then(todo => {
//       todo.name = name
//       todo.name_en = name_en
//       todo.category = category
//       todo.image = image
//       todo.location = location
//       todo.phone = phone
//       todo.google_map = google_map
//       todo.rating = rating
//       todo.description = description
//       return todo.save()
//     })
//     .then(() => res.redirect(`/todos/${id}`))
//     .catch(error => console.log(error))
// })
// // 刪除
// app.delete('/todos/:id', (req, res) => {
//   const id = req.params.id
//   return Todo.findById(id)
//     .then(todo => todo.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })
app.listen(port, () => {
  console.log(`Express is listening on http:/localhost:${port}`)
})