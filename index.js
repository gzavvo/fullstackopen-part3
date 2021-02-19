require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('content', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

//let persons = [
//  {
//    id: 1,
//    name: "Arto Hellas",
//    number: "040-123456"
//  },
//  {
//    id: 2,
//    name: "Ada Lovelace",
//    number: "39-44-123456"
//  },
//  {
//    id: 3,
//    name: "Dan Abramov",
//    number: "12-43-234345"
//  },
//  {
//    id: 4,
//    name: "Mary Poppendieck",
//    number: "39-23-6423122"
//  }
//]

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const newPerson = request.body

  if (!newPerson.name) {
    return response.status(400).json({
      error: "name missing"
    })
  } else if (!newPerson.number) {
    return response.status(400).json({
      error: "number missing"
    })
  } 

  const person = new Person({
    name: newPerson.name,
    number: newPerson.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
