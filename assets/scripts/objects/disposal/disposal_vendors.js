
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";


export default class DisposalVendors {
  /** @type {string} - description */
  Disposal_id;
  /** @type {string} - description */
  vendor_id;
  /** @type {string} - description */
  State;
  /** @type {string} - description */
  Serial;
  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  ContactName;
  /** @type {string} - description */
  ContactPhone;
  /** @type {string} - description */
  ContactEmail;
  /** @type {string} - description */
  Quote_Url;
  /** @type {string} - description */
  Id;




  /**
   *
   * @param {DisposalVendors} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {DisposalVendors} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      Disposal_id: new FormElement({
        label: "Disposal_id",
        model: "Disposal_id",
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
      Serial: new FormElement({
        label: "Số Serial",
        model: "Serial",
        type: FormElementType.text,
      }),
      Name: new FormElement({
        label: "Tên",
        model: "Name",
        type: FormElementType.text,
      }),
      ContactName: new FormElement({
        label: "ContactName",
        model: "ContactName",
        type: FormElementType.text,
      }),
      ContactPhone: new FormElement({
        label: "ContactPhone",
        model: "ContactPhone",
        type: FormElementType.text,
      }),
      ContactEmail: new FormElement({
        label: "ContactEmail",
        model: "ContactEmail",
        type: FormElementType.text,
      }),
      Quote_Url: new FormElement({
        label: "Quote_Url",
        model: "Quote_Url",
        type: FormElementType.text,
      }),
      Id: new FormElement({
        label: "Id",
        model: "Id",
        type: FormElementType.text,
      }),

    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Disposal_id,
        this._formElements.vendor_id,
        this._formElements.State,
        this._formElements.Serial,
        this._formElements.Name,
        this._formElements.ContactName,
        this._formElements.ContactPhone,
        this._formElements.ContactEmail,
        this._formElements.Quote_Url,
        this._formElements.Id

      ]
    });
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined
    }
  }

}
