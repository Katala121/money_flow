class User {

    constructor({id, name, email}) {
        this._id = id;
        this._name = name;
        this._email = email;
    }

    get id() {
        return this._id;
    }

    set name(newValue) {
        this._name = newValue;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get token() {
        return this._token;
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            token: this.token
        }
    }
}

export default User;