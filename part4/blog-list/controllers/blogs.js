import express from 'express'
const router = express.Router()
import Blog from  '../models/blog.js'

router.get('/', (req, res, next) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
    .catch(error => next(error))
})

router.get('/:id', (req, res) => {
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

router.post('/', (req, res, next) => {
  const blog = new Blog(req.body)

  blog.save().then((result) => {
    res.status(201).json(result)
  })
    .catch(error => next(error))
})

router.put('/:id', (req, res) => {
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

router.delete("/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

export default router