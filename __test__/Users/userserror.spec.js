import express                  from 'express';
import request                  from 'supertest';
import UserRouter               from '../../src/routers/UserRouter.js';
import UserRepository           from '../../src/repositories/UserRepository.js';
import AgentRepository          from '../../src/repositories/AgentRepository.js';
import TransactionRepository    from '../../src/repositories/TransactionRepository.js';
import User                     from '../../src/models/User.js';
import auth                     from '../../src/security/auth.js';


const app = express();
app.use(express.json());

const client = { query: jest.fn(), release: jest.fn() };
const pool = { connect: jest.fn(() => client), query: jest.fn() };

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkcmVzc0BnbWFpbC5jb20iLCJuYW1lIjoiQWxleCIsImlkIjoiMiIsImlhdCI6MTU4NzIxMzk3NywiZXhwIjoxNTg3MzAwMzc3fQ.trwAZ2_yIV7UugtLUaQb36cQbSDhHIhC1YJl7PrRgDg';

const user = new User({
    id: '2',
    name: 'Alex',
    email: 'adress@gmail.com',
});
user._password = '$2a$10$D8F6/EkCGPuMsM8SkSevKO7/AWNHeTo0hpxFdt5GZ7yGHWzvLgZxK';

const userRegister = new User({
    id: '7',
    name: 'John',
    email: 'testuser@test.com'
});

const createdTransaction = {
    "id": "30",
    "source_agent_name": "Alex_2",
    "destination_agent_name": "2",
    "count": "300,00 ₽",
    "date": "2020-04-18T21:00:00.000Z",
    "transaction_type": "outgoing",
    "category_name": "Продукты"
};

const recievedTransactions = [
    {
        "id": "4",
        "source_agent_name": "Alex",
        "destination_agent_name": "Alex",
        "count": "100,00 ₽",
        "date": "2020-04-11T21:00:00.000Z",
        "transaction_type": "outgoing",
        "category_name": "Продукты"
    },
    {
        "id": "5",
        "source_agent_name": "Alex",
        "destination_agent_name": "Alex",
        "count": "100,00 ₽",
        "date": "2020-04-11T21:00:00.000Z",
        "transaction_type": "outgoing",
        "category_name": "Продукты"
    }
];

jest.mock('../../src/repositories/AgentRepository.js');
jest.mock('../../src/repositories/UserRepository.js');
jest.mock('../../src/repositories/TransactionRepository.js');
jest.mock('../../src/security/auth.js');

AgentRepository.mockImplementation();

TransactionRepository.mockImplementation(() => {
    return {
        getTransactionByParams: () => {
            throw new Error('Error on get transactions');
        },

        createTransaction: () => {
            throw new Error('Error on create transactions');
        }
    }
});

auth.mockImplementation((request, response, next) => {
    request.user = user;
    next();
});

UserRepository.mockImplementation(() => {
    return {
        getUserBalance: () => {
            throw new Error('Invalid user information');
        },
        save: () => {
            throw new Error('Invalid user information');
        },
        findByEmail: () => {
            throw new Error('Invalid user information');
        },
        findByEmailAndId: () => {
            return user;
        },
        update: () => {
            throw new Error('Invalid user information');
        },
    };
});

describe('test users route', () => {
    test('test users GETUSER method error answer', async () => {

        const userRouter = new UserRouter(pool);

        const res = await request(app.use('/api/users', userRouter.router))
            .get('/api/users/2')
            .set('Authorization', token);

        expect(res.statusCode).toBe(500);
    });

    test('test users REGISTRATION method error answer', async () => {
        const userRouter = new UserRouter(pool);

        const res = await (await (await request(app.use('/api/users/register', userRouter.router))
            .post('/api/users/register')
            .send({"name": "any",
                "email": "any",
                "password": 'any'})
            .set('Authorization', token)));

        expect(res.statusCode).toBe(500);
    });

    test('test users LOGIN method error answer', async () => {
        const userRouter = new UserRouter(pool);

        const res = await (await (await request(app.use('/api/users/login', userRouter.router))
            .post('/api/users/login')
            .send({"email": "any",
                "password": "12345"})
            .set('Authorization', token)));

        expect(res.statusCode).toBe(500);
    });

    test('test users UPDATE method error answer', async () => {
        const userRouter = new UserRouter(pool);

        const res = await (await (await request(app.use('/api/users', userRouter.router))
            .put('/api/users/2')
            .send({"name": "any"})
            .set('Authorization', token)));

        expect(res.statusCode).toBe(500);
    });

    test('test users GETBALANCE method error answer', async () => {

        const userRouter = new UserRouter(pool);

        const res = await request(app.use('/api/users/:id/balance', userRouter.router))
            .get('/api/users/2/balance')
            .set('Authorization', token);

        expect(res.statusCode).toBe(500);
    });

    test('test users GETUSERTRANSACTION method error answer', async () => {

        const userRouter = new UserRouter(pool);

        const res = await request(app.use('/api/users/:id/transactions', userRouter.router))
            .get('/api/users/2/transactions')
            .set('Authorization', token);

        expect(res.statusCode).toBe(500);
    });

    test('test users CREATEUSERTRANSACTIONS method error answer', async () => {

        const userRouter = new UserRouter(pool);

        const res = await request(app.use('/api/users/:id/transactions', userRouter.router))
            .post('/api/users/2/transactions')
            .send({"agentName": "any",
                "count": "any",
                "categoryId": "any",
                "transactionType": "any"})
            .set('Authorization', token);

        expect(res.statusCode).toBe(500);
    });
});
