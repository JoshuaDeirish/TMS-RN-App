class Location {
      constructor(locationID, addressLine1, addressLine2, city, province, postalCode, country, latitude, longitude) {
          this._locationID = locationID;
          this._addressLine1 = addressLine1;
          this._addressLine2 = addressLine2;
          this._city = city;
          this._province = province;
          this._postalCode = postalCode;
          this._country = country;
          this._latitude = latitude;
          this._longitude = longitude;
      }
  
      // Getters and Setters
      get locationID() {
          return this._locationID;
      }
  
      set locationID(value) {
          this._locationID = value;
      }
  
      get addressLine1() {
          return this._addressLine1;
      }
  
      set addressLine1(value) {
          this._addressLine1 = value;
      }
  
      get addressLine2() {
          return this._addressLine2;
      }
  
      set addressLine2(value) {
          this._addressLine2 = value;
      }
  
      get city() {
          return this._city;
      }
  
      set city(value) {
          this._city = value;
      }
  
      get province() {
          return this._province;
      }
  
      set province(value) {
          this._province = value;
      }
  
      get postalCode() {
          return this._postalCode;
      }
  
      set postalCode(value) {
          this._postalCode = value;
      }
  
      get country() {
          return this._country;
      }
  
      set country(value) {
          this._country = value;
      }
  
      get latitude() {
          return this._latitude;
      }
  
      set latitude(value) {
          if (typeof value !== 'number' || value < -90 || value > 90) {
              throw new Error('Latitude must be a number between -90 and 90.');
          }
          this._latitude = value;
      }
  
      get longitude() {
          return this._longitude;
      }
  
      set longitude(value) {
          if (typeof value !== 'number' || value < -180 || value > 180) {
              throw new Error('Longitude must be a number between -180 and 180.');
          }
          this._longitude = value;
      }
  }

  export default Location;