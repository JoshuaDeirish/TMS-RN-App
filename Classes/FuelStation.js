class FuelStation {
      constructor(stationId, name, address, phoneNumber, website) {
        this._stationId = stationId;
        this._name = name;
        this._address = address;
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
    
      get address() {
        return this._address;
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
    
      set address(address) {
        this._address = address;
      }
    
      set phoneNumber(phoneNumber) {
        this._phoneNumber = phoneNumber;
      }
    
      set website(website) {
        this._website = website;
      }
    }
    export default FuelStation;