// @ts-nocheck

import InputFileModel, {
  InputFileAccept,
  InputFileType,
} from "~/components/form-content/InputFile/InputFIleModel";
import API from "./API";
import { SelectOption } from "./base/SelectOption";

export var Para = {
  Cable_form: new SelectOption({
    data: [
      { Id: 1, Name: "Treo" },
      { Id: 2, Name: "Ngầm" },
    ],
  }),

  dm_Cable_type: new SelectOption({
    data: [],
  }),

  OrderProcess: new SelectOption({
    data: API.Purchase_SearchOrderProcess,
    remote: true,
  }),
  InventoryType: new SelectOption({
    data: [
      { Id: 1, Name: "Online" },
      { Id: 2, Name: "Offline" },
    ],
  }),
  dm_Commune: new SelectOption({
    data: [],
  }),
  dm_Routes: new SelectOption({
    data: [],
  }),
  dm_County: new SelectOption({
    data: [],
  }),
  dm_Construction_Unit: new SelectOption({
    data: [],
  }),
  dm_Lighting_Group: new SelectOption({
    data: [],
  }),
  dm_Route_cabinet: new SelectOption({
    data: [],
  }),
  Box_Type: new SelectOption({
    data: [
      { Id: 1, Name: "Treo" },
      { Id: 2, Name: "Đặt" },
    ],
  }),
  Box_Control: new SelectOption({
    data: [
      { Id: 1, Name: "Tủ điều khiển từ trung tâm" },
      { Id: 2, Name: "Tủ chỉ điều khiển trực tiếp" },
    ],
  }),
  dm_Hangsx: new SelectOption({
    data: [],
  }),

  dm_Column_Type: new SelectOption({
    data: [],
  }),
  dm_Management_team: new SelectOption({
    data: [],
  }),
  StoreType: new SelectOption({
    data: [
      { Id: 1, Name: "Kho" },
      { Id: 2, Name: "Phòng làm việc" },
      { Id: 3, Name: "Sảnh" },
      { Id: 4, Name: "Hành lang" },
      { Id: 5, Name: "Phòng nghỉ" },
      { Id: 6, Name: "WC" },
      { Id: 7, Name: "Phòng khác" },
    ],
  }),
  OfficeType: new SelectOption({
    data: [
      { Id: 1, Name: "Trong nước" },
      { Id: 2, Name: "Quốc tế" },
    ],
  }),
  Para_Active: new SelectOption({
    data: [
      { Id: 1, Name: "Hoạt động" },
      { Id: 2, Name: "Không hoạt động" },
    ],
  }),
  Para_Use: new SelectOption({
    data: [
      { Id: 1, Name: "Hoạt động" },
      { Id: 2, Name: "Không hoạt động" },
      // { Id: 3, Name: "Vô hiệu hóa" },
    ],
  }),
  Para_UserStatus: new SelectOption({
    data: [
      { Id: 1, Name: "Đang sử dụng" },
      { Id: 2, Name: "Đang khóa" },
      { Id: 3, Name: "Không sử dụng" },
    ],
  }),
  SignImage: new InputFileModel({
    accept: InputFileAccept.image,
    baseUrl: "/images/signature/",
    limit: 1,
    type: InputFileType.avatar,
  }),
  MenuImage: new InputFileModel({
    accept: InputFileAccept.image,
    baseUrl: "/images/menu/",
    limit: 1,
    // type: InputFileType.avatar
  }),
  Inventory_Attachment: new InputFileModel({
    baseUrl: "/Images/Inventory/Attachment/",
    accept: InputFileAccept.image,
  }),
  Disposal_Attachment: new InputFileModel({
    baseUrl: "/Images/Disposal/Attachment/",
    // limit: 2,
  }),
  PR_Attachment: new InputFileModel({
    baseUrl: "/Images/Purchase/Attachment/",
  }),
  Comment_Attachment: new InputFileModel({
    baseUrl: "/Images/Comment/Attachment/",
  }),

  PR_Procurment_Attachment: new InputFileModel({
    baseUrl: "/Images/Purchase/Procurment_Attachment/",
  }),

  FixedAssetsImage: new InputFileModel({
    baseUrl: "/Images/FixedAssets/Attachment/",
    autoUpload: true,
    accept: "image/*,video/*,audio/*",
    label: "Gắn ảnh",
  }),

  PR_Procurment_Contract_Attachment: new InputFileModel({
    baseUrl: "/Images/Purchase/Contract_Attachment/",
    limit: 1,
    multiple: false,
  }),
  GroupPermission: new SelectOption({
    data: [],
  }),
  Para_Office: new SelectOption({
    data: [],
    IsItemDisabled: (item) => {
      if (item.Use == 2) return true;
    },
  }),
  Para_Category: new SelectOption({
    data: [],
  }),
  Para_VehicleType: new SelectOption({
    data: [],
  }),
  Para_Currency: new SelectOption({
    data: [],
    label: "Currency_Code",
    value: "Currency_Code",
  }),
  Para_Currency_now: new SelectOption({
    data: API.Get_Currency,
    label: "Currency_Code",
    value: "Currency_Code",
  }),
  Para_Practice: new SelectOption({
    data: [],
  }),
  Para_Project_Code: new SelectOption({
    placeholder: "Chọn một",
    data: [],
    dataExt: [{ Id: "Waiting Code", Name: "Waiting Code" }],
  }),
  PF_Special_id: new SelectOption({
    data: [
      { Id: 1, Name: "Less than 3 CVs/Quotation" },
      { Id: 2, Name: "Repeated Order" },
      { Id: 3, Name: "Others" },
    ],
    placeholder: "Chưa được chọn",
  }),
  PF_VendorState: new SelectOption({
    data: [
      { Id: 1, Name: "Approved" },
      { Id: 2, Name: "Others" },
    ],
  }),
  YesNo: new SelectOption({
    data: [
      { Id: 1, Name: "Có" },
      { Id: 2, Name: "Không" },
    ],
  }),
  ContractStatus: new SelectOption({
    data: [
      { Id: 1, Name: "Completed" },
      { Id: 2, Name: "On going" },
    ],
  }),
  FixedAssetsState: new SelectOption({
    data: [
      { Id: 1, Name: "Normal" },
      { Id: 2, Name: "Transferring" },
      { Id: 3, Name: "Pending Ticket" },
    ],
  }),

  Para_Project_Award_Code: new SelectOption({
    data: API.Project_Info_Get_ValueCode,
    placeholder: "Chọn một",
    dataExt: [{ Id: "Waiting Code", Name: "Waiting Code" }],
    params: {
      Type_id: 1,
    },
  }),
  Para_Project_Task_Code: new SelectOption({
    data: API.Project_Info_Get_ValueCode,
    placeholder: "Chọn một",
    dataExt: [{ Id: "Waiting Code", Name: "Waiting Code" }],
    params: {
      Type_id: 2,
    },
  }),
  Get_Procurement_Methods: new SelectOption({
    data: [], //API.Get_Procurement_Methods,
    // value: 'Info.Id',
    // label: 'Info.Name',
    placeholder: "Chưa được chọn",
  }),
  fixed_asset_type_Get_List: new SelectOption({
    data: [], //API.Get_Procurement_Methods,
    // value: 'Info.Id',
    // label: 'Info.Name',
    // labelFormat:(item) => item.Code + " " + item.Name,

    placeholder: "Chưa được chọn",
  }),
  fixed_asset_group_Get_List: new SelectOption({
    data: [], //API.Get_Procurement_Methods,
    // value: 'Info.Id',
    // label: 'Info.Name',
    // labelFormat:(item) => item.Code + " " + item.Name,

    placeholder: "Chưa được chọn",
  }),
  fixed_asset_state_Get_List: new SelectOption({
    data: [], //API.Get_Procurement_Methods,
    // value: 'Info.Id',
    // label: 'Info.Name',
    placeholder: "Chưa được chọn",
  }),
  producer_Get_List: new SelectOption({
    data: [], //API.Get_Procurement_Methods,
    // value: 'Info.Id',
    // label: 'Info.Name',
    placeholder: "Chưa được chọn",
  }),
  store_Get_List: new SelectOption({
    data: [], //API.Get_Procurement_Methods,
    // value: 'Info.Id',
    // label: 'Info.Name',
    placeholder: "Chưa được chọn",
  }),
  Get_Type_of_Competition: new SelectOption({
    data: API.Get_Type_of_Competition,
    placeholder: "Chưa được chọn",
  }),
  Para_Account: new SelectOption({
    data: [],
    placeholder: "",
    // label: "FullName",
  }),
  Para_Account_purchasing: new SelectOption({
    data: [],
    placeholder: "Chưa được chọn",
    label: "FullName",
  }),
  Para_lang: new SelectOption({
    data: [
      { Id: 1, Name: "Tiếng Việt" },
      { Id: 2, Name: "English" },
    ],
  }),
};
