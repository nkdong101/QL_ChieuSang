import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";
import { GetEndMonth, GetStartMonth, GetTimeNow } from "../Functions";
import { SelectOption } from "../base/SelectOption";
import API from "../API";

export default class Fixed_Asset_Inventory_Filter {
  /** @type {string} - description */
  From = GetStartMonth();
  /** @type {string} - description */
  To = GetTimeNow();
  /** @type {string} - description */
  State;
  /** @type {string} - description */
  iFixed_assset_id;

  Office_id = Para.Para_Office.data[0].Id;

  ToDate = new Date(new Date(GetEndMonth()).getFullYear() + 1, new Date(GetEndMonth()).getMonth() + 1, 1);
  /** @type {string} - description */
  FromDate = new Date(
    new Date().getFullYear() - 1,
    new Date().getMonth(),
    new Date().getDate()
  );
  /**
   *
   * @param {Fixed_Asset_Inventory_Filter} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Fixed_Asset_Inventory_Filter} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      From: new FormElement({
        label: "Từ ngày",
        model: "From",
        type: FormElementType.datePicker,
        attr: {
          disabledCrDate: true,
        },
        labelWidth: 100,
      }),
      FromDate: new FormElement({
        label: "Từ ngày",
        model: "FromDate",
        type: FormElementType.datePicker,
        attr: {
          disabledCrDate: true,
        },
        labelWidth: 100,
      }),
      To: new FormElement({
        label: "Đến ngày",
        model: "To",
        type: FormElementType.datePicker,
        attr: {
          disabledCrDate: true,
        },
        labelWidth: 100,
      }),
      ToDate: new FormElement({
        label: "Đến ngày",
        model: "ToDate",
        type: FormElementType.datePicker,
        attr: {
          disabledCrDate: true,
        },
        labelWidth: 100,
      }),
      State: new FormElement({
        label: "Tình trạng",
        model: "State",
        type: FormElementType.select,
        options: Para.InventoryState.set((p) => (p.placeholder = "Tát cả")),
      }),
      Office_id: new FormElement({
        label: "Văn phòng",
        model: "Office_id",
        type: FormElementType.select,
        options: Para.Para_Office,
        labelWidth: 100,
      }),
    };
  }

  form() {
    return new FormInfo({
      formData: this,
      labelWidth: 100,

      elements: [
        new FormElement({
          direction: FormDirectionType.vertical,
          child: [
            this._formElements.From,
            this._formElements.To,
            this._formElements.State,
          ],
        }),
      ],
    });
  }
  form3() {
    return new FormInfo({
      formData: this,
      elements: [this._formElements.Office_id],
    });
  }

  form2() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Office_id,
        this._formElements.From,
        this._formElements.To,
      ],
    });
  }

  formInventRequest() {
    return new FormInfo({
      formData: this,
      labelWidth: 100,
      elements: [
        this._formElements.Office_id,
        this._formElements.From,
        this._formElements.To,
      ],
    });
  }
  form4() {
    return new FormInfo({
      formData: this,
      labelWidth: 100,
      elements: [
        this._formElements.Office_id,
        this._formElements.FromDate,
        this._formElements.ToDate,
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
