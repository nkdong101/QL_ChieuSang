import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import API from "../API";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
export default class RF_filter {
  /** @type {string} - description */
  Used;
  /** @type {string} - description */
  iType_id;

  _formElements = {
    Used: new FormElement({
      label: "Tình trạng",
      model: "Used",
      type: FormElementType.select,
      options: new SelectOption({
        data: [
          { Id: 1, Name: "Đã sử dụng" },
          { Id: 2, Name: "Chưa sử dụng" },
        ],
      }),
    }),
    iType_id: new FormElement({
      label: "Loại thẻ",
      model: "iType_id",
      type: FormElementType.select,
      options: Para.RF_Type,
    }),
  };

  /**
   *
   * @param {RF_filter} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {RF_filter} obj
   */
  update(obj) {
    Object.assign(this, obj);
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined,
      //   Details: undefined,
    };
  }
  form() {
    return new FormInfo({
      formData: this,
      labelWidth: 100,
      elements: [this._formElements.iType_id, this._formElements.Used],
    });
  }
}
