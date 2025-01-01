class Vehicle {
      constructor(vehicleId, licencePlateNum, model, year, capacity, mileage, maintenanceStatus, assignedOperator) {
        this._vehicleId = vehicleId;
        this._licencePlateNum = licencePlateNum;
        this._model = model;
        this._year = year;
        this._capacity = capacity;
        this._milage = mileage;
        this._maintenanceStatus = maintenanceStatus;
        this._assignedOperator = assignedOperator;
      }
    
      // Getters
      get vehicleId() {
        return this._vehicleId;
      }
    
      get licencePlateNum() {
        return this._licencePlateNum;
      }
    
      get model() {
        return this._model;
      }
    
      get year() {
        return this._year;
      }
    
      get capacity() {
        return this._capacity;
      }
      get mileage() {
            return this._mileage;
          }
    
      get maintenanceStatus() {
        return this._maintenanceStatus;
      }
    
      get assignedOperator() {
        return this._assignedOperator;
      }
    
      // Setters
      set vehicleId(vehicleId) {
        this._vehicleId = vehicleId;
      }
    
      set licencePlateNum(licencePlateNum) {
        this._licencePlateNum = licencePlateNum;
      }
    
      set model(model) {
        this._model = model;
      }
    
      set year(year) {
        if (Number.isInteger(year)) {
          this._year = year;
        } else {
          throw new Error("Year must be an integer.");
        }
      }
    
      set capacity(capacity) {
        if (typeof capacity === "number") {
          this._capacity = capacity;
        } else {
          throw new Error("Capacity must be a number.");
        }
      }
      set mileage(mileage) {
            return this._mileage = mileage;
          }
    
      set maintenanceStatus(maintenanceStatus) {
        this._maintenanceStatus = maintenanceStatus;
      }
    
      set assignedOperator(assignedOperator) {
        this._assignedOperator = assignedOperator;
      }
    }