import User from '../models/User.js';

export class UserRepository {
    constructor(pool){
        this._pool = pool;
    }

    async getAllUsers(){
        let users = [];

        const rawUsers = await this._pool.query('SELECT * FROM public."user";');
    
        for (let rawUser of rawUsers.rows) {
            let user = new User({
                id: rawUser.id,
                name: rawUser.name
            });
            users.push(user);
        }

        return users;
    }

    async createUser(name, email, password){
        const rawUser = await this._pool.query(
            'INSERT INTO public."user" (name, email, password) VALUES ($1, $2, $3) RETURNING *;'
            , [name, email, password]);

        let user = new User({
            id : rawUser.rows[0].id,
            name : rawUser.rows[0].name,
            email : rawUser.rows[0].email,
            password : rawUser.rows[0].password
        });

        return user;
    }

    async updateUser({id, name, email, password}) {
        const rawUser = await this._pool.query('UPDATE public."user" set name=$2, email=$3, password=$4 WHERE id=$1 RETURNING *;', [id, name, email, password]);

        if (rawUser.rows.lenth === 0) {
            throw Error('Error on update user');
        }

        let user = new User({
            id : rawUser.rows[0].id,
            name : rawUser.rows[0].name,
            email : rawUser.rows[0].email,
            password : rawUser.rows[0].password
        });

        return user;
    }

    async deleteUser(id){
        const result = await this._pool.query('DELETE FROM public."user" WHERE id=$1 RETURNING *;', [id]);

        if (result.rows.lenth === 0){
            throw Error('Error on delete user');
        }

        console.log(result);
    }
}