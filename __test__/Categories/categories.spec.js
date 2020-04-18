import express from 'express';
import request  from 'supertest';
import CategoryRouter from '../../src/routers/CategoryRouter.js';
import CategoryRepository from '../../src/repositories/CategoryRepository.js';

const app = express();
app.use(express.json());

const client = { query: jest.fn(), release: jest.fn() };
const pool = { connect: jest.fn(() => client), query: jest.fn() };


jest.mock('../../src/repositories/CategoryRepository.js');


describe('test categories route', () => {
    test('test categories GET method success answer', async () => {
        CategoryRepository.mockImplementation(() => {
            return {
                getAllCategories: () => {
                    return [1];
                },
                createCategory: () => {
                    return resp;
                },
            };
        });

        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router))
                                .get('/api/categories')
                                .auth();

        const response = res.body;

        expect(JSON.stringify(response)).toBe(JSON.stringify([1]));
    });

    test('test categories GET method error answer', async () => {
        // CategoryRepository.mockImplementation(() => {
        //     return {
        //         getAllCategories: () => {
        //             throw new Error('Invalid auth data');
        //         },
        //     };
        // });

        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router))
                                .get('/api/categories');

        console.log(res.statusCode);
        expect(res.statusCode).toBe(500);
    });

    const resp = {
        "id": "6",
        "name": "расходы на ЖКХ"
    };

    test('test categories POST method success answer', async () => {
        // CategoryRepository.mockImplementation(() => {
        //     return {
        //         createCategory: () => {
        //             return resp;
        //         },
        //     };
        // });
        const categoryRouter = new CategoryRouter(pool);

        const res = await (await (await request(app.use('/api/categories', categoryRouter.router))
                                                .post('/api/categories')
                                                .send({"name": "any"})));

        const response = res.body;

        expect(JSON.stringify(response)).toBe(JSON.stringify(resp));
    });
});
