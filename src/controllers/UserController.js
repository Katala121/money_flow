class UserController {
    constructor() {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.uptade = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    get(request, response, next) {
        response.send('Get user')
    }

    create(request, response, next) {
        response.send('Create user')
    }

    update(request, response, next){
        response.send('Update user')
    }

    delete(request, response, next){
        response.send('Delete user')
    }
}

export default UserController;