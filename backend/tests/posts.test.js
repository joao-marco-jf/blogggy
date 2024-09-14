import request from 'supertest'
import app from '../app/index.js';


describe('Integration', () => {
    let createdPostId = 0;
    let token = '';

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/auth/signin')
            .send({ email: 'joaomarcos00512@gmail.com', password: 'jm140400'})
            .set('Accept', 'application/json');
        token = response.body.data.token;
    })

    describe('POST /api/posts', () => {
        it('Should create a new post', async () => {
            const response = await request(app)
                .post('/api/posts')
                .set('Authorization', `Bearer ${token}`)
                .field('title', 'Test Post')
                .field('author_name', 'Test Author')
                .field('body', 'Test Body')
                .attach('thumbnail', Buffer.from('fake_image'), 'image.png');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Post created');
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBe(1);
            createdPostId = response.body.data[0].id;
        })
    })
    
    describe('GET /api/posts/:id', () => {
        it('Should return a single post', async () => {
            const response = await request(app)
                .get(`/api/posts/${createdPostId}`)

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Post found');
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBe(1);
            expect(response.body.data[0]).toHaveProperty('title', 'Test Post');
            expect(response.body.data[0]).toHaveProperty('author_name', 'Test Author');
            expect(response.body.data[0]).toHaveProperty('body', 'Test Body');
        })
    })

    describe('DELETE /api/posts/:id', () => {
        it('Should delete a post', async () => {
            const response = await request(app)
                .delete(`/api/posts/${createdPostId}`)
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Post deleted');
        })
    })
})

describe('Unit', () => {
    let token = '';

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/auth/signin')
            .send({ email: 'joaomarcos00512@gmail.com', password: 'jm140400'})
            .set('Accept', 'application/json');
        token = response.body.data.token;
    })

    describe('GET /api/posts', () => {
        it('Should return a list of posts', async () => {
            const response = await request(app)
                .get('/api/posts')

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Posts found');
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThanOrEqual(0);
        })
    })

    describe('GET /api/posts?limit=2', () => {
        it('Should return a list of 2 posts or less than', async () => {
            const response = await request(app) 
                .get('/api/posts?limit=2')

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Posts found');
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeLessThanOrEqual(2);
        })
    })

    describe('DELETE /api/posts', () => {
        it('Should return a 404 error', async () => {
            const response = await request(app)
                .delete('/api/posts/999999')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toBe(404);
            expect(response.body).toBe('Post not found');
        })
    })
})