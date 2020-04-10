import express from 'express';
import BalanceController from '../controllers/BalanceController.js';

class BalanceRouter {

    _router = express.Router();

    constructor(pool){
        this._balanceController = new BalanceController(pool);

        this._router.route('/').get(this._balanceController.get);
        this._router.route('/').post(this._balanceController.create);
        this._router.route('/:id').put(this._balanceController.update);
        this._router.route('/:id').delete(this._balanceController.delete);
    }

    get router() {
        return this._router;
    }
}

export default BalanceRouter;