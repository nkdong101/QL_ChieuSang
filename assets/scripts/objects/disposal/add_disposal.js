
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import Disposal from "./disposal";
import DisposalVendors from "./disposal_vendors";


export default class AddDisposal {
  /** @type {Disposal} - description */
  Info;
  /** @type {Array<DisposalVendors>} - description */
  Vendors;
  /** @type {Array<number>} - description */
  FA_Id_Lists = [];





  /**
   *
   * @param {AddDisposal} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {AddDisposal} obj
   */
  update(obj) {
    obj = obj || {}
    this.Info = new Disposal(obj.Info)

    this.Vendors = (obj.Vendors || []).map(p => new DisposalVendors(p));

    this.FA_Id_Lists = obj.FA_Id_Lists || [];

    this._formElements = {
      Info: new FormElement({
        label: "Info",
        model: "Info",
        type: FormElementType.text,
      }),
      Vendors: new FormElement({
        label: "Vendors",
        model: "Vendors",
        type: FormElementType.text,
      }),
      FA_Id_Lists: new FormElement({
        label: "FA_Id_Lists",
        model: "FA_Id_Lists",
        type: FormElementType.text,
      }),


    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Info,
        this._formElements.Vendors,
        this._formElements.FA_Id_Lists,
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
