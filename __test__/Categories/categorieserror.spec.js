import express from 'express';
import request  from 'supertest';
import CategoryRouter from '../../src/routers/CategoryRouter.js';
import CategoryRepository from '../../src/repositories/CategoryRepository.js';

const app = express();

const client = { query: jest.fn(), release: jest.fn() };
const pool = { connect: jest.fn(() => client), query: jest.fn() };


jest.mock('../../src/repositories/CategoryRepository.js');

describe('test categories route', () => {
    test('test categories GET method error answer', async () => {
        CategoryRepository.mockImplementation(() => {
            return {
                getAllCategories: () => {
                    return new Error('Invalid input data');
                },
            };
        });

        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router)).get('/api/categories');

        // const response = res.body;

        expect(res.statusCode).toBe();
    });
});
