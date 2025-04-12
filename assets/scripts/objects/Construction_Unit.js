import {
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";

export default class Construction_Unit {
  /** @type {string} - description */
  Description;

  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Person;
  /** @type {string} - description */
  Code;
  /** @type {string} - description */
  Email;
  /** @type {string} - description */
  Address;
  /** @type {string} - description */
  Phone;

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
    Description: new FormElement({
      label: "Mô tả",
      model: "Description",
      labelWidth: 120,
      type: FormElementType.text,
      attr: {
        type: "textarea",
        rows: 2,
      },
    }),
    Code: new FormElement({
      label: "Mã đơn vị",
      model: "Code",
      type: FormElementType.text,
    }),
    Name: new FormElement({
      label: "Tên đơn vị",
      model: "Name",
      type: FormElementType.text,
    }),
    Address: new FormElement({
      label: "Địa chỉ",
      model: "Address",
      type: FormElementType.text,
    }),
    Email: new FormElement({
      label: "Email",
      model: "Email",
      type: FormElementType.text,
    }),
    Phone: new FormElement({
      label: "Số liên hệ",
      model: "Phone",
      type: FormElementType.text,
    }),
    Person: new FormElement({
      label: "Người liên hệ",
      model: "Person",
      labelWidth: 120,
      type: FormElementType.text,
    }),
  };

  /**
   *
   * @param {Construction_Unit} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Construction_Unit} obj
   */
  update(obj) {
    Object.assign(this, obj);
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined,
    };
  }
  form() {
    return new FormInfo({
      formData: this,
      labelWidth: 100,
      elements: [
        new FormElement({
          child: [this._formElements.Code, this._formElements.Name],
        }),
        new FormElement({
          child: [this._formElements.Email, this._formElements.Phone],
        }),
        this._formElements.Person,
        this._formElements.Description,
        // this._formElements.Use,
      ],
    });
  }
}
