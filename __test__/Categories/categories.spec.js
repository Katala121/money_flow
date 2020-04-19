import express from 'express';
import request  from 'supertest';
import CategoryRouter from '../../src/routers/CategoryRouter.js';
import CategoryRepository from '../../src/repositories/CategoryRepository.js';
import Category from '../../src/models/Category.js';

const app = express();
app.use(express.json());

const client = { query: jest.fn(), release: jest.fn() };
const pool = { connect: jest.fn(() => client), query: jest.fn() };

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkcmVzc0BnbWFpbC5jb20iLCJuYW1lIjoiQWxleCIsImlkIjoiMiIsImlhdCI6MTU4NzIxMzk3NywiZXhwIjoxNTg3MzAwMzc3fQ.trwAZ2_yIV7UugtLUaQb36cQbSDhHIhC1YJl7PrRgDg';

const respondeCategory = new Category({
    id: '6',
    name: 'расходы на ЖКХ'
});


jest.mock('../../src/repositories/CategoryRepository.js');

CategoryRepository.mockImplementation(() => {
    return {
        getAllCategories: () => {
            return [1];
        },
        createCategory: () => {
            return respondeCategory;
        },
        updateCategory: () => {
            return respondeCategory;
        },
        deleteCategory: () => {
            return 'ok';
        },
    };
});

describe('test categories route', () => {
    test('test categories GET method success answer', async () => {
        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router))
                                .get('/api/categories')
                                .set('Authorization', token);

        const response = res.body;

        expect(JSON.stringify(response)).toBe(JSON.stringify([1]));
    });

    test('test categories POST method success answer', async () => {
        const categoryRouter = new CategoryRouter(pool);

        const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
                                                .post('/api/categories')
                                                .send({"name": "any"})
                                                .set('Authorization', token)));

        const response = res.body;

        expect(JSON.stringify(response)).toBe(JSON.stringify(respondeCategory));
    });

    test('test categories PUT method success answer', async () => {
        const categoryRouter = new CategoryRouter(pool);

        const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
                                                .put('/api/categories/2')
                                                .send({"name": "any"})
                                                .set('Authorization', token)));

        const response = res.body;

        expect(JSON.stringify(response)).toBe(JSON.stringify(respondeCategory));
    });

    test('test categories DELETE method success answer', async () => {
        const categoryRouter = new CategoryRouter(pool);

        const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
                                                .delete('/api/categories/2')
                                                .set('Authorization', token)));

        const response = res.text;

        expect(response).toBe('ok');
    });
});
