class Order {
  constructor(orderID, orderDate, shipment, client, totalAmount) {
    this._orderID = orderID;
    this._orderDate = orderDate; 
    this._shipment = shipment; // Expecting a Shipment object
    this._client = client; 
    this._totalAmount = totalAmount;
  }

  // Getters
  get orderID() {
    return this._orderID;
  }

  get orderDate() {
    return this._orderDate;
  }

  get shipment() {
    return this._shipment;
  }

  get client() {
    return this._client;
  }

  get totalAmount() {
    return this._totalAmount;
  }

  // Setters
  set orderID(value) {
    this._orderID = value;
  }

  set orderDate(value) {
    if (value instanceof Date) {
      this._orderDate = value;
    } else {
      throw new Error("orderDate must be a valid Date object");
    }
  }

  set shipment(value) {
    this._shipment = value;
  }

  set client(value) {
    this._client = value;
  }

  set totalAmount(value) {
    if (typeof value === "number" && value >= 0) {
      this._totalAmount = value;
    } else {
      throw new Error("totalAmount must be a non-negative number");
    }
  }
}
export default Order;