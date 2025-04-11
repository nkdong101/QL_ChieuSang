import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
export default class dm_producer {
  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Code;
  /** @type {number} - description */
  Use;
  /** @type {number} - description */
  Sequency;
  /** @type {number} - description */
  Id;
  /** @type {string} - description */
  DateUpdate;
  /** @type {string} - description */
  DateCreate;
  /** @type {string} - description */
  UserCreate;
  /** @type {string} - description */
  UserUpdate;


  _formElements = {
    Name: new FormElement({
      label: "Tên",
      model: "Name",
      type: FormElementType.text,
    }),
    Code: new FormElement({
      label: "Mã",
      model: "Code",
      type: FormElementType.text,
    }),
    Use: new FormElement({
      label: "Trạng thái",
      model: "Use",
      type: FormElementType.select,
      options: Para.Para_Active,
    }),
    Sequency: new FormElement({
      label:  "Trình tự",
      model: "Sequency",
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

  /**
   *
   * @param {dm_producer} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {dm_producer} obj
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
        this._formElements.Sequency,
        this._formElements.Code,
        this._formElements.Name,
        // this._formElements.Use,

      ]
    });
  }
}
