import Balance from '../models/Balance.js';

export class BalanceRepository {
    constructor(pool){
        this._pool = pool;
    }

    async getAllBalances(){
        let balances = [];

        const rawBalances = await this._pool.query('SELECT * FROM public."balance";');
    
        for (let rawBalance of rawBalances.rows) {
            let balance = new Balance({
                id: rawBalance.id,
                balance: rawBalance.balance,
                agent_id: rawBalance.agent_id
            });
            balances.push(balance);
        }

        return balances;
    }

    async createBalance(balance, agent_id){
        const rawBalance = await this._pool.query(
            'INSERT INTO public."balance" (balance, agent_id) VALUES ($1, $2) RETURNING *;'
            , [balance, agent_id]);

        let balanceReturn = new Balance({
            id : rawBalance.rows[0].id,
            balance : rawBalance.rows[0].balance,
            agent_id : rawBalance.rows[0].agent_id
        });

        return balanceReturn;
    }

    async updateBalance(balance, agent_id) {
        const rawBalance = await this._pool.query('UPDATE public."balance" set balance=$1 WHERE agent_id=$2 RETURNING *;', [balance, agent_id]);
        if (rawBalance.rows.lenth === 0) {
            throw Error('Error on update balance');
        }
    }

    async deleteBalance(id){
        const result = await this._pool.query('DELETE FROM public."balance" WHERE id=$1 RETURNING *;', [id]);

        if (result.rows.lenth === 0){
            throw Error('Error on delete balance');
        }

        console.log(result);
    }
}