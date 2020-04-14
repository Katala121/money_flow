import express from 'express';
import request  from 'supertest';
import CategoryRouter from '../src/routers/CategoryRouter.js';

const app = express();

const client = { query: jest.fn(), release: jest.fn() };
const pool = { connect: jest.fn(() => client), query: jest.fn() };

import CategoryRepository from '../src/repositories/CategoryRepository.js';

jest.mock('../src/repositories/CategoryRepository.js');

describe('test categories route', () => {
    test('test categories GET method success answer', async () => {
        CategoryRepository.mockImplementation(() => {
            return {
                getAllCategories: () => {
                    return [1];
                },
            };
        });

        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router)).get('/api/categories');

        const response = res.body;

        expect(JSON.stringify(response)).toBe(JSON.stringify([1]));
    });
});