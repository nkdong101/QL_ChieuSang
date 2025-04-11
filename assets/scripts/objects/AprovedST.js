import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
export default class dm_fixed_asset_type {
 
  Reason = '';
  /** @type {boolean} - description */
  Approved = true;
  /** @type {number} - description */
  Id;



  _formElements = {
   
    Reason: new FormElement({
      // label: "Reason",
      model: "Reason",
      // type: FormElementType.text,
      attr:{
        type: 'textarea',
        placeholder:"Lý do"
      },
      required:true,
    }),

  };

  /**
   *
   * @param {dm_fixed_asset_type} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {dm_fixed_asset_type} obj
   */
  update(obj) {
    Object.assign(this, obj);
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined,
    }
  }
  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Reason,
       
        // this._formElements.Use,

      ]
    });
  }
}
