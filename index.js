//require('dotenv').config()
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const Store = require('connect-mongo');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ak-development.gmdnp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

(() => {
	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log('DB Connected')
	})
	.catch((err) => console.log('Something went wrong: ', err))
})();

app.use(express.json());

app.use(
	session({
		secret: 'noq_abc',
		saveUninitialized: false,
		store: Store.create({
			mongoUrl: url
		}),
		resave: false,
		cookie: {
			maxAge: 36000000,
			secure: true,
			httpOnly: true
		}
	})
);




app.post('/', (req,res) => {
	req.session.view = 100;
	return res.json({
		success: true,
		view: req.session.view
	})

})

app.get('/', (req,res) => {
	res.json({
		view: req.session.view
	});
})


app.listen(process.env.PORT ? process.env.PORT : 3030, () => console.log('connected: ') )
