import Transaction from '../models/Transaction.js';

export class TransactionRepository {
    constructor(pool){
        this._pool = pool;
    }

    async getAllTransaction(){
        let transactions = [];

        const rawTransactions = await this._pool.query('SELECT * FROM public."transaction";');
    
        for (let rawTransaction of rawTransactions.rows) {
            let transaction = new Transaction({
                id: rawTransaction.id,
                source_agent_id: rawTransaction.source_agent_id,
                destination_agent_id: rawTransaction.destination_agent_id,
                count: rawTransaction.count,
                date: rawTransaction.date,
                category_id: rawTransaction.category_id,
                transaction_type: rawTransaction.transaction_type
            });
            transactions.push(transaction);
        }

        return transactions;
    }

    async getAllTransactionOfUser(user){
        let transactionsUser = [];
        const userId = user.id;

        const agent = await this._pool.query('SELECT * FROM public."agent" WHERE user_id=$1;', [userId]);
        const agentId = agent.rows[0].id;

        const rawTransactions = await this._pool.query('SELECT * FROM public."transaction" WHERE source_agent_id=$1;', [agentId]);
    
        for (let rawTransaction of rawTransactions.rows) {
            let transaction = new Transaction({
                id: rawTransaction.id,
                source_agent_id: rawTransaction.source_agent_id,
                destination_agent_id: rawTransaction.destination_agent_id,
                count: rawTransaction.count,
                date: rawTransaction.date,
                category_id: rawTransaction.category_id,
                transaction_type: rawTransaction.transaction_type
            });
            transactionsUser.push(transaction);
        }

        return transactionsUser;
    }

    async createTransaction(source_agent_id, destination_agent_id, count, date, category_id, transaction_type){
        const rawTransaction = await this._pool.query(
            'INSERT INTO public."transaction" (source_agent_id, destination_agent_id, count, date, category_id, transaction_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;'
            , [source_agent_id, destination_agent_id, count, date, category_id, transaction_type]);

        let transaction = new Transaction({
            id : rawTransaction.rows[0].id,
            source_agent_id : rawTransaction.rows[0].source_agent_id,
            destination_agent_id : rawTransaction.rows[0].destination_agent_id,
            count : rawTransaction.rows[0].count,
            date : rawTransaction.rows[0].date,
            category_id : rawTransaction.rows[0].category_id,
            transaction_type : rawTransaction.rows[0].transaction_type
        });

        return transaction;
    }

    async updateTransaction({id, count}) {
        const rawTransaction = await this._pool.query('UPDATE public."transaction" set count=$2 WHERE id=$1 RETURNING *;', [id, count]);

        if (rawTransaction.rows.lenth === 0) {
            throw Error('Error on update transaction');
        }

        let transaction = new Transaction({
            id : rawTransaction.rows[0].id,
            source_agent_id : rawTransaction.rows[0].source_agent_id,
            destination_agent_id : rawTransaction.rows[0].destination_agent_id,
            count : rawTransaction.rows[0].count,
            date : rawTransaction.rows[0].date,
            category_id : rawTransaction.rows[0].category_id,
            transaction_type : rawTransaction.rows[0].transaction_type
        });


        return transaction;
    }

    async deleteTransaction(id){
        const result = await this._pool.query('DELETE FROM public."transaction" WHERE id=$1 RETURNING *;', [id]);

        if (result.rows.lenth === 0){
            throw Error('Error on delete transaction');
        }

        console.log(result);
    }
}