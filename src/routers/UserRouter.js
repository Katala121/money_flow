import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();
const userController = new UserController();

router.route('/').get(userController.get);
router.route('/').post(userController.create);
router.route('/:id').put(userController.update);
router.route('/:id').delete(userController.delete);

export default router;