import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import assert from 'node:assert'
import helper from './test_helper.js'
import Blog from '../models/blog.js'

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test.only('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, helper.blogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const res = await api.get('/api/blogs')

    const contents = res.body.map(e => e.title)
    assert(contents.includes('React patterns'))

})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'Title test',
        author: 'Author test',
        url: 'www.urltest.com',
        likes: 54
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)
    const contents = blogsAtEnd.map(n => n.title)
    assert(contents.includes('Title test'))
})

test('note without content is not added', async () => {
    const newBlog = {
        author: 'fictional author'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.blogs.length)
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
        assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/notes/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const ids = blogsAtEnd.map(n => n.id)
    assert(!ids.includes(blogToDelete.id))
    assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)
})

test('blogs are returned as json and correct amount is present', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
        assert.strictEqual(res.body.length,helper.blogs.length)
})

after(async () => {
    await mongoose.connection.close()
})