import { CategoryRepository } from '../Repositories/CategoryRepository.js';

class CategoryController {

  constructor(pool) {
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this._pool = pool;

    this.categotyRepository = new CategoryRepository(pool);
  }

  async get(request, response, next) {
    response.json(await this.categotyRepository.getAllCategories());
  }

  async create(request, response, next) {

    const name = request.body.name;

    const category = await this.categotyRepository.createCategory(name);

    response.send(category);
  }

  async update(request, response, next) {
    const id = Number(request.params.id);
    const name = request.body.name;

    try {
      const category = await this.categotyRepository.updateCategory({
        id: id,
        name: name
      });
      response.json(category);
    } catch (e) {
      response.status(500).send(e.message);
    }
  }

  async delete(request, response, next) {
    const id = Number(request.params.id);

    try {
      await this.categotyRepository.deleteCategory(id);
      response.send('ok');
    } catch (e) {
      response.status(500).send(e.message);
    }
  }
}

export default CategoryController;