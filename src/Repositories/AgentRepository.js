import Agent from '../models/Agent.js';

export class AgentRepository {
    constructor(pool){
        this._pool = pool;
    }

    async getAllAgents(){
        let agents = [];

        const rawAgents = await this._pool.query('SELECT * FROM public."agent";');
    
        for (let rawAgent of rawAgents.rows) {
            let agent = new Agent({
                id: rawAgent.id,
                name: rawAgent.name,
                user_id: rawAgent.user_id
            });
            agents.push(agent);
        }

        return agents;
    }

    async createAgent(name, user_id){
        const rawAgent = await this._pool.query(
            'INSERT INTO public."agent" (name, user_id) VALUES ($1, $2) RETURNING *;'
            , [name, user_id]);

        let agent = new Agent({
            id : rawAgent.rows[0].id,
            name : rawAgent.rows[0].name,
            user_id : rawAgent.rows[0].user_id
        });

        return agent;
    }

    async updateAgent({id, name, user_id}) {
        const rawAgent = await this._pool.query('UPDATE public."agent" set name=$2, user_id=$3 WHERE id=$1 RETURNING *;', [id, name, user_id]);

        if (rawAgent.rows.lenth === 0) {
            throw Error('Error on update agent');
        }

        let agent = new Agent({
            id : rawAgent.rows[0].id,
            name : rawAgent.rows[0].name,
            user_id : rawAgent.rows[0].user_id
        });

        return agent;
    }

    async deleteAgent(id){
        const result = await this._pool.query('DELETE FROM public."agent" WHERE id=$1 RETURNING *;', [id]);

        if (result.rows.lenth === 0){
            throw Error('Error on delete agent');
        }

        console.log(result);
    }
}