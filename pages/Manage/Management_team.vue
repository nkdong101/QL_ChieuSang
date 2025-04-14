<template>
  <div style="height: 100%">
    <TablePaging ref="tp" :model="tp">
      <template slot="column-header-button">
        <el-button
          class="icon-btn icon-btn"
          v-if="pagePermission.add"
          type="primary"
          @click="Add()"
        >
          <i class="el-icon-plus"></i
        ></el-button>
      </template>
      <template slot="column-content-button" slot-scope="{ row }">
        <div style="display: flex">
          <el-button
            v-if="pagePermission.edit"
            class="icon-btn"
            type="primary"
            @click="Edit(row)"
          >
            <i class="el-icon-edit"></i
          ></el-button>
          <el-button
            v-if="pagePermission.delete"
            class="icon-btn"
            type="danger"
            @click="Delete(row)"
          >
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
import Management_team from "~/assets/scripts/objects/Management_team";

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
        title: "loại đèn",
        data: API.Management_team_GetList,

        cols: [
          new TablePagingCol({ title: "Stt", data: "SttTP", min_width: 60 }),

          new TablePagingCol({
            title: "Tên đội quản lý",
            data: "Name",
            min_width: 200,
          }),
          new TablePagingCol({
            title: "Người quản lý",
            data: "Manager_id",
            min_width: 150,
          }),
          new TablePagingCol({
            title: "Địa chỉ liên hệ",
            data: "Address",
            min_width: 200,
          }),
          new TablePagingCol({
            title: "Mô tả",
            data: "Description",
            min_width: 150,
            width: "auto",
          }),

          new TablePagingCol({
            title: "",
            data: "button",
            min_width: 100,
            sortable: false,
          }),
        ],
      }),
      form: new DefaultForm({
        obj: new Management_team(),
        title: "",
        visible: false,
        width: "500px",
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
          this.form.obj = new Management_team(obj);
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
      this.form.ShowForm("Thêm đội quản lý", true);
    },
    Edit(row) {
      this.form.ShowForm("Sửa đội quản lý", false, row);
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
            url: API.Management_team_Delete,
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
            ? API.Management_team_Edit
            : API.Management_team_Add;
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
