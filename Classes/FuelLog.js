class FuelLog {
      constructor(logId, vehicle, fuelDate, cost, liters) {
        this._logId = logId;
        this._vehicle = vehicle;
        this._fuelDate = fuelDate;
        this._cost = cost;
        this._liters = liters;
      }
    
      // Getters
      get logId() {
        return this._logId;
      }
    
      get vehicle() {
        return this._vehicle;
      }
    
      get fuelDate() {
        return this._fuelDate;
      }
    
      get cost() {
        return this._cost;
      }
    
      get liters() {
        return this._liters;
      }
    
      // Setters
      set logId(logId) {
        this._logId = logId;
      }
    
      set vehicle(vehicle) {
        this._vehicle = vehicle;
      }
    
      set fuelDate(fuelDate) {
        if (fuelDate instanceof Date) {
          this._fuelDate = fuelDate;
        } else {
          throw new Error("Fuel date must be a valid Date object.");
        }
      }
    
      set cost(cost) {
        if (typeof cost === 'number') {
          this._cost = cost;
        } else {
          throw new Error("Cost must be a number.");
        }
      }
    
      set liters(liters) {
        if (typeof liters === 'number') {
          this._liters = liters;
        } else {
          throw new Error("Liters must be a number.");
        }
      }
    }

    export default FuelLog;