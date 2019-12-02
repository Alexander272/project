const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')

const fileMiddleware = require('./middleware/file')


const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./utils/hbs-helpers')
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({extended: true}))
app.use(fileMiddleware.array('photo'))

app.use('/', homeRoutes)
app.use('/add', addRoutes)




const PORT = process.env.PORT || 8000


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
