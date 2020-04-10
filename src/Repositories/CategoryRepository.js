import Category from '../models/Category.js';

export class CategoryRepository {
    constructor(pool){
        this._pool = pool;
    }

    async getAllCategories(){
        let categories = [];

        const rawCategories = await this._pool.query('SELECT * FROM public."category";');
    
        for (let rawCategory of rawCategories.rows) {
            let category = new Category({
                id: rawCategory.id,
                name: rawCategory.name
            });
            categories.push(category);
        }

        return categories;
    }

    async createCategory(name){
        const rawCategory = await this._pool.query(
            'INSERT INTO public."category" (name) VALUES ($1) RETURNING *;'
            , [name]);

        let category = new Category({
            id : rawCategory.rows[0].id,
            name : rawCategory.rows[0].name
        });

        return category;
    }

    async updateCategory({id, name}) {
        const rawCategory = await this._pool.query('UPDATE public."category" set name=$2 WHERE id=$1 RETURNING *;', [id, name]);

        if (rawCategory.rows.lenth === 0) {
            throw Error('Error on update category');
        }

        let category = new Category({
            id : rawCategory.rows[0].id,
            name : rawCategory.rows[0].name
        });

        return category;
    }

    async deleteCategory(id){
        const result =await this._pool.query('DELETE FROM public."category" WHERE id=$1 RETURNING *;', [id]);

        if (result.rows.lenth === 0){
            throw Error('Error on delete category');
        }

        console.log(result);
    }
}