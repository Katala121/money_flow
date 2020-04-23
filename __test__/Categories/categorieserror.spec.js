import express            from 'express';
import request            from 'supertest';
import CategoryRouter     from '../../src/routers/CategoryRouter.js';
import CategoryRepository from '../../src/repositories/CategoryRepository.js';
import auth               from '../../src/security/auth.js';
import User               from '../../src/models/User.js';

const app = express();
app.use(express.json());

const client = {
    query: jest.fn(),
    release: jest.fn()
};
const pool = {
    connect: jest.fn(() => client),
    query: jest.fn()
};

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkcmVzc0BnbWFpbC5jb20iLCJuYW1lIjoiQWxleCIsImlkIjoiMiIsImlhdCI6MTU4NzMyNzA0MSwiZXhwIjoxNTg3NDEzNDQxfQ.d51gwmBTUKbe57Rz12pha0Puf5hcCwb6Xag-S2gi2qQ';

const user = new User({
    id: '2',
    name: 'Alex',
    email: 'adress@gmail.com',
});
user._password = '$2a$10$D8F6/EkCGPuMsM8SkSevKO7/AWNHeTo0hpxFdt5GZ7yGHWzvLgZxK';

jest.mock('../../src/repositories/CategoryRepository.js');
jest.mock('../../src/security/auth.js');

auth.mockImplementation((request, response, next) => {
    request.user = user;
    next();
});

describe('test categories route', () => {
    test('test categories GET method error answer', async () => {
        CategoryRepository.mockImplementation(() => {
            return {
                getAllCategories: () => {
                    throw Error('Error on get categories');
                },
            };
        });
        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router))
            .get('/api/categories');

        expect(res.statusCode)
            .toBe(500);
    });

    test('test categories POST method error answer', async () => {
        CategoryRepository.mockImplementation(() => {
            return {
                createCategory: () => {
                    throw Error('Error on create category');
                },
            };
        });
        const categoryRouter = new CategoryRouter(pool);

        const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
            .post('/api/categories')
            .send({ 'name': 'any' })
            .set('Authorization', token)));

        expect(res.statusCode)
            .toBe(500);
    });

    test('test categories PUT method error answer', async () => {
        CategoryRepository.mockImplementation(() => {
            return {
                updateCategory: () => {
                    throw Error('Error on update category');
                },
            };
        });
        const categoryRouter = new CategoryRouter(pool);

        const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
            .put('/api/categories/2')
            .send({ 'name': 'any' })
            .set('Authorization', token)));

        expect(res.statusCode)
            .toBe(500);
    });

    test('test categories DELETE method error answer', async () => {
        CategoryRepository.mockImplementation(() => {
            return {
                deleteCategory: () => {
                    throw Error('Error on delete category');
                },
            };
        });
        const categoryRouter = new CategoryRouter(pool);

        const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
            .delete('/api/categories/2')
            .set('Authorization', token)));

        expect(res.statusCode)
            .toBe(500);
    });
});
