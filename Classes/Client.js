class Client {
  constructor(clientID, name, address, contactInfo) {
    this._clientID = clientID;
    this._name = name;
    this._address = address; 
    this._contactInfo = contactInfo;
  }

  get clientID() {
    return this._clientID;
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }

  get contactInfo() {
    return this._contactInfo;
  }

  set clientID(value) {
    this._clientID = value;
  }

  set name(value) {
    this._name = value;
  }

  set address(value) {
    this._address = value;
  }

  set contactInfo(value) {
    this._contactInfo = value;
  }
}
export default Client;