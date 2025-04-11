import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
export default class Currency {
  /** @type {string} - description */
  Currency_Code;
  /** @type {number} - description */
  Percent;
  /** @type {number} - description */
  Sequency;
  /** @type {string} - description */
  DateActive;
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
    Currency_Code: new FormElement({
      label: "Currency Code",
      model: "Currency_Code",
      type: FormElementType.text,
    }),
    Percent: new FormElement({
      label: "Percent",
      model: "Percent",
      type: FormElementType.number,
    }),
    Sequency: new FormElement({
      label:  "Trình tự",
      model: "Sequency",
      type: FormElementType.number,
    }),
    DateActive: new FormElement({
      label: "DateActive",
      model: "DateActive",
      type: FormElementType.datePicker,
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
   * @param {Currency} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Currency} obj
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
        this._formElements.Currency_Code,
        this._formElements.Percent,
        this._formElements.Sequency,
        this._formElements.DateActive,

      ]
    });
  }
}
