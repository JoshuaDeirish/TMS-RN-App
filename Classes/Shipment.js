class Shipment {
  constructor(shipmentID, status, origin, destination, assignedTruck, deliveryTime) {
    this._shipmentID = shipmentID; // String
    this._status = status; // String
    this._origin = origin; // Location (custom object or data type)
    this._destination = destination; // Location (custom object or data type)
    this._assignedTruck = assignedTruck; // Truck (custom object or data type)
    this._deliveryTime = deliveryTime; // Duration (custom object or data type)
  }

  // Getter and Setter for shipmentID
  get shipmentID() {
    return this._shipmentID;
  }
  set shipmentID(value) {
    this._shipmentID = value;
  }

  // Getter and Setter for status
  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
  }

  // Getter and Setter for origin
  get origin() {
    return this._origin;
  }
  set origin(value) {
    this._origin = value;
  }

  // Getter and Setter for destination
  get destination() {
    return this._destination;
  }
  set destination(value) {
    this._destination = value;
  }

  // Getter and Setter for assignedTruck
  get assignedTruck() {
    return this._assignedTruck;
  }
  set assignedTruck(value) {
    this._assignedTruck = value;
  }

  // Getter and Setter for deliveryTime
  get deliveryTime() {
    return this._deliveryTime;
  }
  set deliveryTime(value) {
    this._deliveryTime = value;
  }
}
export default Shipment;