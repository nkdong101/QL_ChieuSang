import { FormDirectionType, FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import API from "../API";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
export default class Project_Info {
  /** @type {string} - description */
  Project_Code;
  /** @type {string} - description */
  Type_id;
  /** @type {string} - description */
  Project_id;
  /** @type {string} - description */
  Project_Name;
  /** @type {string} - description */
  Award_id;
  /** @type {string} - description */
  Award_Code;
  /** @type {string} - description */
  Task_id;
  /** @type {string} - description */
  Task_Code;
  /** @type {Array} - description */
  Details = [];



  _formElements = {

    // Project_Code: new FormElement({
    //   label:  "Số hợp đồng",
    //   model: "Project_Code",
    //   type: FormElementType.select,
    //   options: new SelectOption({
    //     data: API.Project_Info_Get_Para,
    //     allowCreate: true
    //   })
    // }),
    Project_Code: new FormElement({
      label:  "Số hợp đồng",
      model: "Project_Code",
      type: FormElementType.text,

    }),
    Project_Name: new FormElement({
      label: "Project Name",
      model: "Project_Name",
      type: FormElementType.text,

    }),
    Award_Code: new FormElement({
      label: "Award Code",
      model: "Award_Code",
      type: FormElementType.text,

    }),
    Task_Code: new FormElement({
      label: "Task Code",
      model: "Task_Code",
      type: FormElementType.text,
    }),
   
  };

  /**
   *
   * @param {Project_Info} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Project_Info} obj
   */
  update(obj) {
    Object.assign(this, obj);
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined,
      Details: undefined,
    }
  }
  form() {
    return new FormInfo({
      formData: this,
      elements: [
        // this._formElements.DateCreate,
        this._formElements.Project_Code,
        this._formElements.Project_Name,
        new FormElement({
          child: [
            new FormElement({
              id: "formProjectSave",
              type: "formProjectSave",
              attr: {
                Project_Info: this,

              }
            }),
            new FormElement({
              direction: FormDirectionType.vertical,
              child: [
                this._formElements.Award_Code,
                this._formElements.Task_Code,
              ]
            })
          ]
        }),

      ]
    });
  }
}
