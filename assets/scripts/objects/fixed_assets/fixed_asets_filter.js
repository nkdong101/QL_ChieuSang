import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { GetStartMonth, GetTimeNow } from "../../Functions";
import { Para } from "../../Para";

export default class fixed_asets_filter {
  From = GetStartMonth();
  To = GetTimeNow();
  Office_id = "";
  Project_Code = "";
  State = "";
  Type = "";

  /**
   *
   * @param {fixed_asets_filter} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {fixed_asets_filter} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      From: new FormElement({
        label: "Từ ngày",
        model: "From",
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
          (p) => (p.placeholder = "All")
        ),
      }),
      Office_id: new FormElement({
        label: "Văn phòng",
        model: "Office_id",
        type: FormElementType.select,
        options: Para.Para_Office.set((p) => (p.placeholder = "All")),
      }),
      Project_Code: new FormElement({
        label:  "Số hợp đồng",
        model: "Project_Code",
        type: FormElementType.select,
        options: Para.Para_Project_Code.set((p) => (p.placeholder = "All")),
      }),
      Type: new FormElement({
        label: "Loại",
        model: "Type",
        type: FormElementType.select,
        options: Para.fixed_asset_type_Get_List
          .set((p) => (p.placeholder = "All"))
          .set((p) => (p.label = "Code")),
      }),
    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        new FormElement({
          direction: FormDirectionType.horizontal,
          child: [
            this._formElements.From,
            this._formElements.To,
            this._formElements.State,
          ],
        }),
        new FormElement({
          direction: FormDirectionType.horizontal,
          child: [
            this._formElements.Office_id.set((p) => (p.col = 8)),
            this._formElements.Project_Code.set((p) => (p.col = 8)),
            this._formElements.Type.set((p) => (p.col = 8)),
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
