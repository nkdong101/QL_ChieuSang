import {
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";

export default class Hangsx {
  /** @type {string} - description */
  Code;

  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Description;
  Country_id;
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
      type: FormElementType.text,
      attr: {
        type: "textarea",
        rows: 2,
      },
    }),
    Code: new FormElement({
      label: "Mã hãng",
      model: "Code",
      type: FormElementType.text,
    }),
    Name: new FormElement({
      label: "Tên hãng",
      model: "Name",
      type: FormElementType.text,
    }),
    Country_id: new FormElement({
      label: "Quốc gia",
      model: "Country_id",
      type: FormElementType.select,
      options: Para.dm_County,
    }),
  };

  /**
   *
   * @param {Hangsx} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Hangsx} obj
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
      labelWidth: 120,
      elements: [
        // new FormElement({
        //   child: [this._formElements.Code, this._formElements.Name],
        // }),

        this._formElements.Code,
        this._formElements.Name,
        this._formElements.Country_id,

        this._formElements.Description,
        // this._formElements.Use,
      ],
    });
  }
}
