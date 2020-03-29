class TransactionController {
    constructor() {
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    get(request, response, next) {
        response.send('Get transaction');
    }

    create(request, response, next) {
        response.send('Create transaction');
    }

    update(request, response, next) {
        response.send('Update transaction');
    }

    delete(request, response, next) {
        response.send('Delete transaction');
    }
}

export default TransactionController;