class Transaction {

    constructor({id, source_agent_id, destination_agent_id, count, date, category_id, transaction_type}) {
        this._id = id;
        this._source_agent_id = source_agent_id;
        this._destination_agent_id = destination_agent_id;
        this._count = count;
        this._date = date;
        this._category_id = category_id;
        this._transaction_type = transaction_type;

    }

    get id() {
        return this._id;
    }

    set source_agent_id(newValue) {
        this._source_agent_id = newValue;
    }

    get source_agent_id() {
        return this._source_agent_id;
    }

    set destination_agent_id(newValue) {
        this._destination_agent_id = newValue;
    }

    get destination_agent_id() {
        return this._destination_agent_id;
    }

    set count(newValue) {
        this._count = newValue;
    }

    get count() {
        return this._count;
    }

    set date(newValue) {
        this._date = newValue;
    }

    get date() {
        return this._date;
    }

    set category_id(newValue) {
        this._category_id = newValue;
    }

    get category_id() {
        return this._category_id;
    }

    set transaction_type(newValue) {
        this._transaction_type = newValue;
    }

    get transaction_type() {
        return this._transaction_type;
    }

    toJSON() {
        return {
            id: this.id,
            source_agent_id: this.source_agent_id,
            destination_agent_id: this.destination_agent_id,
            count: this.count,
            date: this.date,
            category_id: this.category_id,
            transaction_type: this.transaction_type
        }
    }
}

export default Transaction;
