const mongoose = require('mongoose')

if (process.argv.length < 3 ) {
	console.log('give password as argument')
	process.exit(1)
} else if (process.argv.length === 4) {
	console.log('both name and number should be provided')
	process.exit(1)
} else if (process.argv.length > 5) {
	console.log('maximum number of supplied parameters is 2')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.2rnrh.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
	console.log('phonebook:')
	Person
		.find({})
		.then(result => {
			result.forEach(entry => {
				console.log(`${entry.name} ${entry.number}`)
		})
		mongoose.connection.close()
	})
} else if (process.argv.length === 5){
	const person = new Person({
		name: `${process.argv[3]}`,
		number: `${process.argv[4]}`,
	})
	person.save().then(result => {
		console.log(`added ${person.name} number ${person.number} to phonebook`)
		mongoose.connection.close()
	})
}
