<template>
  <div class="main-content">
    <!-- <div class="main-header" v-if="model.title">
      <span>{{ model.title }}</span>
      <span>{{
        model.title == "menu"
          ? currentMenu.LiClass || currentMenu.Title
          : model.title
      }}</span>

    </div> -->
    <!-- {{ currentMenu }} -->
    <!-- <div v-if="!model.disableControl" class="main-control">
      <div class="main-input-control">
        <slot name="btn" v-bind:tempRows="tempRows">
          <FormContainer
            v-if="model.control"
            :model="formControl"
          ></FormContainer>
        </slot>
      </div>
      <div class="main-control-search" v-if="!model.noFilter">
        <el-input
          v-model="iSearchInfo"
          placeholder="Tìm kiếm..."
          :clearable="true"
          @change="SearchData()"
        ></el-input>
      </div>
    </div> -->
    <div class="table-controls-c">
      <slot name="filter" v-bind:tempRows="tempRows"> </slot>
    </div>
    <div v-if="model.disablePaging != true" class="paging-control">
      <div class="paging-size">
        <div class="main-control-search" v-if="!model.noFilter">
          <el-input
            v-model="iSearchInfo"
            placeholder="Tìm kiếm..."
            :clearable="true"
            @change="SearchData()"
          ></el-input>
        </div>
        <slot name="btn" v-bind:tempRows="tempRows"> </slot>
        <span
          v-if="pagingShowOpt.summary"
          v-html="GetPagingDetail()"
          style="padding-left: 5px"
        ></span>

        <slot name="btn2" v-bind:tempRows="tempRows"> </slot>
      </div>
      <div class="paging-page">
        <span v-if="pagingShowOpt.recordOfPage">Hiển thị</span>
        <el-pagination
          v-if="pagingShowOpt.recordOfPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="curentPage"
          :page-sizes="[10, 50, 100, 200, 400]"
          :page-size="params.iRecordOfPage"
          layout="sizes"
          :total="totalRecord"
        ></el-pagination>
        <el-pagination
          :hide-on-single-page="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="curentPage"
          :page-sizes="[10, 50, 100, 200, 400]"
          :page-size="params.iRecordOfPage"
          layout="prev, pager, next"
          :total="totalRecord"
        ></el-pagination>
        <!-- <el-link
          class="btn-export"
          :underline="false"
          icon="fa fa-download"
          style="padding: 10px"
          @click.native="ExportExcel()"
        >
        </el-link> -->

        <slot  v-if="model.ExportCustome" name="ExportCustome" v-bind:tempRows="tempRows"> </slot>

        <el-popover
          popper-class="export-popper"
          placement="left"
          width="70"
          trigger="click"
          v-model="poperExport"
        >
          <div style="display: flex; flex-direction: column; gap: 5px">
            <el-button
              @click.native="ExportExcel()"
              style="
                background-color: #217346;
                color: white;
                border-radius: 5px;
              "
              ><i class="fa fa-file-excel-o" aria-hidden="true"></i
            ></el-button>
            <el-button
              @click="ExportPdf()"
              style="
                margin: 0;
                background-color: #ff0000;
                color: white;
                border-radius: 5px;
              "
              ><i class="fa fa-file-pdf-o" aria-hidden="true"></i
            ></el-button>
            <el-button
              @click="ExportWord()"
              style="
                margin: 0;
                background-color: rgb(77 134 219);
                color: white;
                border-radius: 5px;
              "
              ><i class="fa fa-file-word-o" aria-hidden="true"></i
            ></el-button>
          </div>

          <el-button
            v-if="!model.ExportCustome"
            class="btn-export"
            type="default"
            slot="reference"
            icon="fa fa-download"
          ></el-button>
        </el-popover>
      </div>
    </div>
    <div class="main-table" style="display: flex; align-items: flex-start">
      <el-table
        v-if="isVisible"
        :empty-text="
          isLoading ? 'loading...' : model.emptyText ?? 'Không có dữ liệu.'
        "
        ref="tpRef"
        :data="tableData"
        :row-key="model.keyId"
        style="width: 100%; height: 100%"
        :height="model.disableFixedHead ? undefined : '100%'"
        header-row-class-name="table-header"
        highlight-current-row
        :stripe="model.rowStripe"
        border
        :show-summary="model.handleSumary != undefined"
        :summary-method="model.handleSumary"
        :show-header="model.showHeader"
        @current-change="handleCurrentRowChange"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDBClick"
        @sort-change="handleSortChange"
        :default-expand-all="model.expandAll"
        :span-method="model.spanMethod"
        :row-class-name="model.tableRowClassName"
        :tree-props="model.treeprops"
      >
        <template v-for="col in model.cols.filter((p) => p)">
          <TablePagingCol
            v-bind:key="col.Index"
            :col="col"
            v-if="allChild(col)"
          >
            <template
              v-for="item in allChild(col)"
              :slot="'column-header-' + item"
              slot-scope="scope"
            >
              <slot
                :name="'column-header-' + item"
                v-bind:column="scope.column"
                v-bind:col="scope.col"
              >
              </slot>
            </template>

            <template
              v-for="item in allChild(col)"
              :slot="'column-content-' + item"
              slot-scope="scope"
            >
              <slot
                :name="'column-content-' + item"
                v-bind:row="scope.row"
                v-bind:column="scope.column"
                v-bind:index="scope.index"
              ></slot>
            </template>
          </TablePagingCol>
          <TablePagingCol v-bind:key="col.Index" :col="col" v-else>
            <slot
              :slot="'column-header-' + col.data"
              slot-scope="scope"
              :name="'column-header-' + col.data"
              v-bind:column="scope.column"
            ></slot>
            <slot
              :slot="'column-content-' + col.data"
              slot-scope="scope"
              :name="'column-content-' + col.data"
              v-bind:row="scope.row"
              v-bind:column="scope.column"
              v-bind:index="scope.index"
            ></slot>
          </TablePagingCol>
        </template>
      </el-table>
    </div>
    <div v-if="model.sumary" class="sumary-c">
      <div
        v-for="item in model.sumary(rawData)"
        :key="item.label"
        class="sumary-c-item"
      >
        <div class="sumary-c-item-label">{{ item.label }}</div>
        <div class="sumary-c-item-value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import GetDataAPI from "@/assets/scripts/GetDataAPI";
import FormContainer from "~/assets/scripts/base/FormContainer";
import {
  Compare,
  concatDeep,
  MessageType,
  objContainStr,
  resolve,
  s2ab,
  SearchTree,
  sheet_from_array_of_arrays,
  ShowMessage,
  Uni2None,
  Workbook,
} from "@/assets/scripts/Functions";
import StoreManager from "~/assets/scripts/StoreManager";
import {
  Document,
  Packer,
  Table,
  TableCell,
  TableRow,
  Paragraph,
  TextRun,
  AlignmentType,
  FrameAnchorType,
  HorizontalPositionAlign,
  PageOrientation,
  WidthType,
} from "docx";

import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { font } from "~/static/scripts/arial_font";
import ConvertStr from "~/assets/scripts/ConvertStr";

export default {
  name: "TablePaging",
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      poperExport: false,
      iSearchInfo: "",
      tmpData: ["Name", "xxx", "yyy"],
      isVisible: true,
      tempRows: [],
      isLoading: false,
      totalPage: 0,
      curentPage: 1,
      pagingShowOpt: {
        ...{
          summary: true,
          recordOfPage: true,
        },
        ...this.model.pagingShowOpt,
      },
      params: {
        iRecordOfPage: 50,
        iPage: 0,
        sortOrder: "",
        sortProp: "",
        ...this.model.params,
        iSearchInfo: "",
      },
      // sortOrder: "",
      // sortProp: "",
      isPagingServer: false,
      selectedRow: null,
      formControl: new FormContainer(),
      totalRecord: 0,
    };
  },
  watch: {
    iSearchInfo() {
      if (this.model.params) this.model.params.iSearchInfo = this.iSearchInfo;
    },
    "model.params": {
      deep: true,
      handler() {
        Object.keys(this.model.params).forEach((p) => {
          this.params[p] = this.model.params[p];
        });
        // this.params = { ...this.params, ...this.model.params };
      },
    },
    "model.cols": function () {
      let _app = this;
      _app.isVisible = false;
      this.$nextTick(function () {
        _app.isVisible = true;
      });
    },
    // "model.data": {
    //   deep: true,
    //   handler() {
    //     let _app = this;
    //     _app.isVisible = false;
    //     this.$nextTick(function() {
    //       _app.isVisible = true;
    //     });
    //   }
    // }
  },
  computed: {
    currentMenu() {
      let feature = this.$route.path;
      let find = SearchTree(StoreManager.store.state.rawMenu, feature, "path");
      return find || {};
    },
    /**
     * @return {Array} description
     */
    rawData() {
      let rows = [];
      if (this.isPagingServer) {
        rows = this.tempRows;
      } else {
        rows = this.tempRows.filter(
          (re) =>
            !this.params.iSearchInfo
              ? true
              : this.GetValueDisplay(re).some((p) =>
                  objContainStr(
                    p,
                    Uni2None(this.params.iSearchInfo || ""),
                    this.model.isSearchEqual
                  )
                )
          //    JSON.stringify(re)
          //   .toUpperCase()
          //   .indexOf(this.params.iSearchInfo.toUpperCase()) > -1
        );
        this.totalRecord = rows.length;
        rows.sort(this.sortHandle);
        rows.forEach((item, index) => {
          item.SttTP = index + 1;
        });
      }

      return rows;
    },
    /**
     * @return {Array} description
     */
    tableData() {
      let data = this.rawData;
      if (this.isPagingServer) {
        return data;
      } else {
        if (this.model.disablePaging) return data;
        return data.filter(
          (re) =>
            data.indexOf(re) >=
              (this.curentPage - 1) * this.params.iRecordOfPage &&
            data.indexOf(re) < this.curentPage * this.params.iRecordOfPage
        );
      }
    },

    // totalRecord: function() {
    //   return this.totalPage * this.params.iRecordOfPage;
    // }
  },
  methods: {
    GetValueDisplay(obj) {
      let str = this.model.cols.map((p) => {
        // if(p.data == 'Manager'){
        //   console.log(p.formatter(obj[p.data], obj));
        // }
        if (typeof p.formatter == "function") {
          return Uni2None(
            JSON.stringify(p.formatter(obj[p.data], obj) || "").replace(
              /(<([^>]+)>)/gi,
              ""
            )
          );
        }

        return Uni2None(
          JSON.stringify(obj[p.data] || "").replace(/(<([^>]+)>)/gi, "")
        );
      });
      // console.log(str);
      return str;
    },
    GetPagingDetail() {
      let tu = (this.curentPage - 1) * this.params.iRecordOfPage + 1;
      let den =
        (this.curentPage - 1) * this.params.iRecordOfPage +
        this.params.iRecordOfPage;
      return `Xem từ <b>${tu}</b> đến <b>${
        den > this.totalRecord ? this.totalRecord : den
      }</b> trong <b>${this.totalRecord}</b> bản ghi`;
    },
    allChild(col) {
      if (col.GetAllChild) return col.GetAllChild();
      return null;
    },
    tmp(e) {
      //   //console.log(e);
    },

    ExportExcel: function (opt) {
      var _app = this;
      opt = opt || {};
      this.poperExport = false;
      if (this.model.ExportConfig) this.model.ExportConfig(opt);
      new Promise(function (rs, rj) {
        if (opt.data) rs(opt.data);
        else {
          if (_app.isPagingServer) {
            GetDataAPI({
              url: _app.model.data,
              params: {
                ..._app.params,
                iRecordOfPage: 50000,
              },
              action: (re) => {
                if (_app.model.LoadDataSuccess) {
                  _app.model.LoadDataSuccess(re);
                }
                re.Data.forEach((item, index) => {
                  item.SttBase =
                    (_app.curentPage - 1) * _app.params.iRecordOfPage +
                    index +
                    1;
                  item.SttTP =
                    (_app.curentPage - 1) * _app.params.iRecordOfPage +
                    index +
                    1;
                });
                rs(re.Data);
              },
            });
          } else rs(_app.rawData);
        }
      }).then(function (data) {
        if (!opt.data) opt.data = data;

        if (opt.ReloadData) {
          opt.data = opt.ReloadData(opt.data);
        }

        if (!opt.header) opt.header = _app.model.cols;
        let cols = [];

        function ReRenderHeader(data, rowIndex, baseIndex) {
          let totalCols = 0;
          cols[rowIndex] = cols[rowIndex] || [];
          let baseX = baseIndex;
          data.forEach(function (obj) {
            let i = baseIndex;

            let p = {
              title: obj.title,
              data: obj.data,
              min_width: obj.min_width,
              row_span: 0,

              startIndex: i,
              index: 0, //obj.children.length ? 0 : baseIndex,
              formatter: obj.formatter,
              exporter: obj.exporter,
            };

            if ((obj.children || []).length) {
              let totalColReturn = ReRenderHeader(
                obj.children,
                rowIndex + 1,
                i
              );

              p.col_span = totalColReturn;
              p.row_span = 1;
              totalCols += totalColReturn;
              baseIndex += totalColReturn;
            } else {
              totalCols += 1;
              baseIndex += 1;
              p.index = baseIndex;
            }
            cols[rowIndex].push(p);
          });

          return totalCols;
        }
        // function ReRenderHeader(data, rowIndex, parent) {
        //   let i = parent.startIndex;

        //   if (!cols[rowIndex]) cols[rowIndex] = [];
        //   let nextRowIndex = rowIndex + 1;
        //   data.forEach(function (p) {
        //     let index = 0;
        //     if (rowIndex === 0) {
        //       startIndex += p.children.length ? p.children.length : 1;
        //       index = startIndex;
        //     } else {
        //     }
        //     let obj = {
        //       data: p.data,
        //       title: p.title,
        //       min_width: p.min_width,
        //       row_span: parent ? 1 : 0,

        //       index: p.children.length ? 0 : index,
        //       startIndex: i,
        //       formatter: p.formatter,
        //     };

        //     if (p.children && p.children.length) {
        //       obj.col_span = p.children.length;
        //       obj.row_span = 1;
        //       ReRenderHeader(p.children, nextRowIndex, p);
        //     }
        //     cols[rowIndex].push(obj);
        //   });
        // }

        ReRenderHeader(opt.header, 0, 0);
        cols.forEach((p, index) => {
          p.forEach((item) => {
            if (!item.row_span) item.row_span = cols.length - index;
          });
        });
        // console.log(cols);
        var title =
          _app.model.title ||
          opt.title ||
          "Danh sách " + (_app.currentMenu.title || "").toLowerCase() ||
          "export";
        var tD = new Date();
        var ws_name = "sheet";

        var wb = new Workbook(),
          ws = sheet_from_array_of_arrays(opt.data, cols, title);
        //.map(p => +p.style.split(';')[0].replace(/[^0-9]/g, ''))

        /* add worksheet to workbook */
        wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "binary",
        });
        // alert("OK");
        var blob = new Blob([s2ab(wbout)], {
          type: "application/octet-stream",
        });
        var dlink = document.createElement("a");
        dlink.download = `${
          _app.model.printPdf.title ||
          _app.model.title ||
          _app.currentMenu.note ||
          "file"
        }.xlsx`;
        dlink.href = window.URL.createObjectURL(blob);
        dlink.onclick = function (e) {
          // revokeObjectURL needs a delay to work properly
          var that = this;
          setTimeout(function () {
            window.URL.revokeObjectURL(that.href);
          }, 1500);
        };

        dlink.click();
        dlink.remove();
        // alert(objectURL);
        // saveAs(
        //   new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
        //   title.toLowerCase().trim().replace(/ +/g, " ").replace(/ /g, "-") +
        //     "-" +
        //     tD.getDate() +
        //     "-" +
        //     (tD.getMonth() + 1) +
        //     "-" +
        //     tD.getFullYear() +
        //     ".xlsx"
        // );
      });
    },
    ExportPdf() {
      console.log(this);
      const doc = new jsPDF();

      doc.addFileToVFS("Arial-normal.ttf", font);
      doc.addFont("Arial-normal.ttf", "Arial", "normal");
      doc.setFont("Arial");
      if (!this.model.printPdf.colPrint) {
        this.model.printPdf.colPrint = this.model.cols;
      }
      const table = this.$refs.tpRef;
      const headers = this.model.printPdf.colPrint.map((col) => col.title);

      // Extract table rows
      const rows = this.tempRows.map((row) => {
        return this.model.printPdf.colPrint.map((col) => {
          if (typeof col.formatter == "function") {
            return `${String(col.formatter(row[col.data], row) || "").replace(
              /(<([^>]+)>)/gi,
              ""
            )}`;
          } else {
            let value = String(row[col.data] || "");
            if (col.formatter && typeof col.formatter == "string") {
              switch (col.formatter) {
                case "number":
                  value = Number(value);
                  break;
                case "date":
                  value = ConvertStr.ToDateStr(value);
                  break;
                case "datetime":
                  value = ConvertStr.ToDateStr(value, "DD/MM/YYYY HH:mm");
                  break;
                case "datetimes":
                  value = ConvertStr.ToDateStr(value, "DD/MM/YYYY HH:mm:ss");
                  break;
                default:
                  break;
              }
            }
            return value;
          }
        });
      });
      doc.autoTable({
        head: [headers],
        body: rows,
        styles: { font: "Arial", fontSize: 8 }, // Reduce font size
        margin: { top: 10, left: 5, right: 5 }, // Add some margins
        tableWidth: "auto", // Auto-scale table width
      });

      doc.save(
        `${
          this.model.printPdf.title || this.model.title || this.currentMenu.note
        }`
      );
    },

    //   ExportPdf() {
    //     this.poperExport = false;
    //     console.log(this);
    //     // return;
    //     if (!this.model.printPdf.colPrint) {
    //       this.model.printPdf.colPrint = this.model.cols.slice(0, 7);
    //     }
    //     // Sample table data
    //     let renderTH = "";
    //     this.model.printPdf.colPrint.forEach((p) => {
    //       renderTH += `<th style="min-width:${p.min_width}px ;width:${
    //         p.width ? p.width + "px" : "auto"
    //       }">${p.title}</th>`;
    //     });
    //     let renderBody = ``;

    //     this.rawData.forEach((row) => {
    //       renderBody += "<tr>";
    //       // for (let i = 0; i < this.model.printPdf.colPrint.length; i++) {
    //       //   renderBody += `<td>${row[this.model.printPdf.colPrint[i].data] || ""}</td>`;
    //       // }
    //       this.model.printPdf.colPrint.forEach((p) => {
    //         if (typeof p.formatter == "function") {
    //           renderBody += `<td >${String(
    //             p.formatter(row[p.data], row) || ""
    //           ).replace(/(<([^>]+)>)/gi, "")}</td>`;
    //         } else {
    //           let value = String(row[p.data] || "");
    //           if (p.formatter && typeof p.formatter == "string") {
    //             switch (p.formatter) {
    //               case "number":
    //                 value = Number(value);
    //                 break;
    //               case "date":
    //                 value = ConvertStr.ToDateStr(value);
    //                 break;
    //               case "datetime":
    //                 value = ConvertStr.ToDateStr(value, "DD/MM/YYYY HH:mm");
    //                 break;
    //               case "datetimes":
    //                 value = ConvertStr.ToDateStr(value, "DD/MM/YYYY HH:mm:ss");
    //                 break;
    //               default:
    //                 break;
    //             }
    //           }

    //           renderBody += `<td>${value
    //             .toString()
    //             .replace(/(<([^>]+)>)/gi, "")}</td>`;
    //         }
    //       });
    //       renderBody += "</tr>";
    //     });
    //     let renderFilter = "";
    //     let filterHeader = "";
    //     if (this.model.printPdf.filter && this.model.printPdf.filter.length) {
    //       for (let i = 0; i < this.model.printPdf.filter.length; i++) {
    //         filterHeader += `
    //     <div style="flex: 1 1 250px; padding: 15px; border: 1px solid #ccc; border-radius: 8px;">
    //       <p style="font-size: 16px; font-weight: bold; margin: 0;">${this.model.printPdf.filter[i].title}</p>
    //       <p style="font-size: 14px; margin-top: 5px;">${this.model.printPdf.filter[i].value}</p>
    //     </div>
    //   `;
    //       }
    //       renderFilter = `  <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: space-between; padding: 20px; border: 1px solid #000; border-radius: 8px;">   ${filterHeader}
    //   </div>`;
    //     }

    //     const tableHTML = `
    //   <table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
    //     <thead>
    //       <tr>${renderTH}</tr>
    //     </thead>
    //     <tbody>
    //      ${renderBody}
    //     </tbody>
    //   </table>
    // `;

    //     // Open a new window
    //     const newWindow = window.open("", "_blank");

    //     // Add content to the new window
    //     newWindow.document.write(`
    //   <html>
    //     <head>
    //       <title>${this.model.printPdf.title || this.currentMenu.note}</title>
    //       <style>
    //       @media screen {
    //   body {
    //     display: none ;
    //   }
    // }
    //         body {

    //           margin: 0;
    //           padding: 10px;
    //           font-family: Arial, sans-serif;
    //         }
    //         table {
    //           margin-top: 10px;
    //           width: 100%;
    //           border: 1px solid #000;
    //           border-collapse: collapse;
    //         }
    //         th, td {
    //           border: 1px solid #000;
    //           padding: 6px;
    //           text-align: left;
    //         }
    //         th {
    //           background-color: #f2f2f2;
    //         }

    //         p{
    //         margin: 0 !important;
    //         }
    //       </style>
    //     </head>
    //     <body>
    //       <h1 style="text-align: center">${
    //         this.model.printPdf.title || this.currentMenu.note
    //       }</h1>
    //       ${renderFilter}
    //       <div class="table-content">
    //       ${tableHTML}

    //         </div>
    //     </body>
    //   </html>
    // `);

    //     // Close document stream, focus, and print
    //     newWindow.document.close();
    //     newWindow.focus();
    //     newWindow.print();
    //     newWindow.close();
    //   },

    ExportWord() {
      // const tableData = [
      //   ["Header 1", "Header 2", "Header 3"],
      //   ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
      //   ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
      // ];
      if (!this.model.printPdf.colPrint) {
        this.model.printPdf.colPrint = this.model.cols;
      }
      let tableData = [];
      this.tempRows.forEach((row) => {
        let tempRowArr = [];
        this.model.printPdf.colPrint.forEach((col) => {
          let tempRow = "";
          if (typeof col.formatter == "function") {
            tempRow += `${String(
              col.formatter(row[col.data], row) || ""
            ).replace(/(<([^>]+)>)/gi, "")}`;
          } else {
            let value = String(row[col.data] || "");
            if (col.formatter && typeof col.formatter == "string") {
              switch (col.formatter) {
                case "number":
                  value = Number(value);
                  break;
                case "date":
                  value = ConvertStr.ToDateStr(value);
                  break;
                case "datetime":
                  value = ConvertStr.ToDateStr(value, "DD/MM/YYYY HH:mm");
                  break;
                case "datetimes":
                  value = ConvertStr.ToDateStr(value, "DD/MM/YYYY HH:mm:ss");
                  break;
                default:
                  break;
              }
            }
            tempRow += `${value.toString().replace(/(<([^>]+)>)/gi, "")}`;
          }
          // if(tempRow.includes('\n')){

          // }

          tempRowArr.push(tempRow);
        });
        tableData.push(tempRowArr);
      });

      tableData.unshift(this.model.printPdf.colPrint.map((p) => p.title));
      // console.log(tableData);

      const filterParagraphs = [];

      // Function to create a filtere
      if (this.model.printPdf.filter && this.model.printPdf.filter.length) {
        this.model.printPdf.filter.forEach((item) => {
          filterParagraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${item.title}: `,
                  bold: true,
                  size: 24,
                }),
                new TextRun({
                  text: item.value,
                  size: 24,
                }),
              ],
              spacing: {
                after: 150, // Add spacing between filters
              },
            })
          );
        });
      }
      // Function to create a styled header cell
      const createHeaderCell = (text) => {
        return new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text,
                  bold: true,
                  color: "FFFFFF", // White text

                  size: 24, // Font size in half-points (12pt)
                }),
              ],
              alignment: AlignmentType.LEFT, // Center align the text
              spacing: {
                before: 50, // Adjust this value to add space above the text
                after: 50, // Adjust this value to add space below the text
                left: 600, // Left padding
                right: 600, // Right padding
              },
            }),
          ],
          shading: {
            fill: "4F81BD", // Background color (blue)
          },
        });
      };

      const breakLine = (text) => {
        let textArr = text.split("\n");
        return textArr.map((p, i) => {
          return new TextRun({
            text: p,
            break: i > 0 ? 1 : 0,
          });
        });
      };

      // Function to create a normal table cell
      const createNormalCell = (text) => {
        return new TableCell({
          children: [
            text.includes("\n")
              ? new Paragraph({
                  children: breakLine(text),
                  alignment: AlignmentType.LEFT,
                })
              : new Paragraph({
                  text: text,
                  spacing: {
                    before: 50,
                    after: 50,
                  },
                }),
          ],
        });
      };
      // Generate table rows
      const rows = tableData.map((row, rowIndex) => {
        const cells = row.map((cell, colIndex) =>
          rowIndex === 0 ? createHeaderCell(cell) : createNormalCell(cell)
        );

        return new TableRow({
          children: cells,
        });
      });

      // Create the document
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                size: {
                  orientation: PageOrientation.LANDSCAPE,
                },
              },
            },
            children: [
              new Paragraph({
                children: [],
              }),
              ...filterParagraphs,
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: rows,
              }),
            ],
          },
        ],
      });

      // Export the document
      Packer.toBlob(doc).then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${
          this.model.printPdf.title || this.model.title || this.currentMenu.note
        }`;
        link.click();
      });
    },
    clearSelected: function () {
      // this.$refs[this.key].setCurrentRow(undefined);
    },
    handleCurrentRowChange: function (val) {
      // this.selectedRow = val;
    },
    handleSortChange({ column, prop, order }) {
      this.params.sortOrder = order;
      this.params.sortProp = prop;
      if (this.isPagingServer) {
        this.LoadData(true);
      }
      //   //console.log(column, prop, order);
    },
    handleRowDBClick: function (row, column, event) {
      if (this.model.dbClickRow) this.model.dbClickRow(row);
    },
    handleRowClick: function (row, column, event) {
      if (!this.model.disableSelectRow) {
        if (this.selectedRow == row) {
          this.$refs.tpRef.setCurrentRow(undefined);
          this.selectedRow = null;
        } else {
          this.$refs.tpRef.setCurrentRow(row);
          this.selectedRow = row;
        }
      } else {
        this.$refs.tpRef.setCurrentRow(undefined);
        this.selectedRow = null;
      }
      if (this.model.clickRow) this.model.clickRow(row, column, event);
    },
    handleSizeChange(val) {
      this.params.iRecordOfPage = val;
      this.$emit("SizeChange");
      //   this.totalPage
      if (this.isPagingServer) this.LoadData(true);
      else
        this.totalPage = Math.ceil(
          this.rawData.length / this.params.iRecordOfPage
        );
    },
    handleCurrentChange(val) {
      this.params.iPage = val - 1;
      this.$emit("CurrentChange");
      if (this.isPagingServer) this.LoadData();
    },
    SearchData: function () {
      this.params.iSearchInfo = this.iSearchInfo;
      if (this.isPagingServer) this.LoadData(true);
    },

    handleData: function (re) {
      if (this.model.LoadDataSuccess) {
        this.model.LoadDataSuccess(re);
      }

      this.$nextTick(function () {
        if (Array.isArray(re)) {
          this.isPagingServer = false;
          this.tempRows = re;

          this.curentPage = 1;
          this.totalPage = Math.ceil(
            this.rawData.length / this.params.iRecordOfPage
          );
          this.totalRecord = this.rawData.length;
        } else {
          this.isPagingServer = true;
          this.tempRows = re.Data || [];
          this.totalPage = re.TotalPage;
          this.curentPage = (re.CurentPage || 0) + 1;
          this.totalRecord = re.TotalRecord;
        }

        this.tempRows.forEach((item, index) => {
          item.SttBase =
            (this.curentPage - 1) * this.params.iRecordOfPage + index + 1;
          item.SttTP =
            (this.curentPage - 1) * this.params.iRecordOfPage + index + 1;
        });

        this.isLoading = false;
        if (this.model.Loaded)
          this.$nextTick(function () {
            this.model.Loaded();
          });
      });
    },
    LoadData: function (isReset) {
      if (this.model.Validate != undefined) {
        if (!this.model.Validate(this.params)) return;
      }

      this.isLoading = true;
      if (this.$refs.tpRef) this.$refs.tpRef.setCurrentRow(undefined);
      this.selectedRow = null;
      if (isReset) this.params.iPage = 0;

      if (typeof this.model.data == "string") {
        GetDataAPI({
          url: this.model.data,
          params: this.params,
          action: (re) => {
            this.handleData(re || []);
          },
          error: (err) => {
            ShowMessage(err, MessageType.error);
            this.handleData([]);
          },
        });
      } else if (Array.isArray(this.model.data)) {
        this.handleData(JSON.parse(JSON.stringify(this.model.data)));
      } else if (typeof this.model.data == "function") {
        this.model
          .data(this.params.toJSON ? this.params.toJSON() : this.params)
          .then((re) => {
            this.handleData(re || []);
          })
          .catch(() => {
            this.handleData([]);
          });
      } else {
        this.handleData([]);
      }
    },

    sortHandle(a, b) {
      switch (this.params.sortOrder) {
        case "ascending":
          return Compare(
            resolve(a, this.params.sortProp),
            resolve(b, this.params.sortProp)
          );
          break;
        case "descending":
          return -Compare(
            resolve(a, this.params.sortProp),
            resolve(b, this.params.sortProp)
          );
          break;
        default:
          return Compare(a.SttBase, b.SttBase);
          break;
      }
    },
  },
  mounted() {
    // console.log(this)
    this.LoadData();
    // //console.log(this.$refs[this.tpRef]);
    if (this.model.control) this.formControl = this.model.control(this.model);

    this.itv = setInterval(() => {
      this.$nextTick(() => {
        var listFixBody = document.getElementsByClassName(
          "el-table__fixed-body-wrapper"
        );
        Array.from(listFixBody).forEach((p) => {
          p.style.height = `calc(100% - ${p.style.top})`;
        });
      });
    }, 500);
  },
  beforeDestroy() {
    clearInterval(this.itv);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/variable.scss";

.main-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  ::v-deep .el-table__header-wrapper table {
    border-top: 1px solid #efefef !important;
  }
  .main-table {
    padding: 0 5px;
    flex: 1;
    overflow: hidden;
  }
  .main-header {
    flex: 0 0 37px;
    margin: 0px;
    position: relative;
    // color: #5183e8;
    background: #ffffff;
    text-transform: uppercase;
    // border-radius: 10px 0px 0px 0px;
    span {
      // font-family: Bold;
      position: absolute;
      font-weight: bold;
      font-size: 15px;
      top: 50%;
      transform: translateY(-50%);
      display: block;
      width: 100%;
      padding-right: 10px !important;
      padding-left: 5px;
    }

    + .main-control {
      .main-control-search {
        position: absolute;
        top: -33.5px;
        right: 5px;

        margin-top: 0;
      }
    }
  }
  ::v-deep .table-header {
    th {
      padding: 10px 0px;
      color: #2a4b69;
      background: #efefef;
      div.cell {
        .caret-wrapper {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  ::v-deep .el-table__row {
    td {
      padding: 10px 0px;
      cursor: pointer;
    }
  }
  ::v-deep .el-table .cell.el-tooltip {
    width: 100% !important;
    min-width: 0;
    line-height: 16px;
  }

  ::v-deep .el-table {
    th {
      &.is-sortable {
        .cell {
          padding-right: 24px;
        }
      }
      & > .cell {
        // padding-right: 24px;
        // white-space: nowrap;
      }
    }
    .el-table__footer-wrapper {
      tbody {
        td {
          background-color: #efefef;
          border-right: 1px solid #ddd;
          border-top: 1px solid #ddd;
        }
      }
      .cell {
        line-height: 16px;
      }
    }
  }
  ::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
    background: #f4f5f6;
  }
  // ::v-deep  {
  //   background-color: $swatch_1;
  //   color: white;
  // }
  ::v-deep .el-table__body tr.hover-row.el-table__row--striped.current-row > td,
  ::v-deep .el-table__body tr.hover-row.el-table__row--striped > td,
  ::v-deep .el-table__body tr.hover-row > td {
    background-color: #e2ecf8;
  }
  ::v-deep
    .el-table--striped
    .el-table__body
    tr.el-table__row--striped.current-row
    td,
  ::v-deep .el-table__body tr.current-row > td,
  .el-table__body tr.hover-row.current-row > td {
    background-color: $swatch_1;
    color: white;
  }
  ::v-deep .el-table .el-table__fixed th.is-leaf {
    border-bottom: 0px;
  }
  ::v-deep .el-table td,
  ::v-deep .el-table th.is-leaf {
    border-bottom: 1px solid #ddd;
  }
  ::v-deep .el-table--border td,
  ::v-deep .el-table--border th,
  ::v-deep
    .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    // border-right: 1px solid #ddd;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    .full-cell {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 10px;
    }
  }
  ::v-deep {
    .el-table--border .el-table__cell,
    .el-table__body-wrapper
      .el-table--border.is-scrolling-left
      ~ .el-table__fixed {
      border-right: 0;
    }
  }

  ::v-deep .el-table tr {
    &.danger-row {
      color: #f44336;
    }
  }
  ::v-deep
    .el-table--striped
    .el-table__body
    tr.danger-row.el-table__row--striped.current-row
    td,
  ::v-deep .el-table__body tr.danger-row.current-row > td {
    color: #f44336;
  }
  .main-control {
    // padding: 5px;
    display: flex;
    position: relative;
    // &:empty {
    //   padding: 0px;
    // }
    // .main-control-btn:empty {
    //   display: none;
    // }
    // &:not(.main-input-control:empty) {
    //     padding: 0;
    //     padding-top: 5px;
    // }
    .main-control-search {
      width: 200px;
      margin-left: auto;
      padding-left: 5px;

      margin-bottom: 5px;
      display: flex;
      align-items: flex-end;
    }
    ::v-deep .main-input-control {
      flex: 1;
      padding: 5px;
      &:empty {
        padding-top: 0px;
        display: none;
      }
      > div {
        @include control-container;
      }
    }
    ::v-deep .para-control {
      @include control-container;
    }
    .main-control-btn {
      flex: 1;
      overflow: hidden;
      .el-button + .el-button {
        margin-left: 0px;
      }

      .el-button--mini,
      .el-button--mini.is-round {
        padding: 7px 15px;
      }
      > div {
        @include control-container;
      }
    }
  }
  .paging-control {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    flex-wrap: wrap;

    // padding-top: 3px;
    .paging-size,
    .paging-page {
      display: flex;
      align-items: center;
      padding-left: 5px;
    }
  }
  ::v-deep .el-table.el-table--border {
    border-top: 1px solid #ddd;
  }
  ::v-deep .el-table__fixed,
  ::v-deep .el-table__fixed-right {
    height: calc(100%) !important;
    border-right: 1px solid #ddd;

    .el-table__fixed-body-wrapper {
      //   height: calc(100% - 35px) !important;
    }
  }
  ::v-deep .el-table--scrollable-x {
    .el-table__fixed,
    .el-table__fixed-right {
      height: calc(100% - 15px) !important;
    }
  }
  ::v-deep .el-table__body-wrapper.is-scrolling-left ~ .el-table__fixed,
  ::v-deep .el-table__body-wrapper.is-scrolling-none ~ .el-table__fixed,
  ::v-deep .el-table__body-wrapper.is-scrolling-none ~ .el-table__fixed-right,
  ::v-deep .el-table__body-wrapper.is-scrolling-right ~ .el-table__fixed-right {
    border-right: 0px;
  }
  ::v-deep .el-table {
    .cell {
      line-height: 20px;
      white-space: normal;
      word-break: break-word;
    }
  }
}

// .main-control {
//   padding: 5px;
//   display: flex;
//   // &:empty {
//   //   padding: 0px;
//   // }
//   // .main-control-btn:empty {
//   //   display: none;
//   // }
//   .main-control-search {
//     width: 200px;
//     margin-left: auto;
//     padding-left: 5px;
//   }

//   .main-control-btn {
//     flex: 1;
//     .el-button + .el-button {
//       margin-left: 5px;
//     }
//     .el-button--mini,
//     .el-button--mini.is-round {
//       padding: 7px 15px;
//     }
//   }
// }
.sumary-c {
  display: flex;
  padding: 0 5px;
  padding-top: 5px;
  .sumary-c-item {
    display: flex;
    align-items: center;
    font-size: 13px;
    background: #d3d3d3b3;
    border: 1px solid #ddd;
    padding: 0 5px;
    border-radius: 4px;
    .sumary-c-item-label {
      font-weight: bold;
      padding-right: 5px;
    }
    .sumary-c-item-value {
    }
  }
}

::v-deep .is-scrolling-left .el-table__empty-block {
  justify-content: flex-start;
}
// ::v-deep .is-scrolling-middle .el-table__empty-block {

//     //  justify-content:  ;

// }
::v-deep .is-scrolling-right .el-table__empty-block {
  justify-content: flex-end;
}

.btn-export {
  // padding: 5px 7px;
  border: 0 !important;
  font-size: 14px;
}

.table-controls-c {
  width: 100%;
  > div {
    width: 100%;
    padding: 0 5px;
    min-height: 33px;
    display: flex;
    align-items: center;
  }
}
@media screen and (max-width: 992px) {
}

/* On screens that are 600px wide or less, the background color is olive */
@media screen and (max-width: 600px) {
}
</style>
