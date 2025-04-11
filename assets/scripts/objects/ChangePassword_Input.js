import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
export default class ChangePassword_Input {
  /** @type {string} - description */
  Id;
  /** @type {string} - description */
  Password_Old;
  /** @type {string} - description */
  Password_new;
  /** @type {number} - description */
  Password_confirm;


  _formElements = {
    Password_Old: new FormElement({
      label: "Mật khẩu hiện tại",
      model: "Password_Old",
      labelWidth: 150,
      required:true,
      type: FormElementType.text,
    }),
    Password_new: new FormElement({
      label: "Mật khẩu mới",
      model: "Password_new",
      labelWidth: 150,
      required:true,
      type: FormElementType.text,
    }),
    Password_confirm: new FormElement({
      label: "Xác nhận mật khẩu",
      model: "Password_confirm",
      labelWidth: 150,
      type: FormElementType.text,
      required:true,
      validate(data){
        if(data.Password_new != data.Password_confirm){
          return 'Mật khẩu xác nhận không đúng!';
        }
      }
    }),

  };

  /**
   *
   * @param {ChangePassword_Input} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {ChangePassword_Input} obj
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
        this._formElements.Password_Old,
        this._formElements.Password_new,
        this._formElements.Password_confirm,
        // this._formElements.Use,

      ]
    });
  }
}
