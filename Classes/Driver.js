import User from "./User"

class Driver extends User {
    constructor(userID, first_name, last_name, role, email, phoneNumber, driverID, license_Number, routeStatus) {
        super(userID, first_name, last_name, role, email, phoneNumber);
        this._driverID = driverID;
        this._license_Number = license_Number;
        this._routeStatus = routeStatus;
    }

    get driverID() {
        return this._driverID;
    }
    set driverID(value) {
        this._driverID = value;
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


export default Driver;