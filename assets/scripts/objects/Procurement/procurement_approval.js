
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { MessageType, ShowConfirm } from "~/assets/scripts/Functions";
import API from "~/assets/scripts/API";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
export const API_procurement_approval = {
  Get: () => GetDataAPI({
    url: API.procurement_approval
  }),
  /**
   * @param {procurement_approval} obj - description
  */
  Post: (obj) => GetDataAPI({
    method: 'post',
    url: API.procurement_approval,
    params: obj.toJSON(),
  }),
  /**
   * @param {procurement_approval} obj - description
  */
  Put: (id, obj) => GetDataAPI({
    method: 'put',
    url: API.procurement_approval + '/' + id,
    params: obj.toJSON()
  }),
  Delete: (id) => GetDataAPI({
    method: 'delete',
    url: API.procurement_approval + '/' + id,
  }),
}
export default class procurement_approval {
  /** @type {number} - description */
  Procurement_id;
  /** @type {string} - description */
  Comment;
  /** @type {number} - description */
  State;
  /** @type {string} - description */
  Emp_id;
  /** @type {string} - description */
  Emp_FullName;
  /** @type {string} - description */
  Emp_Title;
  /** @type {string} - description */
  Emp_Email;
  /** @type {string} - description */
  Emp_SignatureImage;
  /** @type {string} - description */
  Id;
  /** @type {string} - description */
  DateUpdate;
  /** @type {string} - description */
  DateCreate;
  /** @type {string} - description */
  UserCreate;
  /** @type {string} - description */
  UserUpdate;




  /**
   *
   * @param {procurement_approval} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {procurement_approval} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      Procurement_id: new FormElement({
        label: "Procurement_id",
        model: "Procurement_id",
        type: FormElementType.text,
      }),
      Comment: new FormElement({
        label: "Comment",
        model: "Comment",
        type: FormElementType.text,
      }),
      State: new FormElement({
        label: "Tình trạng",
        model: "State",
        type: FormElementType.text,
      }),
      Emp_id: new FormElement({
        label: "Emp_id",
        model: "Emp_id",
        type: FormElementType.text,
      }),
      Emp_FullName: new FormElement({
        label: "Emp_FullName",
        model: "Emp_FullName",
        type: FormElementType.text,
      }),
      Emp_Title: new FormElement({
        label: "Emp_Title",
        model: "Emp_Title",
        type: FormElementType.text,
      }),
      Emp_Email: new FormElement({
        label: "Emp_Email",
        model: "Emp_Email",
        type: FormElementType.text,
      }),
      Emp_SignatureImage: new FormElement({
        label: "Emp_SignatureImage",
        model: "Emp_SignatureImage",
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
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Procurement_id,
        this._formElements.Comment,
        this._formElements.State,
        this._formElements.Emp_id,
        this._formElements.Emp_FullName,
        this._formElements.Emp_Title,
        this._formElements.Emp_Email,
        this._formElements.Emp_SignatureImage,
        this._formElements.Id,
        this._formElements.DateUpdate,
        this._formElements.DateCreate,
        this._formElements.UserCreate,
        this._formElements.UserUpdate

      ]
    });
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined
    }
  }
  Save() {
    if (this.Id) {
      return API_procurement_approval.Put(this.Id, this)
    } else {
      return API_procurement_approval.Post(this)
    }
  }
  Delete() {
    return ShowConfirm({
      title: 'Alert',
      message: `Are you sure?`,
      type: MessageType.warning,
    }).then(() => {
      return API_procurement_approval.Delete(this.Id);
    })
  }
}
