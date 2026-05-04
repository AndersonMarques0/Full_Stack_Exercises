import express from 'express'
const router = express.Router()
import Blog from  '../models/blog.js'

router.get('/', async (req, res, next) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if(blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res, next) => {
  const blog = new Blog(req.body)

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
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

router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default router