
import { FormElement, FormElementType, FormInfo } from "~/assets/scripts/base/FormInfo";
import { Para } from "../Para";
import StoreManager from "../StoreManager";
import InputFileModel from "~/components/form-content/InputFile/InputFIleModel";

export default class Tickets {
  /** @type {number} - description */
  Fixed_Asset_id;
  /** @type {string} - description */
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
  /** @type {number} - description */
  Total_Comment;
  Files;
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
   * @param {Tickets} obj
   */
  constructor(obj) {
    this.update(obj);
  }
  /**
   *
   * @param {Tickets} obj
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
          type: 'textarea'
        }
      }),
      State: new FormElement({
        label: "Tình trạng",
        model: "State",
        type: FormElementType.select,
        options: Para.TicketsState,
        disabled: true
      }),
      Receive_User: new FormElement({
        label: "Receive User",
        model: "Receive_User",
        type: FormElementType.select,
        options: Para.Para_Account.set(p => p.placeholder = ""),
        disabled: true

      }),
      Receive_Date: new FormElement({
        label: "Receive Date",
        model: "Receive_Date",
        type: FormElementType.datePicker,
        disabled: true

      }),
      Act_User: new FormElement({
        label: "Act User",
        model: "Act_User",
        type: FormElementType.select,
        disabled: true

      }),
      Act_Name: new FormElement({
        label: "Act Name",
        model: "Act_Name",
        type: FormElementType.text,
      }),

      Act_User: new FormElement({
        label: "Người sửa",
        model: "Act_User",
        type: FormElementType.select,
        options(data){
          // console.log(Para.Para_Account.set(p=>p.data = p.data.filter(x=> x.Office_id === 10)))
          // return Para.Para_Account.set(p=>p.data = p.data.filter(x=> x.Office_id === 10))
          return Para.Para_Account.set(p=>p.data = p.data.filter(x=> x.Office_id === StoreManager.GetUser().Office_id))
        },
        required: true,
        watch(data,n,o,t,iF){
          // console.log(data,t)
          let slData = t.getEntry(data._formElements.Act_User.id).selectedData || {};
          
          data.Act_Name = slData.FullName
        }
      }),
      Files: new FormElement({
        // label: "Mã tài sản",
        model: "Files",
        id: 'files',
        disabled: true,
        type: FormElementType.file,
        options(){
          return  new InputFileModel({
            baseUrl: "/Images/Ticket/",
            limit:1,
          })
        }
      }),

      Order_id: new FormElement({
        label: "Order_id",
        model: "Order_id",
        type: FormElementType.text,
      }),
      Finish_Date: new FormElement({
        label: "Finish Date",
        model: "Finish_Date",
        type: FormElementType.datePicker,

      }),
      Total_Comment: new FormElement({
        label: "Total_Comment",
        model: "Total_Comment",
        type: FormElementType.text,
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
      Fixed_Code: new FormElement({
        label: "Mã",
        model: "Fixed_Code",
        type: FormElementType.text,
        disabled: true
      }),
      Fixed_Producer: new FormElement({
        label: "Nhà sản xuất",
        model: "Fixed_Producer",
        type: FormElementType.text,
        disabled: true
      }),
      Fixed_Model: new FormElement({
        label: "Chủng loại",
        model: "Fixed_Model",
        type: FormElementType.text,
        disabled: true
      }),
      Fixed_Serial: new FormElement({
        label: "Số Serial",
        model: "Fixed_Serial",
        type: FormElementType.text,
        disabled: true
      }),
      Fixed_State: new FormElement({
        label: "Trạng thái",
        model: "Fixed_State",
        type: FormElementType.select,
        options: Para.fixed_asset_state_Get_List,

        disabled: true
      }),
      Fixed_Name: new FormElement({
        label: "Tên tài sản",
        model: "Fixed_Name",
        type: FormElementType.text,
        // options: Para.fixed_asset_state_Get_List,

        disabled: true
      }),

    };
  }

  form() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Content,
        this._formElements.State,
      ]
    });
  }

  formEdit(){
    return new FormInfo({
      formData: this,
      labelWidth: 100,
      elements: [
        this._formElements.Fixed_Code,
        this._formElements.Fixed_Name,
        this._formElements.Act_User,
        this._formElements.Fixed_State.set(p=>p.disabled = false),
        this._formElements.Files,
        this._formElements.Content,
      ]
    });
  }

  formFA() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Fixed_Code,
        this._formElements.Fixed_Serial,
        this._formElements.Fixed_Model,
        this._formElements.Fixed_Producer,
      ]
    });
  }

  formDetail() {
    return new FormInfo({
      formData: this,
      elements: [
        this._formElements.Content,
        this._formElements.State,
        this._formElements.Receive_User,
        this._formElements.Receive_Date,
        this._formElements.Act_Name,
        this._formElements.Finish_Date,
      ]
    });
  }


  toJSON() {
    return {
      ...this,
      _formElements: undefined
    }
  }

}
