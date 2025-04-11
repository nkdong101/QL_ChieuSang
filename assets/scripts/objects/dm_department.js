import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";

import { Para } from "../Para";
import API from "../API";
export default class dm_department {
  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Serial;
  /** @type {string} - description */
  Description;
  /** @type {number} - description */
  Office_id;

  /** @type {string} - description */
  Manager_id;
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
    Serial: new FormElement({
      label: "Số Serial",
      model: "Serial",
      type: FormElementType.text,
    }),
    Description: new FormElement({
      label: "Mô tả",
      model: "Description",
      type: FormElementType.text,
    }),
    Office_id: new FormElement({
      label: "Văn phòng",
      model: "Office_id",
      type: FormElementType.select,
      options:Para.Para_Office,
      // labelWidth:70,
    }),
    Manager_id: new FormElement({
      label: "Quản lý",
      model: "Manager_id",
      type: FormElementType.select,
      options:Para.Para_Account,
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
   * @param {dm_department} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {dm_department} obj
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
      labelWidth:100,
      elements: [
        this._formElements.Serial,
        this._formElements.Name,
        this._formElements.Description,
        this._formElements.Office_id,
        this._formElements.Manager_id,

      ]
    });
  }
}
