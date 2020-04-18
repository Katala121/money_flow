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
            return recievedTransactions;
        },

        createTransaction: () => {
            return createdTransaction;
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
            return 1000;
        },
        save: () => {
            return userRegister;
        },
        findByEmail: () => {
            return user;
        },
        findByEmailAndId: () => {
            return user;
        },
        update: () => {
            return user;
        },
    };
});

describe('test users route', () => {
    test('test users GETUSER method success answer', async () => {

        const userRouter = new UserRouter(pool);

        const res = await request(app.use('/api/users', userRouter.router))
            .get('/api/users/2')
            .set('Authorization', token);

        const response = res.body.balance;
        expect(response).toBe(1000);
    });

    test('test users REGISTRATION method success answer', async () => {
        const userRouter = new UserRouter(pool);

        const res = await (await (await request(app.use('/api/users/register', userRouter.router))
            .post('/api/users/register')
            .send({"name": "any",
                "email": "any",
                "password": 'any'})
            .set('Authorization', token)));

        const response = res.body;
        
        expect(JSON.stringify(response)).toBe(JSON.stringify(userRegister));
    });

    test('test users LOGIN method success answer', async () => {
        const userRouter = new UserRouter(pool);

        const res = await (await (await request(app.use('/api/users/login', userRouter.router))
            .post('/api/users/login')
            .send({"email": "any",
                "password": "12345"})
            .set('Authorization', token)));

        const response = res.body;

        expect(JSON.stringify(response)).toBe(JSON.stringify(user));
    });

    test('test users UPDATE method success answer', async () => {
        const userRouter = new UserRouter(pool);

        const res = await (await (await request(app.use('/api/users', userRouter.router))
            .put('/api/users/2')
            .send({"name": "any"})
            .set('Authorization', token)));

        const response = res.body;

        expect(JSON.stringify(response)).toBe(JSON.stringify(user));
    });

    test('test users GETBALANCE method success answer', async () => {

        const userRouter = new UserRouter(pool);

        const res = await request(app.use('/api/users/:id/balance', userRouter.router))
            .get('/api/users/2/balance')
            .set('Authorization', token);

        const response = res.body.balance;
        expect(response).toBe(1000);
    });

    test('test users GETUSERTRANSACTION method success answer', async () => {

        const userRouter = new UserRouter(pool);

        const res = await request(app.use('/api/users/:id/transactions', userRouter.router))
            .get('/api/users/2/transactions')
            .set('Authorization', token);

        const response = res.body;
        expect(JSON.stringify(response)).toBe(JSON.stringify(recievedTransactions));
    });

    test('test users CREATEUSERTRANSACTIONS method success answer', async () => {

        const userRouter = new UserRouter(pool);

        const res = await request(app.use('/api/users/:id/transactions', userRouter.router))
            .post('/api/users/2/transactions')
            .send({"agentName": "any",
                "count": "any",
                "categoryId": "any",
                "transactionType": "any"})
            .set('Authorization', token);

        const response = res.body;
        expect(JSON.stringify(response)).toBe(JSON.stringify(createdTransaction));
    });
});
