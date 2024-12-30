class MaintenanceRecord {
      constructor(recordId, vehicle, startDate, endDate, description, cost) {
        this._recordId = recordId;
        this._vehicle = vehicle;
        this._startDate = startDate;
        this._endDate = endDate;
        this._description = description;
        this._cost = cost;
      }
    
      // Getters
      get recordId() {
        return this._recordId;
      }
    
      get vehicle() {
        return this._vehicle;
      }
    
      get startDate() {
        return this._startDate;
      }
    
      get endDate() {
        return this._endDate;
      }
    
      get description() {
        return this._description;
      }
    
      get cost() {
        return this._cost;
      }
    
      // Setters
      set recordId(recordId) {
        this._recordId = recordId;
      }
    
      set vehicle(vehicle) {
        this._vehicle = vehicle;
      }
    
      set startDate(startDate) {
        if (startDate instanceof Date) {
          this._startDate = startDate;
        } else {
          throw new Error("Start date must be a valid Date object.");
        }
      }
    
      set endDate(endDate) {
        if (endDate instanceof Date) {
          this._endDate = endDate;
        } else {
          throw new Error("End date must be a valid Date object.");
        }
      }
    
      set description(description) {
        this._description = description;
      }
    
      set cost(cost) {
        if (typeof cost === 'number') {
          this._cost = cost;
        } else {
          throw new Error("Cost must be a number.");
        }
      }
    }