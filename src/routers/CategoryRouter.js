import express               from 'express';
import CategoryController from '../controllers/CategoryController.js';
import CategoryRepository from '../Repositories/CategoryRepository.js';

const router = express.Router();

const categoryController = new CategoryController(CategoryRepository);

router.route('/').get(categoryController.get);
router.route('/').post(categoryController.create);
router.route('/:id').put(categoryController.update);
router.route('/:id').delete(categoryController.delete);

export default router;
