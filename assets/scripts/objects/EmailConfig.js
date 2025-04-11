
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { MessageType, ShowConfirm } from "~/assets/scripts/Functions";
import { Para } from "../Para";


export default class EmailConfig {
  /** @type {number} - description */
  Title;
  /** @type {string} - description */
  Content;
  /** @type {string} - description */
  Type;
  /** @type {string} - description */
  Description;
  /** @type {string} - description */
  State;

  /** @type {string} - description */
  Id;




  /**
   *
   * @param {EmailConfig} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {EmailConfig} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      Type: new FormElement({
        label: "Loại",
        model: "Type",
        type: FormElementType.select,
        options: Para.EmailConfigType
      }),
      Title: new FormElement({
        label: "Tiêu đề",
        model: "Title",
        type: FormElementType.text,
      }),
      State: new FormElement({
        label: "Active",
        model: "State",
        type: FormElementType.select,
        options: Para.YesNo
      }),
      Content: new FormElement({
        label: "Content",
        model: "Content",
        type: FormElementType.quillEditor,
      }),
      Description: new FormElement({
        label: "Mô tả",
        model: "Description",
        type: FormElementType.text,
        attr: {
          type: 'textarea'
        }
      }),


    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Type,
        this._formElements.Description,
        this._formElements.State,
        this._formElements.Title,
        this._formElements.Content,
      ]
    });
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined
    }
  }

}
