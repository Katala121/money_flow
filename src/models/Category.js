class Category {

    constructor(id, name) {
        this._id = id;
        this._name = name;
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

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }
}

export default Category;
