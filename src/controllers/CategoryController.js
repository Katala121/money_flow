import CategoryRepository from '../repositories/CategoryRepository.js';

class CategoryController {
    constructor(pool) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.categotyRepository = new CategoryRepository(pool);
    }

    async get(request, response) {
        try {
            const allCategories = await this.categotyRepository.getAllCategories();
            response.json(allCategories);
        } catch (e) {
            response.status(500)
                .send(e.message);
        }
    }

    async create(request, response, next) {
        try {
            const { name } = request.body;
            const category = await this.categotyRepository.createCategory(name);
            response.send(category);
        } catch (e) {
            next(new Error('Error on create category'));
        }
    }

    async update(request, response) {
        const id = Number(request.params.id);
        const { name } = request.body;

        try {
            const category = await this.categotyRepository.updateCategory({
                id,
                name,
            });
            response.send(category);
        } catch (e) {
            response.status(500)
                .send(e.message);
        }
    }

    async delete(request, response) {
        const id = Number(request.params.id);

        try {
            await this.categotyRepository.deleteCategory(id);
            response.send('ok');
        } catch (e) {
            response.status(500)
                .send(e.message);
        }
    }
}

export default CategoryController;
