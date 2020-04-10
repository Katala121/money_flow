class User {

    constructor({id, name, email, password}) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
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

    set email(newValue) {
        this._email = newValue;
    }

    get email() {
        return this._email;
    }

    set password(newValue) {
        this._password = newValue;
    }

    get password() {
        return this._password;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password
        }
    }
}

export default User;
