import express from 'express';
import AgentController from '../controllers/AgentController.js';

class AgentRouter {

    _router = express.Router();

    constructor(pool){
        this._agentController = new AgentController(pool);

        this._router.route('/').get(this._agentController.get);
        this._router.route('/').post(this._agentController.create);
        this._router.route('/:id').put(this._agentController.update);
        this._router.route('/:id').delete(this._agentController.delete);
    }

    get router() {
        return this._router;
    }
}

export default AgentRouter;