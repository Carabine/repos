const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')
const app = express()
require('dotenv').config()

connectDB()

app.use(cors({
	credentials: true,
	origin: 'https://localhost:3000',
	allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
}))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set('json replacer', function (key, value) {
		if (typeof value === "undefined") {
			return null;
		}
		return value;
	}
)

app.use('/api/signup', require('./routes/signup'))
app.use('/api/login', require('./routes/login'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/users', require('./routes/users'))


app.listen(process.env.PORT, () => {
	console.log('App listen on port ' + process.env.PORT)
})
