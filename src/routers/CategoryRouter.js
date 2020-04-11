import express from 'express';
import CategoryController from '../controllers/CategoryController.js';

class CategoryRouter {

    _router = express.Router();

    constructor(pool){
        this._categoryController = new CategoryController(pool);

        this._router.route('/').get(this._categoryController.get);
        this._router.route('/').post(this._categoryController.create);
        this._router.route('/:id').put(this._categoryController.update);
        this._router.route('/:id').delete(this._categoryController.delete);
    }

    get router() {
        return this._router;
    }
}

export default CategoryRouter;
