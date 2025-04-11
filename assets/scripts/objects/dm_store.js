import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
export default class dm_store {
  /** @type {string} - description */
  Serial;
  /** @type {string} - description */
  Name;
  /** @type {number} - description */
  isStore;
  /** @type {string} - description */
  Description;
  /** @type {string} - description */
  Office_id;


  /** @type {number} - description */
  Id;



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
    isStore: new FormElement({
      label: "Loại",
      model: "isStore",
      type: FormElementType.select,
      options: Para.StoreType,
    }),

    Office_id: new FormElement({
      label: "Văn phòng",
      model: "Office_id",
      type: FormElementType.select,
      options: Para.Para_Office,
    }),
    Description: new FormElement({
      label: "Mô tả",
      model: "Description",
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
   * @param {dm_store} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {dm_store} obj
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
        this._formElements.Serial,
        this._formElements.Name,
        this._formElements.isStore,
        this._formElements.Office_id,
        this._formElements.Description,
        // this._formElements.Use,

      ]
    });
  }
}
