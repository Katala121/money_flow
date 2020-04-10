import express from 'express';
import TransactionController from '../controllers/TransactionController.js';

class TransactionRouter {

    _router = express.Router();

    constructor(pool){
        this._transactionController = new TransactionController(pool);

        this._router.route('/').get(this._transactionController.get);
        this._router.route('/').post(this._transactionController.create);
        this._router.route('/:id').put(this._transactionController.update);
        this._router.route('/:id').delete(this._transactionController.delete);
    }

    get router() {
        return this._router;
    }
}

export default TransactionRouter;