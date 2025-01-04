class FuelStation {
      constructor(stationId, name, location, phoneNumber, website) {
        this._stationId = stationId;
        this._name = name;
        this.location = location;
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
    
      set phoneNumber(phoneNumber) {
        this._phoneNumber = phoneNumber;
      }
    
      set website(website) {
        this._website = website;
      }
    }
    export default FuelStation;