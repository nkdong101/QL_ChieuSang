import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { SelectOption } from "../base/SelectOption";
import { Para } from "../Para";
import API from "../API";
import Fixed_Asset_Inventory_Filter from "./fixed_assets/Fixed_Asset_Inventory_Filter";
import { GetStartMonth } from "../Functions";
export default class transferFilter {
  /** @type {string} - description */
  From_Date = GetStartMonth();
  /** @type {string} - description */
  To_Date = new Date(
    new Date(this.From_Date).getFullYear(),
    new Date(this.From_Date).getMonth() + 1,
    1
  );
  /** @type {string} - description */
  Maphieu;
  /** @type {string} - description */
  RFID;
  /** @type {string} - description */
  DeviceName;
  /** @type {number} - description */
  From_Office_id;
  /** @type {number} - description */
  To_Office_id;
  /** @type {number} - description */
  FromStore_id;
  /** @type {number} - description */
  ToStore_id;
  /** @type {string} - description */
  Serial;

  _formElements = {
    From_Date: new FormElement({
      label: "Từ ngày",
      model: "From_Date",
      type: FormElementType.datePicker,
    }),
    To_Date: new FormElement({
      label: "Đến ngày",
      model: "To_Date",
      type: FormElementType.datePicker,
      attr: {
        disabledCrDate: true,
      },
    }),
    Maphieu: new FormElement({
      label: "Phiếu",
      model: "Maphieu",
      type: FormElementType.select,
      options() {
        return new SelectOption({
          data: API.Manager_GetList,
          params: {
            Office_id: 0,
            FromDate: "",
            ToDate: new Date(),
          },
          labelFormat: (item) => item.Id.toString().padStart(6, "0"),
        });
      },
    }),
    DeviceName: new FormElement({
      label: "Tên thiết bị",
      model: "DeviceName",
      type: FormElementType.text,
    }),
    Serial: new FormElement({
      label: "Mã tài sản",
      model: "Serial",
      type: FormElementType.text,
    }),
    From_Office_id: new FormElement({
      label: "Văn phòng chuyển",
      model: "From_Office_id",
      type: FormElementType.select,
      options: Para.Para_Office,
      labelWidth: 145,
      watch(data, n, o, t, iF) {
        if (!iF) {
          if (n != o) {
            // console.log(data.FromStore_id);

            data.FromStore_id = "";
          }
        }
      },
    }),
    To_Office_id: new FormElement({
      label: "Văn phòng nhận",
      model: "To_Office_id",
      type: FormElementType.select,
      options: Para.Para_Office,
      labelWidth: 145,
      watch(data, n, o, t, iF) {
        if (!iF) {
          if (n != o) {
            // console.log(data.To_Department);
            data.ToStore_id = "";
          }
        }
      },
    }),

    FromStore_id: new FormElement({
      // required: true,
      label: "Phòng ban chuyển",
      model: "FromStore_id",

      type: FormElementType.select,
      // required: true,
      labelWidth: 145,

      options(data) {
        // const arr = [data.Office_id];
        //   console.log(data);
        // data.FromStore_id = '';
        return Para.dm_department.set(
          (p) =>
            (p.data = p.data.filter((x) => x.Office_id == data.From_Office_id))
        );
      },
    }),
    ToStore_id: new FormElement({
      // required: true,
      label: "Phòng ban nhận",
      model: "ToStore_id",

      type: FormElementType.select,
      // required: true,
      labelWidth: 145,
      options(data) {
        // const arr = [data.Office_id];
        //   console.log(data);
        return Para.dm_department.set(
          (p) =>
            (p.data = p.data.filter((x) => x.Office_id == data.To_Office_id))
        );
      },
    }),
  };

  /**
   *
   * @param {transferFilter} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {transferFilter} obj
   */
  update(obj) {
    Object.assign(this, obj);
  }
  toJSON() {
    return {
      ...this,
      _formElements: undefined,
    };
  }
  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Maphieu,
        this._formElements.DeviceName,
        // this._formElements.RFID,
        new FormElement({
          child: [this._formElements.From_Date, this._formElements.To_Date],
          direction: FormDirectionType.horizontal,
        }),
        new FormElement({
          child: [
            this._formElements.From_Office_id,
            this._formElements.To_Office_id,
          ],
          direction: FormDirectionType.horizontal,
        }),
        new FormElement({
          child: [
            this._formElements.FromStore_id,
            this._formElements.ToStore_id,
          ],
          direction: FormDirectionType.horizontal,
        }),
      ],
    });
  }
}
