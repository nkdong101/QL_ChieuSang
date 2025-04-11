
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { MessageType, ShowConfirm } from "~/assets/scripts/Functions";
import API from "~/assets/scripts/API";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
export const API_Procurement_vendors = {
  Get: () => GetDataAPI({
    url: API.Procurement_vendors
  }),
  /**
   * @param {Procurement_vendors} obj - description
  */
  Post: (obj) => GetDataAPI({
    method: 'post',
    url: API.Procurement_vendors,
    params: obj.toJSON(),
  }),
  /**
   * @param {Procurement_vendors} obj - description
  */
  Put: (id, obj) => GetDataAPI({
    method: 'put',
    url: API.Procurement_vendors + '/' + id,
    params: obj.toJSON()
  }),
  Delete: (id) => GetDataAPI({
    method: 'delete',
    url: API.Procurement_vendors + '/' + id,
  }),
}
export default class Procurement_vendors {
  /** @type {number} - description */
  Procurement_id;
  /** @type {number} - description */
  vendor_id;
  /** @type {number} - description */
  State;
  /** @type {string} - description */
  Description;
  /** @type {string} - description */
  Id;
  /** @type {string} - description */
  DateUpdate;
  /** @type {string} - description */
  DateCreate;
  /** @type {string} - description */
  UserCreate;
  /** @type {string} - description */
  UserUpdate;

  Serial;
  Name;
  ContactName;
  ContactPhone;
  ContactEmail;
  TechnicalEvaluation;
  OverallScore;
  OfferPrice;




  /**
   *
   * @param {Procurement_vendors} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Procurement_vendors} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      Procurement_id: new FormElement({
        label: "Procurement_id",
        model: "Procurement_id",
        type: FormElementType.text,
      }),
      vendor_id: new FormElement({
        label: "vendor_id",
        model: "vendor_id",
        type: FormElementType.text,
      }),
      State: new FormElement({
        label: "Tình trạng",
        model: "State",
        type: FormElementType.text,
      }),
      Description: new FormElement({
        label: "Mô tả",
        model: "Description",
        type: FormElementType.text,
      }),
      Id: new FormElement({
        label: "Id",
        model: "Id",
        type: FormElementType.text,
      }),
      DateUpdate: new FormElement({
        label: "DateUpdate",
        model: "DateUpdate",
        type: FormElementType.text,
      }),
      DateCreate: new FormElement({
        label: "DateCreate",
        model: "DateCreate",
        type: FormElementType.text,
      }),
      UserCreate: new FormElement({
        label: "UserCreate",
        model: "UserCreate",
        type: FormElementType.text,
      }),
      UserUpdate: new FormElement({
        label: "UserUpdate",
        model: "UserUpdate",
        type: FormElementType.text,
      }),

    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Procurement_id,
        this._formElements.vendor_id,
        this._formElements.State,
        this._formElements.Description,
        this._formElements.Id,
        this._formElements.DateUpdate,
        this._formElements.DateCreate,
        this._formElements.UserCreate,
        this._formElements.UserUpdate

      ]
    });
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined
    }
  }
  Save() {
    if (this.Id) {
      return API_Procurement_vendors.Put(this.Id, this)
    } else {
      return API_Procurement_vendors.Post(this)
    }
  }
  Delete() {
    return ShowConfirm({
      title: 'Alert',
      message: `Are you sure?`,
      type: MessageType.warning,
    }).then(() => {
      return API_Procurement_vendors.Delete(this.Id);
    })
  }
}
