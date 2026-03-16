import express, { request, response } from 'express';
import morgan from 'morgan';
const app = express();
app.use(express.json());

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const getId = () => String(Math.floor(Math.random() * 10000))

app.use(morgan('tiny'));


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  const person = persons.find(person => person.id === id)
  if(person){
    res.json(person)
  }else{
    res.status(404).json({
      error: `Person with ID ${id} not found.`
    })
  }
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p> ${date}</p>
    `);
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body.name){
    return res.status(400).json({
      error: 'name is missing!'
    })
  }else{
    const name = persons.find(person => person.name === body.name)
    if(name){
      return res.status(400).json({
        error: 'name must be unique!'
      })
    }
  }

  if(!body.number){
    return res.status(400).json({
      error: 'number is missing!'
    })
  }

  const person = {
    id: getId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  res.json(person)
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

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})