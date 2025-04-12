import {
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";

export default class dm_Lighting_Group {
  /** @type {string} - description */
  Code;

  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Description;

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
      label: "Mã tuyến",
      model: "Code",
      type: FormElementType.text,
    }),
    Name: new FormElement({
      label: "Tên nhóm",
      model: "Name",
      type: FormElementType.text,
    }),
    Hangsx_id: new FormElement({
      label: "Hãng sản xuất",
      model: "Hangsx_id",
      type: FormElementType.select,
    }),
  };

  /**
   *
   * @param {dm_Lighting_Group} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {dm_Lighting_Group} obj
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
        // new FormElement({
        //   child: [this._formElements.Code, this._formElements.Name],
        // }),

        this._formElements.Code,
        this._formElements.Name,
        this._formElements.Description,
        // this._formElements.Use,
      ],
    });
  }
}
