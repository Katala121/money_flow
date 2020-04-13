import User from "../models/User.js";

export class UserRepository {

    constructor(pool) {
        this._pool = pool;
    }

    async save({email, name, password}) {
        const rawCategory = await this._pool.query(
            'INSERT INTO public."user" (email, name, password) VALUES ($1, $2, $3) RETURNING *;'
            , [email, name, password]);

        let user = new User({
            id  : rawCategory.rows[0].id,
            name: rawCategory.rows[0].name,
            email: rawCategory.rows[0].email
        });

        return user;
    }

    async findByEmail({email}) {
        const rawCategory = await this._pool.query(
            'SELECT * FROM public."user" where email=$1;'
            , [email]);

        let user = new User({
            id  : rawCategory.rows[0].id,
            name: rawCategory.rows[0].name,
            email: rawCategory.rows[0].email,
        });
        user._password = rawCategory.rows[0].password;

        return user;
    }

    async findByEmailAndId({id, email}) {
        const rawCategory = await this._pool.query(
            'SELECT * FROM public."user" where id=$1 AND email=$2;'
            , [id, email]);

        let user = new User({
            id  : rawCategory.rows[0].id,
            name: rawCategory.rows[0].name,
            email: rawCategory.rows[0].email,
        });
        user._password = rawCategory.rows[0].password;

        return user;
    }
}