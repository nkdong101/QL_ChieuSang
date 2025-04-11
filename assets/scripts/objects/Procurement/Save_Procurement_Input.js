
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { MessageType, ShowConfirm } from "~/assets/scripts/Functions";
import API from "~/assets/scripts/API";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
import Procurement from "./Procurement";
import Procurement_vendors from "./Procurement_vendors";
import procurement_approval from "./procurement_approval";

export default class Save_Procurement_Input {
  /** @type {Procurement} - description */
  Info = new Procurement();
  /** @type {Array<Procurement_vendors>} - description */
  Details = [];
  /** @type {Array<procurement_approval>} - description */
  Approval = [];

  /**
   *
   * @param {Save_Procurement_Input} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Save_Procurement_Input} obj
   */
  update(obj) {
    obj = obj || {};
    this.Info.update(obj.Info);
    this.Details = (obj.Details || []).map(p => new Procurement_vendors(p));
    this.Approval = (obj.Approval || []).map(p => new procurement_approval(p));
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined
    }
  }

}
