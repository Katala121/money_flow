import express            from 'express';
import request            from 'supertest';
import CategoryRepository from '../../src/repositories/CategoryRepository.js';
import UserRepository     from '../../src/repositories/UserRepository.js';
import CategoryRouter     from '../../src/routers/CategoryRouter.js';
import User               from '../../src/models/User';


const app = express();

const client = {
    query: jest.fn(),
    release: jest.fn()
};
const pool = {
    connect: jest.fn(() => client),
    query: jest.fn()
};

jest.mock('../../src/repositories/UserRepository.js');
jest.mock('../../src/repositories/CategoryRepository.js');

describe('test categories route', () => {
    test('test categories GET method success answer', async () => {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpQGlkaWNldmlzLmVkdSIsIm5hbWUiOiJIYXJyaWV0IFZhcmdhcyIsImlkIjoiMyIsImlhdCI6MTU4NzY0Njk1MiwiZXhwIjoxNTg3NzMzMzUyfQ.JhpIUjOp-J8cg08VRS_-WSa3_dGoOjIKQIY_DLr2Hlc';

        CategoryRepository.mockImplementation(() => ({
            getAllCategories: () => [1],
        }));

        const user = new User({
            id: 3,
            name: 'Harriet Vargas',
            email: 'vi@idicevis.edu'
        });
        user._password = '$2a$10$wOim5rfkQD2g.s3vq9JJEet6vTSbkq0X7c1FzFDMEipJShLXip2rG';

        UserRepository.mockImplementation(() => ({
            findByEmailAndId: () => user,
        }));

        const categoryRouter = new CategoryRouter(pool);

        const res = await request(app.use('/api/categories', categoryRouter.router))
            .get('/api/categories')
            .set('Authorization', token);

        const response = res.body;

        expect(JSON.stringify(response))
            .toBe(JSON.stringify([1]));
    });
});
