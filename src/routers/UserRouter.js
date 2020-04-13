import express  from 'express';
import UserController  from '../controllers/UserController.js';
import auth  from '../security/auth.js';

class UserRouter {

    _router = express.Router();

    constructor(pool) {
        this._userController = new UserController(pool);

        this._router.route('/').get(auth, this._userController.get);
        this._router.route('/register').post(this._userController.register);
        this._router.route('/login').post(this._userController.login);
        this._router.route('/:id').put(auth, this._userController.update);
        this._router.route('/:id').delete(auth, this._userController.delete);
    }

    get router() {
        return this._router;
    }

}

export default UserRouter;