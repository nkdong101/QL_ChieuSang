
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { MessageType, ShowConfirm } from "~/assets/scripts/Functions";
import API from "~/assets/scripts/API";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
import { Para } from "../../Para";

export default class PRFilter {
  /** @type {string} - description */
  Office_id;
  /** @type {string} - description */
  Status;
  /** @type {string} - description */
  Categories;
  /** @type {string} - description */
  ProjectCode;
  /** @type {string} - description */
  Practice;
  /** @type {string} - description */
  RequestBy;
  /** @type {string} - description */
  Endorsed;
  /** @type {string} - description */
  Approved;
  /** @type {string} - description */
  Id;




  /**
   *
   * @param {PRFilter} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {PRFilter} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      Office_id: new FormElement({
        label: "Văn phòng",
        model: "Office_id",
        type: FormElementType.select,
        options: Para.Para_Office
      }),
      Status: new FormElement({
        label: "Trạng thái",
        model: "Status",
        type: FormElementType.select,
        options: Para.Para_Purchase_State
      }),
      Categories: new FormElement({
        label: "Categories",
        model: "Categories",
        type: FormElementType.select,
        options: Para.Para_Category
      }),
      ProjectCode: new FormElement({
        label: "ProjectCode",
        model: "ProjectCode",
        type: FormElementType.select,
        attr: {
          showAll: true
        },
        options: Para.Para_Project_Code
      }),
      Practice: new FormElement({
        label: "Practice",
        model: "Practice",
        type: FormElementType.select,
        options: Para.Para_Practice
      }),
      RequestBy: new FormElement({
        label: "RequestBy",
        model: "RequestBy",
        type: FormElementType.text,
      }),
      Endorsed: new FormElement({
        label: "Endorsed",
        model: "Endorsed",
        type: FormElementType.text,
      }),
      Approved: new FormElement({
        label: "Approved",
        model: "Approved",
        type: FormElementType.text,
      }),
      Id: new FormElement({
        label: "Id",
        model: "Id",
        type: FormElementType.text,
      }),

    };
  }

  form() {
    return new FormInfo({
      formData: this,
      labelWidth: 95,
      elements: [

        new FormElement({
          child: [
            this._formElements.Office_id.set(p => p.col = 8),
            this._formElements.Categories.set(p => p.col = 8),
          ]
        }),
        new FormElement({
          child: [
            this._formElements.Status,
            this._formElements.ProjectCode,
            this._formElements.Practice,
          ]
        }),
        // new FormElement({
        //   child: [
        //     this._formElements.RequestBy,
        //     this._formElements.Endorsed,
        //     this._formElements.Approved,
        //   ]
        // }),
      ]
    });
  }
  formInline() {
    return new FormInfo({
      formData: this,
      labelWidth: 95,
      elements: [

        new FormElement({
          child: [
            this._formElements.Office_id,
            this._formElements.Categories,
            this._formElements.Status,
            this._formElements.ProjectCode,
            this._formElements.Practice,
          ]
        }),

        // new FormElement({
        //   child: [
        //     this._formElements.RequestBy,
        //     this._formElements.Endorsed,
        //     this._formElements.Approved,
        //   ]
        // }),
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
      return API_PRFilter.Put(this.Id, this)
    } else {
      return API_PRFilter.Post(this)
    }
  }
  Delete() {
    return ShowConfirm({
      title: 'Xác nhận',
      message: `Bạn chắc chắn muốn xóa PRFilter [${this.Name}]`,
      type: MessageType.warning,
    }).then(() => {
      return API_PRFilter.Delete(this.Id);
    })
  }
}
