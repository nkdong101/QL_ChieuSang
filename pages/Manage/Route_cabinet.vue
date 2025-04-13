<template>
  <div style="height: 100%">
    <TablePaging ref="tp" :model="tp">
      <template slot="column-header-button">
        <el-button class="icon-btn icon-btn" type="primary" @click="Add()">
          <i class="el-icon-plus"></i
        ></el-button>
      </template>
      <template slot="column-content-button" slot-scope="{ row }">
        <div style="display: flex">
          <el-button class="icon-btn" type="primary" @click="Edit(row)">
            <i class="el-icon-edit"></i
          ></el-button>
          <el-button class="icon-btn" type="danger" @click="Delete(row)">
            <i class="el-icon-delete"></i>
          </el-button>
        </div>
      </template>
    </TablePaging>

    <DefaultForm :model="form" @actionOK="form.Save.call(this)">
      <div slot="content">
        <FormInfo ref="form" :model="form.obj.form()" />
      </div>
    </DefaultForm>
  </div>
</template>

<script>
import API from "~/assets/scripts/API";
import TablePaging from "~/assets/scripts/base/TablePaging";
import TablePagingCol from "~/assets/scripts/base/TablePagingCol";
import DefaultForm from "~/assets/scripts/base/DefaultForm";
import Route_cabinet from "~/assets/scripts/objects/Route_cabinet";
import { EventBus } from "~/assets/scripts/EventBus.js";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
import {
  MessageType,
  ShowConfirm,
  ShowMessage,
} from "~/assets/scripts/Functions";
import { Para } from "~/assets/scripts/Para";
import APIHelper from "~/assets/scripts/API/APIHelper";
export default {
  data() {
    return {
      isAdd: null,
      tp: new TablePaging({
        title: "Tủ chiếu sáng",
        data: API.Route_cabinet_GetList,

        cols: [
          new TablePagingCol({ title: "Stt", data: "SttTP", min_width: 60 }),
          new TablePagingCol({
            title: "Mã tủ",
            data: "Code",
            min_width: 130,
          }),
          new TablePagingCol({
            title: "Tên tủ",
            data: "Name",
            min_width: 200,
          }),
          new TablePagingCol({
            title: "Địa chỉ lắp đặt",
            data: "Address",
            min_width: 200,
          }),

          new TablePagingCol({
            title: "Hình thức đặt tủ",
            data: "Box_Type",
            min_width: 150,

            formatter: (value) => Para.Box_Type.getName(value),
          }),
          new TablePagingCol({
            title: "Cách điều khiển",
            data: "Box_Control",
            min_width: 150,

            formatter: (value) => Para.Box_Control.getName(value),
          }),
          new TablePagingCol({
            title: "Móng tủ (D x R x C)",
            data: "Cabinet_D",
            min_width: 150,

            formatter: (value, row) => {
              return `${row.Cabinet_D} x ${row.Cabinet_R} x ${row.Cabinet_C}`;
            },
          }),
          new TablePagingCol({
            title: "Số nhánh cáp",
            data: "Cable_branch",
            min_width: 150,
            formatter: "number",
            align: "left",
          }),
          new TablePagingCol({
            title: "Nhóm tủ",
            data: "Lighting_Group_Id",
            min_width: 150,
            formatter: "number",
            align: "left",
          }),
          new TablePagingCol({
            title: "Số nhánh cáp",
            data: "Construction_id",
            min_width: 150,
            formatter: "number",
            align: "left",
          }),
          new TablePagingCol({
            title: "Ngày thi công",
            data: "DateActive",
            min_width: 150,
            formatter: "date",
          }),
          new TablePagingCol({
            title: "Ngày hết bảo hành",
            data: "Date_Warranty",
            min_width: 150,
            formatter: "date",
          }),
          new TablePagingCol({
            title: "Mã dự án",
            data: "Project_Code",
            min_width: 150,
          }),
          new TablePagingCol({
            title: "Mô tả",
            data: "Description",
            min_width: 250,
          }),
          new TablePagingCol({
            title: "",
            data: "button",
            min_width: 100,
            sortable: false,
            fix: "right",
          }),
        ],
      }),
      form: new DefaultForm({
        obj: new Route_cabinet(),
        title: "",
        visible: false,
        width: "1100px",
        ShowForm: (title, isAdd, obj) => {
          this.isAdd = isAdd;
          var _app = this;
          // var obj = null;
          // if (!isAdd) {
          //   obj = obj;
          //   if (!obj) {
          //     ShowMessage("You need choose 1 selection!");
          //     return;
          //   }
          // }
          this.form.title = title;
          this.form.obj = new Route_cabinet(obj);
          this.form.visible = true;
        },
        Save: () => {
          this.Save();
        },
      }),
    };
  },
  methods: {
    LoadData() {
      this.$refs.tp.LoadData(true);
    },
    Add() {
      this.form.ShowForm("Thêm tủ chiếu sáng", true);
    },
    Edit(row) {
      this.form.ShowForm("Sửa tủ chiếu sáng", false, row);
    },
    Delete(row) {
      ShowConfirm({
        message: "Xóa [" + row.Name + "]",
        title: "Xác nhận!",
        type: MessageType.warning,
      })
        .then(() => {
          GetDataAPI({
            method: "post",
            url: API.Route_cabinet_Delete,
            params: row,
            action: (re) => {
              if (re == "OK") {
                this.LoadData();
                ShowMessage("Xóa thành công");
              } else {
                ShowMessage(re);
              }
            },
          });
        })
        .catch((err) => {
          // An error occurred
        });
    },
    Save() {
      var _app = this;
      this.$refs.form.getValidate().then((re) => {
        if (!re) {
          ShowMessage("Vui lòng nhập đầy đủ thông tin!", MessageType.error);
          return;
        } else {
          let api = this.form.obj.Id
            ? API.Route_cabinet_Edit
            : API.Route_cabinet_Add;
          GetDataAPI({
            method: "post",
            url: api,
            params: this.form.obj.toJSON(),
            action: function (re) {
              _app.LoadData();
              _app.form.visible = false;
              ShowMessage("Lưu thành công");
            },
          });
        }
      });
    },
  },

  mounted() {
    console.log(this.pagePermission);
  },
};
</script>

<style lang="scss" scoped></style>
