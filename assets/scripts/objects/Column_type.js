import {
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
import InputFileModel from "~/components/form-content/InputFile/InputFIleModel";

export default class Column_type {
  /** @type {string} - description */
  Code;

  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Description;
  /** @type {string} - description */

  Image;
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
    Image: new FormElement({
      label: "Ảnh",
      id: "Image",
      model: "Image",
      labelWidth: 120,
      type: FormElementType.file,
      options() {
        return new InputFileModel({
          baseUrl: "/images/ColumnType/",
          // limit: 1,
          // multiple: false,
        });
      },
    }),
  };

  /**
   *
   * @param {Column_type} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Column_type} obj
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
        this._formElements.Image,
        // this._formElements.Use,
      ],
    });
  }
}
