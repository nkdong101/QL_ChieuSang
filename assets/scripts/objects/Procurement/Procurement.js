
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { IsNullDate, MessageType, ShowConfirm } from "~/assets/scripts/Functions";
import API from "~/assets/scripts/API";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
export const API_Procurement = {
  Get: () => GetDataAPI({
    url: API.Procurement
  }),
  /**
   * @param {Procurement} obj - description
  */
  Post: (obj) => GetDataAPI({
    method: 'post',
    url: API.Procurement,
    params: obj.toJSON(),
  }),
  /**
   * @param {Procurement} obj - description
  */
  Put: (id, obj) => GetDataAPI({
    method: 'put',
    url: API.Procurement + '/' + id,
    params: obj.toJSON()
  }),
  Delete: (id) => GetDataAPI({
    method: 'delete',
    url: API.Procurement + '/' + id,
  }),
}
export default class Procurement {
  /** @type {number} - description */
  Purchase_id;
  /** @type {number} - description */
  Method_id;
  /** @type {number} - description */
  Method_Auto_id;
  /** @type {number} - description */
  TypeOfCompetition;
  /** @type {string} - description */
  Bid_Announcement_Date;
  /** @type {string} - description */
  Bid_adverisement;
  /** @type {string} - description */
  Submission_Deadline;
  /** @type {string} - description */
  Contract_Url;
  /** @type {string} - description */
  Contract_No;
  /** @type {string} - description */
  Special_notes;
  /** @type {number} - description */
  Special_id;
  /** @type {number} - description */
  Awrd_Value;
  /** @type {number} - description */
  State;
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
  /** @type {string} - description */
  Advertisements;



  Contract_Date;
  Contract_Value;
  CompetionDate;
  Attachment;
  Submission_Deadline_Note;
  Bid_Announcement_Date_Note;
  Method_id_Note;

  /**
   *
   * @param {Procurement} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Procurement} obj
   */
  update(obj) {


    if (obj) {
      if (IsNullDate(obj.Bid_Announcement_Date))
        obj.Bid_Announcement_Date = '';
      if (IsNullDate(obj.Submission_Deadline))
        obj.Submission_Deadline = '';
      if (IsNullDate(obj.CompetionDate))
        obj.CompetionDate = '';
      if (IsNullDate(obj.Contract_Date))
        obj.Contract_Date = '';
    }




    Object.assign(this, obj);
    this._formElements = {
      Purchase_id: new FormElement({
        label: "Purchase_id",
        model: "Purchase_id",
        type: FormElementType.text,
      }),
      Method_id: new FormElement({
        label: "Method_id",
        model: "Method_id",
        type: FormElementType.text,
      }),
      Method_Auto_id: new FormElement({
        label: "Method_Auto_id",
        model: "Method_Auto_id",
        type: FormElementType.text,
      }),
      TypeOfCompetition: new FormElement({
        label: "TypeOfCompetition",
        model: "TypeOfCompetition",
        type: FormElementType.text,
      }),
      Bid_Announcement_Date: new FormElement({
        label: "Bid_Announcement_Date",
        model: "Bid_Announcement_Date",
        type: FormElementType.text,
      }),
      Submission_Deadline: new FormElement({
        label: "Submission_Deadline",
        model: "Submission_Deadline",
        type: FormElementType.text,
      }),
      Contract_Url: new FormElement({
        label: "Contract_Url",
        model: "Contract_Url",
        type: FormElementType.text,
      }),
      Contract_No: new FormElement({
        label: "Contract_No",
        model: "Contract_No",
        type: FormElementType.text,
      }),
      Special_notes: new FormElement({
        label: "Special_notes",
        model: "Special_notes",
        type: FormElementType.text,
      }),
      Special_id: new FormElement({
        label: "Special_id",
        model: "Special_id",
        type: FormElementType.text,
      }),
      State: new FormElement({
        label: "Tình trạng",
        model: "State",
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
        this._formElements.Purchase_id,
        this._formElements.Method_id,
        this._formElements.Method_Auto_id,
        this._formElements.TypeOfCompetition,
        this._formElements.Bid_Announcement_Date,
        this._formElements.Submission_Deadline,
        this._formElements.Contract_Url,
        this._formElements.Contract_No,
        this._formElements.Special_notes,
        this._formElements.Special_id,
        this._formElements.State,
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
      return API_Procurement.Put(this.Id, this)
    } else {
      return API_Procurement.Post(this)
    }
  }
  Delete() {
    return ShowConfirm({
      title: 'Alert',
      message: `Are you sure?`,
      type: MessageType.warning,
    }).then(() => {
      return API_Procurement.Delete(this.Id);
    })
  }
}
