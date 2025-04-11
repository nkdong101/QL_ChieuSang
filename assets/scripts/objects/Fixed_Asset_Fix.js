import {
  FormDirectionType,
  FormElement,
  FormElementType,
  FormInfo,
} from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";
import { RFC_2822 } from "moment";
import { SelectOption } from "../base/SelectOption";
import API from "../API";
import InputFileModel from "~/components/form-content/InputFile/InputFIleModel";

export default class Fixed_Asset_Fix {
  /** @type {number} - description */
  Fixed_Asset_id;
  /** @type {number} - description */
  Content;
  /** @type {number} - description */
  State;
  /** @type {string} - description */
  Receive_User;
  /** @type {string} - description */
  Receive_Date;
  /** @type {string} - description */
  Act_User;
  /** @type {string} - description */
  Act_Name;
  /** @type {number} - description */
  Order_id;
  /** @type {string} - description */
  Finish_Date;
  /** @type {string} - description */
  Total_Comment;
  /** @type {number} - description */
  Fixed_State;
  Files = [];
  /** @type {string} - description */
  Id;
  /** @type {string} - description */
  DateUpdate;
  /** @type {string} - description */
  DateCreate;
  /** @type {string} - description */
  UserCreate;
  /** @type {string} - description */
  UserUpdate;

  /**
   *
   * @param {Fixed_Asset_Fix} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Fixed_Asset_Fix} obj
   */
  update(obj) {
    Object.assign(this, obj);
    this._formElements = {
      Fixed_Asset_id: new FormElement({
        label: "Fixed_Asset_id",
        model: "Fixed_Asset_id",
        type: FormElementType.text,
      }),
      Content: new FormElement({
        label: "Nội dung",
        model: "Content",
        type: FormElementType.text,
        attr: {
          rows: 2,
          type: "textarea",
        },
      }),
      State: new FormElement({
        label: "Tình trạng",
        model: "State",
        type: FormElementType.text,
        // options(data){
        //   return new SelectOption({
        //     data: [{Id},]
        //   })
        // }
      }),
      Receive_User: new FormElement({
        label: "Người nhận",
        model: "Receive_User",
        type: FormElementType.select,
        options: Para.Para_Account,
      }),
      Receive_Date: new FormElement({
        label: "Ngày nhận",
        model: "Receive_Date",
        type: FormElementType.datePicker,
      }),
      Act_User: new FormElement({
        label: "Người sửa",
        model: "Act_User",
        type: FormElementType.select,
        options(data){
          // console.log(data)
          return  Para.Para_Account.set(p=>p.data = p.data.filter(x=> x.Office_id === data.Office_id))
        },
        required: true,
        watch(data,n,o,t,iF){
          // console.log(data,t)
          let slData = t.getEntry(data._formElements.Act_User.id).selectedData || {};
          
          data.Act_Name = slData.FullName
        }
      }),
      Order_id: new FormElement({
        label: "Mã Order",
        model: "Order_id",
        type: FormElementType.text,
      }),
      Finish_Date: new FormElement({
        label: "Ngày kết thúc",
        model: "Finish_Date",
        type: FormElementType.text,
      }),
      Total_Comment: new FormElement({
        label: "Tổng",
        model: "Total_Comment",
        type: FormElementType.text,
      }),
      Fixed_State: new FormElement({
        label: "Trạng thái",
        model: "Fixed_State",
        type: FormElementType.select,
        options: Para.fixed_asset_state_Get_List,
        required: true,
      }),

      FA_Name: new FormElement({
        label: "Tên tài sản",
        model: "FA_Name",
        type: FormElementType.text,
        // options: Para.fixed_asset_state_Get_List,
        disabled: true,
      }),

      FA_Code: new FormElement({
        label: "Mã tài sản",
        model: "FA_Code",
        type: FormElementType.text,
        // options: Para.fixed_asset_state_Get_List,
        disabled: true,
      }),
      Files: new FormElement({
        // label: "Mã tài sản",
        model: "Files",
        id: 'files',
        type: FormElementType.file,
        options(){
          return  new InputFileModel({
            baseUrl: "/Images/Ticket/",
            limit:1,

          })
        }
      }),



      Id: new FormElement({
        label: "Id",
        model: "Id",
        type: FormElementType.text,
      }),
      DateUpdate: new FormElement({
        label: "DateUpdate",
        model: "DateUpdate",
        type: FormElementType.text,
      }),
      DateCreate: new FormElement({
        label: "DateCreate",
        model: "DateCreate",
        type: FormElementType.text,
      }),
      UserCreate: new FormElement({
        label: "UserCreate",
        model: "UserCreate",
        type: FormElementType.text,
      }),
      UserUpdate: new FormElement({
        label: "UserUpdate",
        model: "UserUpdate",
        type: FormElementType.text,
      }),
    };
  }

  form() {
    return new FormInfo({
      formData: this,
      labelWidth: 120,
      elements: [
        // new FormElement({
        //   col: 24,
        //   direction: FormDirectionType.horizontal,
        //   child: [
           
        //   ],
        // }),
        this._formElements.FA_Code,
        this._formElements.FA_Name,
        this._formElements.Act_User,
        this._formElements.Fixed_State,
        this._formElements.Files,
        this._formElements.Content,
      ],
    });
  }

  toJSON() {
    return {
      ...this,
      _formElements: undefined,
      FA_Code: undefined,
      FA_Name: undefined,
    };
  }
}
