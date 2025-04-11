import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import InputFileModel, { InputFileType } from "~/components/form-content/InputFile/InputFIleModel";
import { Para } from "../Para";
import StoreManager from "../StoreManager";
export default class Document_File {
  /** @type {string} - description */
  Description;
  /** @type {number} - description */
  folder_id;
  /** @type {number} - description */
  URL;
  /** @type {number} - description */
  Sequency;
  /** @type {string} - description */
  UserName = StoreManager.GetUser().FullName;
  /** @type {number} - description */
  Id;
  /** @type {number} - description */
  DateUpdate;
  /** @type {number} - description */
  DateCreate;
  /** @type {number} - description */
  UserCreate;
  /** @type {number} - description */
  UserUpdate;



  _formElements = {
    Description: new FormElement({
      label: "Mô tả",
      model: "Description",
      type: FormElementType.text,
      attr: {
        type: 'textarea',
        rows: 7
      }
    }),
    folder_id: new FormElement({
      label: "folder_id",
      model: "folder_id",
      type: FormElementType.text,
      disabled: true,
    }),
    UserName: new FormElement({
      label: "User Name",
      model: "UserName",
      type: FormElementType.text,
      disabled: true,
    }),
    URL: new FormElement({
      id: "document_url",
      label: "",
      model: "URL",
      type: FormElementType.file,
      options: new InputFileModel({
        type: InputFileType.OneFile,
        baseUrl: "/upload/Library/",
        // limit: 1
      }),
    }),
    Sequency: new FormElement({
      label:  "Trình tự",
      model: "Sequency",
      type: FormElementType.number,
    }),
    Id: new FormElement({
      label: "Id",
      model: "Id",
      type: FormElementType.text,
    }),


  };

  /**
   *
   * @param {Document_File} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Document_File} obj
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
        this._formElements.Description,
        this._formElements.URL,
        this._formElements.Sequency,

      ]
    });
  }
}
