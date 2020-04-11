class Balance {

    constructor({id, balance, agent_id}) {
        this._id = id;
        this._balance = balance;
        this._agent_id = agent_id;
    }

    get id() {
        return this._id;
    }

    set balance(newValue) {
        this._balance = newValue;
    }

    get balance() {
        return this._balance;
    }

    set agent_id(newValue) {
        this._agent_id = newValue;
    }

    get agent_id() {
        return this._agent_id;
    }

    toJSON() {
        return {
            id: this.id,
            balance: this.balance,
            agent_id: this.agent_id
        }
    }
}

export default Balance;
