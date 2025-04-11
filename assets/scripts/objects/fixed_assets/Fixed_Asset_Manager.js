import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { GetStartMonth, GetTimeNow } from "../../Functions";
import { Para } from "../../Para";
import { SelectOption } from "../../base/SelectOption";
import API from "../../API";

export default class Fixed_Asset_Manager {
  /** @type {number} - description */
  From_Office_id;
  /** @type {number} - description */
  To_Office_id;
  /** @type {number} - description */
  From_Department_id;
  /** @type {number} - description */
  To_Department_Id;
  /** @type {number} - description */
  Description;
  /** @type {string} - description */
  Start_Date = new Date();
  /** @type {number} - description */
  State;
  /** @type {string} - description */
  Approved_Date;
  /** @type {string} - description */
  Approved_User;
  /** @type {string} - description */
  Receive_date;
  /** @type {string} - description */
  Receive_user;

  Files= '';

  FromMangerId;
  ToMangerId;
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
  // formE()

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        new FormElement({
          direction: FormDirectionType.horizontal,

          child: [
            new FormElement({
              child: [
                this._formElements.From_Office_id,
                this._formElements.From_Department_id,
              ],
            }),
            new FormElement({
              child: [
                this._formElements.To_Office_id,
                this._formElements.To_Department_Id,
              ],
            }),
          ],
        }),

        this._formElements.Description,
      ],
    });
    // return new FormElement({
    //   direction: FormDirectionType.vertical,
    //   child: [

    // });
  }

  /**
   *
   * @param {Fixed_Asset_Manager} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Fixed_Asset_Manager} obj
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
}
