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
import User from "~/assets/scripts/objects/User";
import { EventBus } from "~/assets/scripts/EventBus.js";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
import {
  MessageType,
  ShowConfirm,
  ShowMessage,
} from "~/assets/scripts/Functions";
import { Para } from "~/assets/scripts/Para";
export default {
  data() {
    return {
      isAdd: null,
      tp: new TablePaging({
        title: "Tiêu đề",
        data: API.Account_GetList,

        disableSelectRow: true,

        cols: [
          new TablePagingCol({ title: "STT", data: "SttTP", min_width: 65 }),
          new TablePagingCol({
            title: "Id",
            data: "Id",
            min_width: 150,
          }),
          new TablePagingCol({
            title: "Họ tên",
            data: "Name",
            min_width: 200,
          }),
          new TablePagingCol({
            title: "Đội quản lý",
            data: "Management_team_id",
            min_width: 120,
            formatter: (value) => Para.dm_Management_team.getName(value),
          }),
          new TablePagingCol({
            title: "Ngày sinh",
            data: "Birthday",
            min_width: 120,
            formatter: "date",
            width: "auto",
          }),

          new TablePagingCol({
            title: "Số điện thoại",
            data: "Phone",
            min_width: 150,
          }),
          new TablePagingCol({
            title: "Địa chỉ",
            data: "Address",
            min_width: 250,
          }),
          new TablePagingCol({
            title: "Email",
            data: "Email",
            min_width: 120,
          }),

          new TablePagingCol({
            title: "Trạng thái",
            data: "Status",
            min_width: 120,
            formatter: (value) => Para.Para_UserStatus.getName(value),
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
        obj: new User(),
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
          this.form.obj = new User({
            ...obj,
            isEdit: !isAdd,
          });
          this.form.visible = true;
        },
        Save: () => {
          this.Save();
        },
      }),
    };
  },

  watch: {},
  methods: {
    LoadData() {
      this.$refs.tp.LoadData(true);
    },
    Add() {
      this.form.ShowForm("Thêm người dùng", true);
    },
    Edit(row) {
      this.form.ShowForm("Thêm người dùng", false, row);
    },
    Delete(row) {
      ShowConfirm({
        message: "Xác nhận xóa tài khoản [" + row.FullName + "]",
        title: "Xác nhận!",
        type: MessageType.warning,
      })
        .then(() => {
          // GetDataAPI({
          //   method: "delete",
          //   url: API.Account + "/" + row.Id,
          //   params: row,
          //   action: (re) => {
          //     if (re == "OK") {
          //       this.LoadData();
          //       ShowMessage("Xóa thành công");
          //     } else {
          //       ShowMessage(re);
          //     }
          //   },
          // });
          let obj = { ...row };
          obj.UserStatus = 3;
          // console.log(obj);
          // return;
          GetDataAPI({
            method: "put",
            url: API.Account + "/" + obj.Id,
            params: obj,
            action: (re) => {
              if (re == "OK" || Number.isInteger(+re)) {
                this.LoadData();
                this.form.visible = false;
                ShowMessage("Lưu thành công");
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
          GetDataAPI({
            method: this.isAdd ? "post" : "put",
            url: this.isAdd
              ? API.Account
              : API.Account + "/" + this.form.obj.Id,
            params: this.form.obj.toJSON(),
            action: (re) => {
              if (re == "OK" || Number.isInteger(+re)) {
                this.LoadData();
                this.form.visible = false;
                ShowMessage("Lưu thành công");
              } else {
                ShowMessage(re);
              }
            },
          });
        }
      });
    },
  },

  mounted() {
    // console.log(this.pagePermission);
  },
};
</script>

<style lang="scss" scoped></style>
