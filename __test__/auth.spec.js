import express          from 'express';
import request          from 'supertest';
import User             from '../src/models/User.js';
import CategoryRouter   from '../src/routers/CategoryRouter.js';

const app = express();

const client = { query: jest.fn(), release: jest.fn() };
const pool = { connect: jest.fn(() => client), query: jest.fn() };

import UserRepository   from '../src/repositories/UserRepository.js';
import auth             from '../src/security/auth.js';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkcmVzc0BnbWFpbC5jb20iLCJuYW1lIjoiQWxleCIsImlkIjoiMiIsImlhdCI6MTU4NzMyNzA0MSwiZXhwIjoxNTg3NDEzNDQxfQ.d51gwmBTUKbe57Rz12pha0Puf5hcCwb6Xag-S2gi2qQ';

const user = new User({
    id: '2',
    name: 'Alex',
    email: 'adress@gmail.com',
});
user._password = '$2a$10$D8F6/EkCGPuMsM8SkSevKO7/AWNHeTo0hpxFdt5GZ7yGHWzvLgZxK';

jest.mock('../src/repositories/UserRepository.js');

describe('test auth route', () => {
    test('test AUTH method success answer', async () => {
        UserRepository.mockImplementation(() => {
            return {
                findByEmailAndId: () => {
                    return user;
                }
            };
        });

        const categoryRouter = new CategoryRouter(pool);
        const res = await request(app.use('/api/categories', auth))
            .get('/api/categories')
            .set('Authorization', token);

        const response = res.user;

        expect(JSON.stringify(response)).toBe(JSON.stringify(user));
    });

    test('test AUTH method error answer', async () => {
        UserRepository.mockImplementation(() => {
            return {
                findByEmailAndId: () => {
                    throw new Error('Error input data');
                }
            };
        });

        const categoryRouter = new CategoryRouter(pool);
        const res = await request(app.use('/api/categories', auth))
            .get('/api/categories')
            .set('Authorization', token);

        expect(res.statusCode).toBe(500);
    });
});
