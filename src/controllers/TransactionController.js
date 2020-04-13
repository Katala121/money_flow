import Transaction from '../models/Transaction.js';
import { TransactionRepository } from '../Repositories/TransactionRepository.js';
import { BalanceRepository } from '../Repositories/BalanceRepository.js';

class TransactionController {

    constructor(pool) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        // this.update = this.update.bind(this);
        // this.delete = this.delete.bind(this);
        this._pool = pool;

        this.transactionRepository = new TransactionRepository(pool);
        this.balanceRepository = new BalanceRepository(pool);
    }

    async get(request, response, next) {
        const user = request.user;
        response.json(await this.transactionRepository.getAllTransactionOfUser(user));
    }

    async create(request, response, next) {

        const source_agent_id = request.body.source_agent_id;
        const destination_agent_id = request.body.destination_agent_id;
        const count = request.body.count;
        const date = request.body.date;
        const category_id = request.body.category_id;
        const transaction_type = request.body.transaction_type;
        const user = request.user;

        const transactionsUser = await this.transactionRepository.getAllTransactionOfUser(user);
        let countBalance = 0;
        for(let transactionUser of transactionsUser) {
            if (transactionUser._transaction_type === 'incoming') {
                countBalance += parseFloat(transactionUser._count);
            } else {
                countBalance -= parseFloat(transactionUser._count);
            }
        }
        const transaction = await this.transactionRepository.createTransaction(source_agent_id, destination_agent_id, count, date, category_id, transaction_type);
        
        let updatedBalance;
        if (transaction_type === 'incoming'){
            updatedBalance = countBalance + Number(count);
        } else {
            updatedBalance = countBalance - Number(count);
        }
        
        const isBalance = await this._pool.query('SELECT * FROM public."balance" WHERE agent_id=$1;', [source_agent_id]);
        if(isBalance.rows.length !== 0){
            await this.balanceRepository.updateBalance(updatedBalance, source_agent_id);
        } else {
            await this.balanceRepository.createBalance(updatedBalance, source_agent_id);
        }

        response.send(transaction);
    }

    // async update(request, response, next) {

    //     const id = Number(request.params.id);
    //     const count = request.body.count;
    //     try {
    //         const transaction = await this.transactionRepository.updateTransaction({
    //             id: id,
    //             count: count
    //         });
    //         response.json(transaction);
    //     } catch (e) {
    //         response.status(500).send(e.massage);
    //     }
    // }

    // async delete(request, response, next) {
    //     const id = Number(request.params.id);

    //     try {
    //         await this.transactionRepository.deleteTransaction(id);
    //         response.send('ok');
    //     } catch (e) {
    //         response.status(500).send(e.massage);
    //     }
    // }
}

export default TransactionController;
