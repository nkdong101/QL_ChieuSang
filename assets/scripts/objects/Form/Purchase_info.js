import ConvertStr from "../../ConvertStr";
import { GetTimeNow } from "../../Functions";
import StoreManager from "../../StoreManager";
import PRFormDetail from "./Purchase_Detail";

export default class Purchase_info {
  /** @type {string} - description */
  UserRequest_FullName = StoreManager.GetUser().FullName;
  /** @type {string} - description */
  UserRequest_Title = StoreManager.GetUser().Title;
  /** @type {string} - description */
  UserRequest_SignatureImage = StoreManager.GetUser().Image;


  /** @type {string} - description */
  DateSubmitted;

  /** @type {string} - description */
  Serial;
  /** @type {string} - description */
  Date_Request = GetTimeNow();
  /** @type {number} - description */
  Office_id;
  /** @type {string} - description */
  Content;
  /** @type {string} - description */
  Comment;
  /** @type {number} - description */
  Category_id = 10;
  /** @type {string} - description */
  Money_code;
  /** @type {number} - description */
  Money_Total;
  /** @type {number} - description */
  Money_CHF;
  /** @type {number} - description */
  Status;
  /** @type {string} - description */
  URL;
  /** @type {string} - description */
  Contract_No;
  /** @type {string} - description */
  Contract_Info;
  /** @type {string} - description */
  Contract_Note;
  /** @type {string} - description */
  ProjectName;
  /** @type {number} - description */
  Id;
  EmailReminder = false;
  EmailReminderTime = 24;
  Use;
  Amendment_Index;
  Approval_Description;
  Base_id;
  DataSource;
  HasAdjustment;
  Hour_AR_Approved;
  Hour_AR_Endorsed;


  Procurement_No;
  Procurement_id;
  Procurement_Date;





  /**
  *
  * @param {Purchase_info} obj
  */
  constructor(obj) {
    this.update(obj);
  }



  /**
    * @param {Purchase_info} obj - description
   */
  update(obj) {

    // if (obj.detail) {
    //   let detail = obj.detail;
    //   delete obj.detail;
    //   this.detail = (detail || []).map(p => new PRFormDetail(p));
    // }

    Object.assign(this, obj);
  }





}
