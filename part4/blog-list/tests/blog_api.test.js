import { test, after, beforeEach, describe, before } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import assert from 'node:assert'
import helper from './test_helper.js'
import Blog from '../models/blog.js'
import bcrypt from 'bcrypt'
import User from '../models/user.js'

const api = supertest(app)

describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.blogs)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const res = await api.get('/api/blogs')
        assert.strictEqual(res.body.length, helper.blogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const res = await api.get('/api/blogs')

        const contents = res.body.map(e => e.title)
        assert(contents.includes('React patterns'))

    })

    describe('viewing a specific note', () => {
        test('succeeds with a valid id',async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToView = blogsAtStart[0]

            const resultBlog = await api
                .get(`/api/blogs/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            
            assert.deepStrictEqual(resultBlog.body, blogToView)
        })
    })

    test('fails with statuscode 404 if id is valid but does not exist', async () => {
        const validNoneexistingId = await helper.nonExistingId()
        await api.get(`/api/blogs/${validNoneexistingId}`).expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'
        await api.get(`/api/blogs/${invalidId}`).expect(400)
    })

    describe('addition of a new note', () => {
        test('succeeds with valid data', async () => {
            const newBlog = {
                title: 'new title',
                author: 'new author',
                url: 'www.newblog.com',
                likes: 5
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            
            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)

            const titles = blogsAtEnd.map(n => n.title)
            assert(titles.includes('new title'))
        })

        test('fails with statuscode 400 if data invalid', async () => {
            const newBlog = {
                title: 'there\'s a title only'
            }

            await api.post('/api/blogs').send(newBlog).expect(400)
            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.blogs.length)
        })
    })

    describe('deletion of a note', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            const ids = blogsAtEnd.map(n => n.id)
            assert(!ids.includes(blogToDelete.id))
            assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)
        })
    })

    describe('updating a note', () => {
        test('succeeds updating likes', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]

            const updatedLikes = (blogToUpdate.likes || 0) + 10

            const result = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send({ likes: updatedLikes })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            assert.strictEqual(result.body.likes, updatedLikes)

            const blogsAtEnd = await helper.blogsInDb()
            const updated = blogsAtEnd.find(b => b.id === blogToUpdate.id)
            assert.strictEqual(updated.likes, updatedLikes)
        })
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'andin',
            name: 'Anderson',
            password: 'marques'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(username.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'silva',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})