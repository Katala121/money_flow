import express from 'express';
import request  from 'supertest';
import CategoryRouter from '../../src/routers/CategoryRouter.js';
import CategoryRepository from '../../src/repositories/CategoryRepository.js';

const app = express();
app.use(express.json());

const client = { query: jest.fn(), release: jest.fn() };
const pool = { connect: jest.fn(() => client), query: jest.fn() };

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkcmVzc0BnbWFpbC5jb20iLCJuYW1lIjoiQWxleCIsImlkIjoiMiIsImlhdCI6MTU4NzIxMzk3NywiZXhwIjoxNTg3MzAwMzc3fQ.trwAZ2_yIV7UugtLUaQb36cQbSDhHIhC1YJl7PrRgDg';

jest.mock('../../src/repositories/CategoryRepository.js');

CategoryRepository.mockImplementation(() => {
    return {
        getAllCategories: () => {
            throw Error('Error on get categories');
        },
        createCategory: () => {
            throw Error('Error on create category');
        },
        updateCategory: () => {
            throw Error('Error on update category');
        },
        deleteCategory: () => {
            throw Error('Error on delete category');
        },
    };
});

describe('test categories route', () => {
    test('test categories GET method error answer', async () => {
        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router))
                                .get('/api/categories');

        expect(res.statusCode).toBe(500);
    });

    test('test categories POST method error answer', async () => {
        const categoryRouter = new CategoryRouter(pool);

        const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
                                                .post('/api/categories')
                                                .send({"name": "any"})
                                                .set('Authorization', token)));

        expect(res.statusCode).toBe(500);
    });

    test('test categories PUT method error answer', async () => {
        const categoryRouter = new CategoryRouter(pool);

        const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
                                                .put('/api/categories/2')
                                                .send({"name": "any"})
                                                .set('Authorization', token)));

        expect(res.statusCode).toBe(500);
    });

    test('test categories DELETE method error answer', async () => {
        const categoryRouter = new CategoryRouter(pool);

        const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
                                                .delete('/api/categories/2')
                                                .set('Authorization', token)));

        expect(res.statusCode).toBe(500);
    });
});
