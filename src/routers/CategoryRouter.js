import express from 'express';
import CategoryController from '../controllers/CategoryController.js';
import auth  from '../security/auth.js';

class CategoryRouter {

    _router = express.Router();

    constructor(pool){
        this._categoryController = new CategoryController(pool);

        this._router.route('/').get(auth, this._categoryController.get);
        this._router.route('/').post(auth, this._categoryController.create);
        this._router.route('/:id').put(auth, this._categoryController.update);
        this._router.route('/:id').delete(auth, this._categoryController.delete);
    }

    get router() {
        return this._router;
    }
}

export default CategoryRouter;
