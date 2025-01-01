import User from "./User"

class Operator extends User {
    constructor(userID, first_name, last_name, role, email, phoneNumber, operatorID, license_Number, routeStatus) {
        super(userID, first_name, last_name, role, email, phoneNumber);
        this._operatorID = operatorID;
        this._license_Number = license_Number;
        this._routeStatus = routeStatus;
    }

    get operatorID() {
        return this._operatorID;
    }
    set operatorID(value) {
        this._operatorID = value;
    }

    get license_Number() {
        return this._license_Number;
    }
    set license_Number(value) {
  
        this._license_Number = value;
    }

    get routeStatus() {
        return this._routeStatus;
    }
    set routeStatus(value) {
        const validStatuses = ['on route', 'arrived', 'delivered', 'completed']; 
        if (validStatuses.includes(value)) {
            this._routeStatus = value;
        } else {
            console.error("Invalid status");
        }
    }

    changeRouteStatus(newStatus) {
        this.routeStatus = newStatus;  
    }
}


export default Operator;