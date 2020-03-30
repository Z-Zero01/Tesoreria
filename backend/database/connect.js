const mongoose = require('mongoose')
require('colors')

mongoose.connect(process.env.urlDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then( db => console.log('DB is connected'.green))
	.catch( err => console.log(err));
