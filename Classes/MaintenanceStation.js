class MaintenanceStation {
      constructor(stationId, name, location, type, phoneNumber, website) {
        this._stationId = stationId;
        this._name = name;
        this.location = location;
        this._type = type; 
        this._phoneNumber = phoneNumber;
        this._website = website;
      }
    
      // Getters
      get stationId() {
        return this._stationId;
      }
    
      get name() {
        return this._name;
      }
    
      get location() {
        return this.location;
      }
    
      get type() {
        return this._type;
      }
    
      get phoneNumber() {
        return this._phoneNumber;
      }
    
      get website() {
        return this._website;
      }
    
      // Setters
      set stationId(stationId) {
        this._stationId = stationId;
      }
    
      set name(name) {
        this._name = name;
      }
    
      set location(location) {
        this.location = location;
      }

      //TODO
      //To be changed in the future
      set type(type) {
        if (['Mechanic', 'Dealership'].includes(type)) {
          this._type = type;
        } else {
          throw new Error("Type must be 'Mechanic' or 'Dealership'.");
        }
      }
    
      set phoneNumber(phoneNumber) {
        this._phoneNumber = phoneNumber;
      }
    
      set website(website) {
        this._website = website;
      }
    }