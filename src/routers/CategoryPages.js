import express from 'express';
import CategoryController from '../controllers/CategoryController.js';
import CategoryRepository from '../Repositories/CategoryRepository.js';

const router = express.Router();
const categoryController = new CategoryController(CategoryRepository);

router.route('/all').get(categoryController.listAll);

export default router;