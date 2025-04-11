import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";
import { GetStartMonth, GetTimeNow } from "../Functions";

export default class TicketsFilter {
  /** @type {string} - description */
  From = GetStartMonth();
  /** @type {string} - description */
  To = GetTimeNow();
  CreateDate = GetTimeNow();
  /** @type {string} - description */
  State;
  /** @type {string} - description */
  iFixed_assset_id;

  /**
   *
   * @param {TicketsFilter} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {TicketsFilter} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      From: new FormElement({
        label: "Từ ngày",
        model: "From",
        type: FormElementType.datePicker,
      }),
      CreateDate: new FormElement({
        label: "Ngày sửa chữa",
        model: "CreateDate",
        type: FormElementType.datePicker,
      }),
      To: new FormElement({
        label: "Đến ngày",
        model: "To",
        type: FormElementType.datePicker,
      }),
      State: new FormElement({
        label: "Tình trạng",
        model: "State",
        type: FormElementType.select,
        options: Para.fixed_asset_state_Get_List.set(
          (p) => (p.placeholder = "Tất cả")
        ),
      }),
    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        new FormElement({
          direction: FormDirectionType.vertical,
          child: [
            // this._formElements.CreateDate,
            this._formElements.From,
            this._formElements.To,
            this._formElements.State,
          ],
        }),
      ],
    });
  }

  toJSON() {
    return {
      ...this,
      _formElements: undefined,
    };
  }
}
