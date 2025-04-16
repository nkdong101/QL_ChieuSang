<template>
  <div style="height: 100%">
    <TablePaging ref="tp" :model="tp">
      <template slot="btn2">
        <InputContainer
          :label="'Tử chiếu sáng'"
          style="width: 400px"
          :labelWidth="120"
        >
          <InputSelect
            :model="Para.dm_Route_cabinet"
            v-model.lazy="tp.params.iRoute_Cabinet_id"
          />
        </InputContainer>
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
  </div>
</template>

<script>
import API from "~/assets/scripts/API";
import TablePaging from "~/assets/scripts/base/TablePaging";
import TablePagingCol from "~/assets/scripts/base/TablePagingCol";
import DefaultForm from "~/assets/scripts/base/DefaultForm";
import Route_Cable from "~/assets/scripts/objects/Route_Cable";
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
        title: "Điểm sáng (Cột đèn)",
        data: API.Route_Cable_GetList,
        params: {
          iRoute_Cabinet_id: "",
        },
        cols: [
          new TablePagingCol({ title: "Stt", data: "SttTP", min_width: 60 }),
          new TablePagingCol({
            title: "Mã đoạn cáp",
            data: "Code",
            width: "auto",
            min_width: 120,
          }),
          new TablePagingCol({
            width: "auto",
            title: "Tên đoạn cáp",
            data: "Name",
            min_width: 120,
          }),
          new TablePagingCol({
            title: "Tử điều khiển",
            data: "Route_cabinet_id",
            min_width: 150,
            formatter: (value) => Para.dm_Route_cabinet.getName(value),
          }),
          new TablePagingCol({
            title: "Nhánh cáp",
            data: "Nhanh_cap",
            min_width: 120,
            width: "auto",
          }),
          new TablePagingCol({
            title: "Hình thức lắp",
            data: "Form_id",
            width: "auto",
            min_width: 120,
            formatter: (value) => Para.Cable_form.getName(value),
          }),
          new TablePagingCol({
            title: "Loại cáp",
            width: "auto",
            data: "Cable_type_id",
            min_width: 120,
            formatter: (value) => Para.dm_Cable_type.getName(value),
          }),
          new TablePagingCol({
            title: "Chiều dài",
            data: "Distance",
            width: "auto",
            min_width: 120,
          }),
          new TablePagingCol({
            title: "Ngày lắp đặt",
            width: "auto",
            data: "DateActive",
            min_width: 120,
            formatter: "date",
          }),
          new TablePagingCol({
            title: "Ngày lắp đặt",
            data: "DateActive",
            width: "auto",
            min_width: 120,
            formatter: "date",
          }),

          // new TablePagingCol({
          //   title: "Use",
          //   data: "Use",
          //   min_width: 120,
          //   formatter: (value) => Para.Para_Active.getName(value),
          // }),

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
        obj: new Route_Cable(),
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
          this.form.obj = new Route_Cable(obj);
          this.form.visible = true;
        },
        Save: () => {
          this.Save();
        },
      }),
    };
  },
  watch: {
    "tp.params.iRoute_Cabinet_id": function (newVal, oldVal) {
      this.$nextTick(() => {
        if (newVal != oldVal) {
          this.LoadData();
        }
      });
    },
  },
  methods: {
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
            url: API.Route_Cable_Delete,
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
            ? API.Route_Cable_Edit
            : API.Route_Cable_Add;
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
