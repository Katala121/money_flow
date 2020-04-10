import Agent from '../models/Agent.js';
import { AgentRepository } from '../Repositories/AgentRepository.js';

class AgentController {

    constructor(pool) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.agentRepository = new AgentRepository(pool);
    }

    async get(request, response, next) {
        response.json(await this.agentRepository.getAllAgents());
    }

    async create(request, response, next) {

        const name = request.body.name;
        const user_id = request.body.user_id;

        const agent = await this.agentRepository.createAgent(name, user_id);

        response.send(agent);
    }

    async update(request, response, next) {

        const id = Number(request.params.id);
        const name = request.body.name;
        const user_id = request.body.user_id;

        try {
            const agent = await this.agentRepository.updateAgent({
                id: id,
                name: name,
                user_id: user_id
            });
            response.json(agent);
        } catch (e) {
            response.status(500).send(e.massage);
        }
    }

    async delete(request, response, next) {
        const id = Number(request.params.id);

        try {
            await this.agentRepository.deleteAgent(id);
            response.send('ok');
        } catch (e) {
            response.status(500).send(e.massage);
        }
    }
}

export default AgentController;
