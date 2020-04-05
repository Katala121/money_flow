import Category from '../models/Category.js';

class CategoryController {

    constructor(categories) {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.listAll = this.listAll.bind(this);

        this._categories = categories;
    }

    get(request, response, next) {
        response.json([...this._categories]);
    }

    create(request, response, next) {

        const id = this._categories.size + 1;
        const name = request.body.name;

        const category = new Category(id, name);
        this._categories.set(id, category);

        response.send(category);
    }

    update(request, response, next) {

        const id = request.params.id;
        const category = this._categories.get(Number(id));

        if (category !== undefined) {
            const name = request.body.name;
            category.name = name;

            this._categories.set(id, category);
            response.json(category);
        } else {
            throw new Error('Category not found');
        }
    }

    delete(request, response, next) {
        const id = request.params.id;
        const category = this._categories.get(Number(id));

        if (category !== undefined) {
            this._categories.delete(Number(id));
            response.send('ok');
        } else {
            throw new Error('Category not found');
        }
    }

    listAll(request, response, next) {

        const categories = [];

        for (let cat of this._categories) {
            categories.push(cat[1]);
        }

        response.render('index', {'categories': categories})
    }
}

export default CategoryController;
