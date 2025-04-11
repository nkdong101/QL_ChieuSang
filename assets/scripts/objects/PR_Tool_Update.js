import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import InputFileModel, { InputFileType } from "~/components/form-content/InputFile/InputFIleModel";
import { Para } from "../Para";
import { SelectOption } from "../base/SelectOption";
import API from "../API";
export default class PR_Tool_Update {
  /** @type {string} - description */
  Name;
  /** @type {string} - description */
  Procurement_id;
  /** @type {number} - description */
  Sequency;
  /** @type {string} - description */
  URL;
  /** @type {string} - description */
  Category_id = [];
  /** @type {number} - description */
  Money_Min;
  /** @type {number} - description */
  Money_Max;
  /** @type {string} - description */
  Approval_Description;
  /** @type {string} - description */
  Endorsed_Description;
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
    Procurement_id: new FormElement({
      id: "Procurement_id",
      label: "Tên",
      model: "Procurement_id",
      type: FormElementType.select,
      required: true,
      options: new SelectOption({
        data: API.Get_Procurement_Methods,
      }),
      watch(data, nv, ov, $this) {
        if ($this.getEntry("Procurement_id").selectedData) {
          data.Name = $this.getEntry("Procurement_id").selectedData.Name
        }
        // console.log($this.getEntry("Procurement_id"))
      }
    }),
    Sequency: new FormElement({
      label:  "Trình tự",
      model: "Sequency",
      type: FormElementType.text,
    }),
    URL: new FormElement({
      id: "document_url",
      label: "URL",
      model: "URL",
      type: FormElementType.file,
      options: new InputFileModel({
        type: InputFileType.default,
        baseUrl: "/upload/PR_Tool_Update/",

      }),
    }),
    Category_id: new FormElement({
      label: "Category",
      model: "Category_id",
      type: FormElementType.select,
      options: Para.Para_Category,
    }),
    Money_Min: new FormElement({
      label: "Money Min",
      model: "Money_Min",
      type: FormElementType.number,
    }),
    Money_Max: new FormElement({
      label: "Money Max",
      model: "Money_Max",
      type: FormElementType.number,
    }),
    Approval_Description: new FormElement({
      label: "Approval Description",
      model: "Approval_Description",
      type: FormElementType.text,
    }),
    Endorsed_Description: new FormElement({
      label: "Endorsed Description",
      model: "Endorsed_Description",
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
   * @param {PR_Tool_Update} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {PR_Tool_Update} obj
   */
  update(obj) {
    Object.assign(this, obj);
  }
  toJSON() {
    return {
      ...this,
      Category_id: this.Category_id.join(","),
      _formElements: undefined,
    }
  }
  form() {
    return new FormInfo({
      formData: this,
      labelWidth: 155,
      elements: [
        this._formElements.Procurement_id,
        this._formElements.Sequency,
        this._formElements.URL,
        new FormElement({
          id: "Category",
          type: "formChooseCategory",
          attr: {
            Title: "Category",
            data: Para.Para_Category.data,
            valuecheck: this,

          },
        }),
        new FormElement({
          child: [
            this._formElements.Money_Min,
            this._formElements.Money_Max,
          ]
        }),
        this._formElements.Endorsed_Description,
        this._formElements.Approval_Description,

      ]
    });
  }
}
