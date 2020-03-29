class TransactionTypeController {
    constructor() {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    get(request, response, next) {
        response.send('Get transactionType');
    }

    create(request, response, next) {
        response.send('Create transactionType');
    }

    update(request, response, next) {
        response.send('Update transactionType');
    }

    delete(request, response, next) {
        response.send('Delete transactionType');
    }
}

export default TransactionTypeController;