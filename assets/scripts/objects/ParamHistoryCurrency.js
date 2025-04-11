import API from "../API";
import { FormElement, FormElementType, FormInfo } from "../base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
import StoreManager from "../StoreManager";


export default class ParamHistoryCurrency {
  iCode = "";

  iRecordOfPage = 50;
  iPage = 0;
  iSearchInfo = "";




  constructor(obj) {
    // if (localStorage.report_params && !obj) {
    //     obj = JSON.parse(localStorage.report_params)
    // }
    this.update(obj);
  }

  update(obj) {
    Object.assign(this, obj || {})
  }

  /** @type {FormInfo} - description */
  _formElements = {
    iCode: new FormElement({
      label: "Form currency",
      model: "iCode",
      type: FormElementType.select,
      options: Para.Para_Currency_now,
      watch(data, nv, ov, $this, isFirst) {
        if (!isFirst) {
          $this.onChange();
        }
      },

      // required: true,
    }),

  };
  toJSON(isAgain) {
    if (!isAgain) {
      let data = this.toJSON(true);
      data.iSearchInfo = '';
      localStorage.report_params = JSON.stringify(data)
    }

    return {
      ...this,
      _formElements: undefined,

    }
  }
  /** @return {FormInfo} - description */
  form() {
    return new FormInfo({
      formData: this,
      labelWidth: 120,
      elements: [
        new FormElement({
          child: [
            this._formElements.iCode,
          ],
        }),

      ],
    });
  }




}
