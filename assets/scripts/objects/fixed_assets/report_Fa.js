import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { GetStartMonth, GetTimeNow } from "../../Functions";
import { Para } from "../../Para";
import { SelectOption } from "../../base/SelectOption";
import API from "../../API";

export default class fixed_asets_filter {
  Office_id = "";
  Store_id = "";

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
      Office_id: new FormElement({
        label: "Văn phòng",
        model: "Office_id",
        type: FormElementType.select,
        labelWidth: 100,
        options: Para.Para_Office,
      }),

      Store_id: new FormElement({
        label: "Phòng ban",
        model: "Store_id",
        type: FormElementType.select,
        labelWidth: 100,
        options(data) {
          // const arr = [data.Office_id];
          // console.log(arr);
          return new SelectOption({
            data: data.Office_id ? API.dm_department_Get_List : [],
            params: {
              iOffice_id: data.Office_id,
            },
            // multiple: true,
          });
        },
      }),
      Type: new FormElement({
        label: "Loại",
        model: "Type",
        type: FormElementType.select,
        options: Para.fixed_asset_type_Get_List.set(
          (p) => (p.placeholder = "Tất cả")
        ),
        // .set((p) => (p.labelFormat = p.labelFormat:(item)=> item.Code + item.Name)),
        labelWidth: 100,
      }),
    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Office_id,
        this._formElements.Store_id,
        this._formElements.Type,
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
