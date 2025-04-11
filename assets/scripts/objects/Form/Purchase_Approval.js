import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
export default class Purchase_Approval {
  /** @type {number} - description */
  Purchase_id;

  /** @type {string} - description */
  Emp_id;
  /** @type {string} - description */
  Emp_Email;
  /** @type {string} - description */
  Emp_Title;
  /** @type {string} - description */
  Emp_FullName;
  /** @type {string} - description */
  Emp_SignatureImage;


  /** @type {number} - description */
  Type_id;
  /** @type {string} - description */
  Comment;
  /** @type {number} - description */
  State;
  /** @type {number} - description */
  Id;

  objOld;


  /**
   *
   * @param {Purchase_Approval} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Purchase_Approval} obj
   */
  update(obj) {
    Object.assign(this, obj);
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [


      ]
    });
  }
}
