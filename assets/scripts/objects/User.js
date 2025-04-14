import {
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import API from "../API";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
export default class User {
  /** @type {string} - description */
  Id;
  /** @type {string} - description */
  Password;
  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Email;
  /** @type {string} - description */
  Phone;
  /** @type {number} - description */
  Management_team_id;
  /** @type {string} - description */
  Address;
  /** @type {number} - description */
  Birthday;
  /** @type {number} - description */
  UserStatus;
  /** @type {string} - description */
  SignatureImage;
  /** @type {object} - description */
  Buttons;
  isEdit;

  _formElements = {
    Id: new FormElement({
      label: "Tài khoản",
      model: "Id",
      type: FormElementType.text,
      disabled(data) {
        if (data.isEdit) return true;
      },
    }),
    FullName: new FormElement({
      label: "Họ tên",
      model: "Name",
      type: FormElementType.text,
    }),
    Email: new FormElement({
      label: "Email",
      model: "Email",
      type: FormElementType.text,
    }),
    Phone: new FormElement({
      label: "Số điện thoại",
      model: "Phone",
      type: FormElementType.text,
    }),
    Management_team_id: new FormElement({
      label: "Đội quản lý",
      model: "Management_team_id",
      type: FormElementType.select,
      options: Para.dm_Management_team,
    }),
    Address: new FormElement({
      label: "Địa chỉ",
      model: "Address",
      type: FormElementType.select,
      options: Para.GroupPermission,
    }),
    Birthday: new FormElement({
      label: "Ngày sinh",
      model: "Birthday",
      type: FormElementType.datePicker,
    }),
    Status: new FormElement({
      label: "Trạng thái",
      model: "Status",
      type: FormElementType.select,
      options: Para.Para_UserStatus,
    }),
    Avatar: new FormElement({
      label: "Ảnh",
      model: "Avatar",
      type: FormElementType.text,
    }),
    Buttons: new FormElement({
      label: "Buttons",
      model: "Buttons",
      type: FormElementType.text,
    }),
    Name_Excel: new FormElement({
      label: "Tên Excel",
      model: "Name_Excel",
      type: FormElementType.text,
    }),
  };

  /**
   *
   * @param {User} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {User} obj
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
      elements: [
        this._formElements.Id,
        this._formElements.FullName,
        this._formElements.Email,
        new FormElement({
          child: [this._formElements.Phone, this._formElements.Birthday],
        }),
        this._formElements.Address,
        this._formElements.Management_team_id,
        // this._formElements.Country_id,
        this._formElements.Status,
        // this._formElements.Name_Excel,
      ],
    });
  }
}
