import {
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";

export default class Management_team {
  /** @type {string} - description */
  Address;
  Manager_id;
  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Description;
  Routes = [];
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
    Address: new FormElement({
      label: "Địa chỉ",
      model: "Address",
      type: FormElementType.address,
    }),
    Name: new FormElement({
      label: "Tên đội",
      model: "Name",
      type: FormElementType.text,
    }),
    Manager_id: new FormElement({
      label: "Người quản lý",
      model: "Manager_id",
      type: FormElementType.select,
      options: Para.Para_Account,
    }),
    Routes: new FormElement({
      label: "Tuyền đường",
      model: "Routes",
      type: FormElementType.text,
      // options: Para.Para_Account
    }),
  };

  /**
   *
   * @param {Management_team} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Management_team} obj
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
        //   child: [this._formElements.Address, this._formElements.Name],
        // }),

        this._formElements.Name,
        this._formElements.Manager_id,
        this._formElements.Address,
        this._formElements.Description,
        this._formElements.Routes,
        // this._formElements.Use,
      ],
    });
  }
}
