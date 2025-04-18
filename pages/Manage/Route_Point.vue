<template>
  <div style="height: 100%">
    <TablePaging ref="tp" :model="tp">
      <template slot="btn">
        <el-button
          style="
            height: 25px;
            width: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 5px;
          "
          @click="showFilter()"
        >
          <i class="fa fa-filter"></i>
        </el-button>
      </template>
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
    <DefaultForm :model="formFilter" @actionOK="Search()">
      <div style="overflow: hidden" slot="content">
        <FormInfo ref="formFilter" :model="tp.params.form()" />
      </div>
    </DefaultForm>
  </div>
</template>

<script>
import API from "~/assets/scripts/API";
import TablePaging from "~/assets/scripts/base/TablePaging";
import TablePagingCol from "~/assets/scripts/base/TablePagingCol";
import DefaultForm from "~/assets/scripts/base/DefaultForm";
import Route_Point from "~/assets/scripts/objects/Route_Point";
import Route_Point_Filter from "~/assets/scripts/objects/Route_Point_Filter";
import { EventBus } from "~/assets/scripts/EventBus.js";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
import {
  MessageType,
  ShowConfirm,
  ShowMessage,
} from "~/assets/scripts/Functions";

export default {
  data() {
    return {
      formFilter: new DefaultForm({
        OKtext: "Tìm kiếm",
        // visible: true,
        // type: "dialog",
        width: "400px",
        title: "Lọc dữ liệu",
      }),
      isAdd: null,
      tp: new TablePaging({
        title: "Điểm sáng (Cột đèn)",
        data: API.Route_Point_GetList,
        params: new Route_Point_Filter(),
        cols: [
          new TablePagingCol({ title: "Stt", data: "SttTP", min_width: 60 }),
          new TablePagingCol({ title: "Mã", data: "Code", min_width: 100 }),
          new TablePagingCol({
            title: "Cao",
            data: "Height",
            min_width: 120,
          }),
          new TablePagingCol({
            title: "Loại cột",
            data: "Column_Type_id",
            min_width: 150,
          }),
          new TablePagingCol({
            title: "Địa chỉ",
            data: "Address",
            min_width: 120,
            width: "auto",
          }),

          // new TablePagingCol({
          //   title: "Use",
          //   data: "Use",
          //   min_width: 120,
          //   formatter: (value) => Para.Para_Active.getName(value),
          // }),

          new TablePagingCol({
            title: "Hãng sản xuất",
            data: "Hangsx_id",
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
        obj: new Route_Point(),
        title: "",
        visible: false,
        width: "800px",
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
          this.form.obj = new Route_Point(obj);
          this.form.visible = true;
        },
        Save: () => {
          this.Save();
        },
      }),
    };
  },
  methods: {
    Search() {
      this.LoadData();
      this.formFilter.visible = false;
    },
    showFilter() {
      this.formFilter.visible = true;
    },
    LoadData() {
      this.$refs.tp.LoadData(true);
    },
    Add() {
      this.form.ShowForm("Thêm điểm sáng", true);
    },
    Edit(row) {
      this.form.ShowForm("Sửa điểm sáng", false, row);
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
            url: API.Route_Point_Delete,
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
            ? API.Route_Point_Edit
            : API.Route_Point_Add;
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

<style lang="scss" scoped></style>
