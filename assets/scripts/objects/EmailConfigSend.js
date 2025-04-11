
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { MessageType, ShowConfirm } from "~/assets/scripts/Functions";
import { Para } from "../Para";


export default class EmailConfigSend {
  /** @type {number} - description */
  type;
  /** @type {string} - description */
  time;
  /** @type {string} - description */
  user;


  /** @type {string} - description */
  Id;




  /**
   *
   * @param {EmailConfigSend} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {EmailConfigSend} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {

      time: new FormElement({
        label: "Time",
        model: "time",
        type: FormElementType.datePicker,
      }),

      user: new FormElement({
        label: "Email",
        model: "user",
        type: FormElementType.text,

      }),


    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.user,
        this._formElements.time,
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
