class Agent {

    constructor({id, name, user_id}) {
        this._id = id;
        this._name = name;
        this._user_id = user_id;
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

    set user_id(newValue) {
        this._user_id = newValue;
    }

    get user_id() {
        return this._user_id;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            user_id: this.user_id
        }
    }
}

export default Agent;
