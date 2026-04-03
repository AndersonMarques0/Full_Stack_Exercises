import express, { request, response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'

const app = express()
app.use(express.json())
dotenv.config()
app.use(morgan('dev'))

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(process.env.MONGODB_URL, { family: 4 })

app.use(express.json())

app.get('/api/blogs', (req, res, next) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
    .catch(error => next(error))
})

app.get('/api/blogs/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/blogs', (req, res, next) => {
  const blog = new Blog(req.body)

  blog.save().then((result) => {
    res.status(201).json(result)
  })
    .catch(error => next(error))
})

app.put('/api/blogs/:id', (req, res) => {
  const { title, author, url, likes } = req.body

  Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes }
  )
    .then(updatedBlog => {
      if (updatedBlog) {
        res.json(updatedBlog)
      } else {
        res.status(400).end()
      }
    })
    .catch(error => next(error))

})

app.delete("/api/blogs/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})