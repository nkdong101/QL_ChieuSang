import {
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";

export default class MaterialGroup {
  /** @type {string} - description */
  Code;
  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Description;
  Parent_id;
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
      label: "Mã loại",
      model: "Code",
      type: FormElementType.text,
    }),
    Name: new FormElement({
      label: "Tên loại",
      model: "Name",
      type: FormElementType.text,
    }),
    Parent_id: new FormElement({
      label: "Nhóm sản phẩm cấp trên",
      model: "Parent_id",
      type: FormElementType.text,
    }),
  };

  /**
   *
   * @param {MaterialGroup} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {MaterialGroup} obj
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
