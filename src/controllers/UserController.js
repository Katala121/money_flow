import {UserRepository} from "../Repositories/UserRepository.js";
import { AgentRepository } from '../Repositories/AgentRepository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UsersController {

    constructor(pool) {
        this.get = this.get.bind(this);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this._pool = pool;

        this.userRepository = new UserRepository(pool);
        this.agentRepository = new AgentRepository(pool);
    }

    async get(request, response, next) {
        const userName = request.user._name;
        const userId = request.user._id;
        
        const agent = await this._pool.query('SELECT * FROM public."agent" WHERE user_id=$1;', [userId]); 
        const agent_id = agent.rows[0].id;
        const rawBalance = await this._pool.query('SELECT * FROM public."balance" WHERE agent_id=$1;', [agent_id]);
        const userBalance = rawBalance.rows[0].balance;
        response.send(`${userName}, your balance: ${userBalance}`);
    }

    async register(request, response, next) {
        const email = request.body.email;
        const password = request.body.password;
        const name = request.body.name;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = await this.userRepository.save({email: email,name: name, password: hash});

        await this.agentRepository.create({id: user.id, name: user.name});

        const token = jwt.sign({
            email: user.email,
            name: user.name,
            id: user.id
        }, hash, {
            expiresIn: '24h'
        });

        user._token = token;

        response.json(user)
    }

    async login(request, response, next) {
        const email = request.body.email;
        const password = request.body.password;

        const user = await this.userRepository.findByEmail({email: email});

        if (bcrypt.compareSync(password, user.password) === true) {

            const token = jwt.sign({
                email: user.email,
                name: user.name,
                id: user.id
            }, user.password, {
                expiresIn: '24h'
            });

            user._token = token;

            response.json(user);
        } else {
            next(new Error('Invalid auth data'));
        }
    }

    async update(request, response, next) {
        response.send('Update user')
    }

    async delete(request, response, next) {
        response.send('Delete user')
    }
}

export default UsersController;