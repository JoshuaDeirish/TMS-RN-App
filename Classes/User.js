class User {
    constructor(userID, first_name, last_name, role, email, phoneNumber) {
        this._userID = userID;          
        this._first_name = first_name;
        this._last_name = last_name;
        this._role = role;
        this._email = email;
        this._phoneNumber = phoneNumber;
    }

    get userID() {
        return this._userID;
    }
    set userID(value) {
        this._userID = value;
    }

    get first_name() {
        return this._first_name;
    }
    set first_name(value) {
        this._first_name = value;
    }

    get last_name() {
        return this._last_name;
    }
    set last_name(value) {
        this._last_name = value;
    }

    get role() {
        return this._role;
    }
    set role(value) {
        this._role = value;
    }

    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(value) {
        this._phoneNumber = value;
    }
}

export default User;
