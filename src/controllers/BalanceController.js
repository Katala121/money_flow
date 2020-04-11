import Balance from '../models/Balance.js';
import { BalanceRepository } from '../Repositories/BalanceRepository.js';

class BalanceController {

    constructor(pool) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.balanceRepository = new BalanceRepository(pool);
    }

    async get(request, response, next) {
        response.json(await this.balanceRepository.getAllBalances());
    }

    async create(request, response, next) {

        const balance = request.body.balance;
        const agent_id = request.body.agent_id;

        const balanceRetrun = await this.balanceRepository.createBalance(balance, agent_id);

        response.send(balanceRetrun);
    }

    async update(request, response, next) {

        const id = Number(request.params.id);
        const balance = request.body.balance;
        const agent_id = request.body.agent_id;

        try {
            const balanceRetrun = await this.balanceRepository.updateBalance({
                id: id,
                balance: balance,
                agent_id: agent_id
            });
            response.json(balanceRetrun);
        } catch (e) {
            response.status(500).send(e.massage);
        }
    }

    async delete(request, response, next) {
        const id = Number(request.params.id);

        try {
            await this.balanceRepository.deleteBalance(id);
            response.send('ok');
        } catch (e) {
            response.status(500).send(e.massage);
        }
    }
}

export default BalanceController;
