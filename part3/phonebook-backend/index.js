import express, { request, response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Person from './model/person.js';

const app = express();
app.use(express.static('dist'))
app.use(express.json());
dotenv.config();

let persons = [];

const getId = () => String(Math.floor(Math.random() * 10000))

app.use(morgan('tiny'));

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person)
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p> ${date}</p>
    `);
})

morgan.token('person', (req, res) => {

  if(req.method === 'POST'){
    
    return JSON.stringify({
      "name": req.body.name,
      "number": req.body.number
    })
  }else{
    return '';
  }

})

app.use(morgan(':method :url :status :res[content-length] :response-time ms :person'))

app.post('/api/persons', (req, res) => {
  const body = req.body
  
  if(!body.name){
    return res.status(400).json({
      error: 'name is missing!'
    })
  }

  const person = new Person({
    id: getId(),
    name: body.name,
    number: body.number
  }) 

  person.save().then(savedPerson => res.json(savedPerson))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  if(person){
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
  }else{
    res.status(404).json({
      error: `Person with ID ${id} not exists.`
    })
  }
  
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})