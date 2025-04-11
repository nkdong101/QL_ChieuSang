import { GetGlobalId } from "../../Functions";
import StoreManager from "../../StoreManager";

export default class Purchase_Detail {
  /** @type {number} - description */
  Purchase_id;
  /** @type {number} - description */
  Sequence;
  /** @type {number} - description */
  Quantity;
  /** @type {string} - description */
  Description;
  /** @type {number} - description */
  Unit_Cost;
  /** @type {number} - description */
  Money_Total;
  /** @type {number} - description */
  Money_CHF;
  /** @type {string} - description */
  Project_code;
  /** @type {string} - description */
  Award_code;
  /** @type {string} - description */
  Task_code;
  /** @type {number} - description */
  Practice_id;
  /** @type {number} - description */
  Id;



  /**
  * @param {Purchase_Detail} obj - description
  */
  constructor(obj) {
    this.tmp_id = GetGlobalId();
    this.update(obj);
  }

  /**
    * @param {Purchase_Detail} obj - description
   */
  update(obj) {
    Object.assign(this, obj);
  }

  changeValue() {
    console.log('changeValue')
    let quantity = this.Quantity || 0;
    let unit_cost = this.Unit_Cost || 0;
    let rate = (StoreManager.Getcurrency_code() || {}).Percent || 0;


    this.Money_Total = +(quantity * unit_cost).toFixed(2);
    this.Money_CHF = +(this.Money_Total * rate).toFixed(2);
  }

}
