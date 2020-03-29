import express from 'express';
import CategoryController from '../controllers/CategoryController.js';

const router = express.Router();
const categoryController = new CategoryController();

router.route('/').get(categoryController.get);
router.route('/').post(categoryController.create);
router.route('/:id').put(categoryController.update);
router.route('/:id').delete(categoryController.delete);

export default router;