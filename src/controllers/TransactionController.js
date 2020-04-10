import Transaction from '../models/Transaction.js';
import { TransactionRepository } from '../Repositories/TransactionRepository.js';

class TransactionController {

    constructor(pool) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.transactionRepository = new TransactionRepository(pool);
    }

    async get(request, response, next) {
        response.json(await this.transactionRepository.getAllTransaction());
    }

    async create(request, response, next) {

        const source_agent_id = request.body.source_agent_id;
        const destination_agent_id = request.body.destination_agent_id;
        const count = request.body.count;
        const date = request.body.date;
        const category_id = request.body.category_id;
        const transaction_type = request.body.transaction_type;

        const transaction = await this.transactionRepository.createTransaction(source_agent_id, destination_agent_id, count, date, category_id, transaction_type);

        response.send(transaction);
    }

    async update(request, response, next) {

        const id = Number(request.params.id);
        const count = request.body.count;
        try {
            const transaction = await this.transactionRepository.updateTransaction({
                id: id,
                count: count
            });
            response.json(transaction);
        } catch (e) {
            response.status(500).send(e.massage);
        }
    }

    async delete(request, response, next) {
        const id = Number(request.params.id);

        try {
            await this.transactionRepository.deleteTransaction(id);
            response.send('ok');
        } catch (e) {
            response.status(500).send(e.massage);
        }
    }
}

export default TransactionController;
