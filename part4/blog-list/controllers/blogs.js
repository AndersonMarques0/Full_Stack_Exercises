import express from 'express'
const router = express.Router()
import Blog from  '../models/blog.js'
import User from '../models/user.js'

router.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1, user: 1})
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
  try {
    const blog = new Blog(req.body)
    const user = await User.findById(req.body.user)

    if(!user) {
      return res.status(400).json({ error: 'userId missing or not valid'})
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query' }
    )

    if (updatedBlog) {
      res.json(updatedBlog)
    } else {
      res.status(400).end()
    }
  } catch (error) {
    next(error)
  }

})

router.delete("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

export default router