import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { Para } from "~/assets/scripts/Para";
import {
  GetEndMonth,
  GetStartMonth,
  GetTimeNow,
} from "~/assets/scripts/Functions";

import { SelectOption } from "~/assets/scripts/base/SelectOption";
import API from "~/assets/scripts/API";

export default class Fixed_Asset_Inventory_Filter {
  Office_id = 0;
  To_Office;
  From_Department;
  To_Department;

  FromDate = new Date(2024, 6, 1);
  ToDate = new Date(new Date().getFullYear(), new Date().getMonth() + 2, 0);
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
      FromDate: new FormElement({
        label: "Từ ngày",
        model: "FromDate",
        type: FormElementType.datePicker,

        labelWidth: 145,
      }),

      ToDate: new FormElement({
        label: "Đến ngày",
        model: "ToDate",
        type: FormElementType.datePicker,
        attr: {
          disabledCrDate: true,
        },
        labelWidth: 145,
      }),

      Office_id: new FormElement({
        label: "Văn phòng chuyển",
        model: "Office_id",
        type: FormElementType.select,
        options: Para.Para_Office,
        labelWidth: 145,
        watch(data, n, o, t, iF) {
          if (!iF) {
            if (n != o) {
              console.log(data.From_Department);

              data.From_Department = "";
            }
          }
        },
      }),
      To_Office: new FormElement({
        label: "Văn phòng nhận",
        model: "To_Office",
        type: FormElementType.select,
        options: Para.Para_Office,
        labelWidth: 145,
        watch(data, n, o, t, iF) {
          if (!iF) {
            if (n != o) {
              console.log(data.To_Department);
              data.To_Department = "";
            }
          }
        },
      }),

      From_Department: new FormElement({
        // required: true,
        label: "Phòng ban chuyển",
        model: "From_Department",

        type: FormElementType.select,
        // required: true,
        labelWidth: 145,

        options(data) {
          // const arr = [data.Office_id];
          //   console.log(data);
          // data.From_Department = '';
          return Para.dm_department.set(
            (p) =>
              (p.data = p.data.filter((x) => x.Office_id == data.Office_id))
          );
        },
      }),
      To_Department: new FormElement({
        // required: true,
        label: "Phòng ban nhận",
        model: "To_Department",

        type: FormElementType.select,
        // required: true,
        labelWidth: 145,
        options(data) {
          // const arr = [data.Office_id];
          //   console.log(data);
          return Para.dm_department.set(
            (p) =>
              (p.data = p.data.filter((x) => x.Office_id == data.To_Office))
          );
        },
      }),
    };
  }

  form4() {
    return new FormInfo({
      formData: this,
      elements: [
        new FormElement({
          direction: FormDirectionType.horizontal,
          child: [this._formElements.Office_id, this._formElements.To_Office],
        }),
        new FormElement({
          direction: FormDirectionType.horizontal,
          child: [
            this._formElements.From_Department,
            this._formElements.To_Department,
          ],
        }),
        new FormElement({
          direction: FormDirectionType.horizontal,
          child: [this._formElements.FromDate, this._formElements.ToDate],
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
