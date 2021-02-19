const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(`Usage:\nadd a number: node mongo.js <password> <name> <number>\nlist phonebook entries: node mongo.js <password>`)
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fsUser:${password}@cluster0.e7uom.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save()
    .then(result => {
      console.log(`Add ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
  Person.find({})
    .then(result => {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
}
