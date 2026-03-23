import express, { request, response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Person from './model/person.js';
import person from './model/person.js';

const app = express();

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

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
  Person.findById(req.params.id)
  .then((person) => {
    if(person) {
      res.json(person)
    }else {
      res.status(404).end()
    }
  })
  .catch(error => {
    console.log(error)
    res.status(400).send({ error: 'malformatted id'})
  })
})

app.get('/info', (request, response, next) => {
  const date = new Date()

  Person.countDocuments({})
    .then(count => {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
      `);
    })
    .catch(error => next(error));
});

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

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name is missing!' })
  }

  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        return res.status(400).json({ error: 'this name already exists!' })
      }

      const person = new Person({
        name: body.name,
        number: body.number
      })
      return person.save()
    })
    .then(savedPerson => {
      if (savedPerson) {
        res.json(savedPerson)
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;

  Person.findById(req.params.id)
    .then(person => {
      if(!person){
        return res.status(404).end()
      } 
    })

  Person.updateOne({ name: name }, { number: number })
    .then(result => {
      if (result.matchedCount > 0) {
        res.status(200).send({ message: "Update successful" });
      } else {
        res.status(404).send({ error: "Name not found" });
      }
    })

})

app.delete('/api/persons/:id', (req, res, next) => {
  person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})