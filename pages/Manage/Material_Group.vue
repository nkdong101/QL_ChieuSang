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
          <el-tooltip placement="top" content="Thêm vật tư">
            <el-button
              class="icon-btn icon-btn"
              v-if="pagePermission.add && !row.Parent_id"
              type="warning"
              @click="AddChild(row)"
            >
              <i class="fa fa-plus" aria-hidden="true"></i>
            </el-button>
          </el-tooltip>
          <el-button
            type="primary"
            v-if="pagePermission.edit"
            class="icon-btn"
            @click="Edit(row)"
          >
            <i class="el-icon-edit"></i
          ></el-button>

          <el-button
            class="icon-btn"
            v-if="pagePermission.delete"
            type="danger"
            @click="Delete(row)"
          >
            <i class="el-icon-delete"></i>
          </el-button>
        </div>
      </template>
      <template slot="column-content-Code" slot-scope="{ row, column, i }">
        <div
          @click="sss(row, column, i)"
          v-if="row.Childs?.length == 0 && !row.Parent_id"
          style="margin-left: 20px; display: flex"
        >
          {{ row.Code }}
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
import Material_Group from "~/assets/scripts/objects/MaterialGroup";

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
        title: "Nhóm vật tư",
        data: API.Material_Group_GetList,
        treeprops: {
          children: "Childs",
        },
        keyId: "Id",
        expandAll: false,
        clickRow: (row) => {
          this.clickRow(row);
        },
        expandRowKeys: [],
        disableSelectRow: true,
        cols: [
          // new TablePagingCol({ title: "Stt", data: "SttTP", min_width: 60 }),
          new TablePagingCol({
            title: "Mã vật tư",
            data: "Code",
            min_width: 150,
            class: "codeClas",
          }),
          new TablePagingCol({
            title: "Tên vật tư",
            data: "Name",
            min_width: 200,
          }),
          new TablePagingCol({
            title: "Mô tả",
            data: "Description",
            min_width: 150,
            width: "auto",
          }),

          new TablePagingCol({
            title: "Ngày tạo",
            data: "DateCreate",
            min_width: 150,
            // width: "auto",
            formatter: "date",
          }),

          new TablePagingCol({
            title: "",
            data: "button",
            min_width: 120,
            sortable: false,
          }),
        ],
      }),
      form: new DefaultForm({
        obj: new Material_Group(),
        title: "",
        visible: false,
        width: "500px",
        ShowForm: (title, isAdd, obj, isAddChild) => {
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

          if (isAddChild) {
            this.form.obj = new Material_Group({
              ...{},
              Parent_id: isAddChild ? obj.Id : null,
            });
          } else {
            this.form.obj = new Material_Group({
              ...obj,
            });
          }

          this.form.visible = true;
          console.log(this.form.obj);
        },
        Save: () => {
          this.Save();
        },
      }),
    };
  },
  methods: {
    AddChild(row) {
      this.form.ShowForm("Thêm vật tư", true, row, true);
    },
    clickRow(row) {
      // console.log(row);
      const index = this.tp.expandRowKeys.indexOf(row.Id);
      if (index > -1) {
        this.tp.expandRowKeys.splice(index, 1);
      } else {
        this.tp.expandRowKeys.push(row.Id);
      }
      console.log(this.tp.expandRowKeys);
      // this.$refs.tp.toggleRowExpansion(row);
    },

    LoadData() {
      this.$refs.tp.LoadData(true);
    },
    Add() {
      this.form.ShowForm("Thêm nhóm vật liệu", true);
    },
    Edit(row) {
      this.form.ShowForm("Sửa nhóm vật liệu", false, row);
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
            url: API.Material_Group_Delete,
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
            ? API.Material_Group_Edit
            : API.Material_Group_Add;
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
    //console.log(this.pagePermission);
  },
};
</script>

<style lang="scss" scoped>
::v-deep .codeClas {
  .cell {
    display: flex;
    align-items: center;
  }
}
</style>
