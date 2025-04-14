<template>
  <div style="height: 100%">
    <!-- <el-input
      ref="autocompleteInput"
      id="autocomplete"
      v-model="address"
      placeholder="Enter an address"
      @keydown.enter.native.prevent="handleEnter"
    /> -->
    <!-- <TablePaging ref="tp" style="height: 600px" :model="tp"> </TablePaging>
    <el-table
      ref="table1"
      :data="tableData1"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      @row-click="handleRowClick1"
      :expand-row-keys="expandedRows"
    >
      <el-table-column prop="date" label="date" sortable width="180">
      </el-table-column>
      <el-table-column prop="name" label="Name" sortable width="180">
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
import TablePaging from "~/assets/scripts/base/TablePaging";
import TablePagingCol from "~/assets/scripts/base/TablePagingCol";

export default {
  name: "AddressInput",
  data() {
    return {
      address: "",
      autocomplete: null,
      isSimulating: false,
      tp: new TablePaging({
        title: "Nhóm vật tư",
        data: [
          { id: "1", date: "2016-05-02", name: "wangxiaohu" },
          { id: "2", date: "2016-05-04", name: "wangxiaohu" },
          {
            id: "3",
            date: "2016-05-01",
            name: "wangxiaohu",
            children: [
              { id: "31", date: "2016-05-01", name: "wangxiaohu" },
              { id: "32", date: "2016-05-01", name: "wangxiaohu" },
            ],
          },
          { id: "4", date: "2016-05-03", name: "wangxiaohu" },
        ],
        treeprops: {
          children: "children",
        },
        keyId: "id",
        expandAll: false,
        clickRow: (row) => {
          this.handleRowClick(row);
        },
        expandRowKeys: [],
        disableSelectRow: true,
        cols: [
          // new TablePagingCol({ title: "Stt", data: "SttTP", min_width: 60 }),
          new TablePagingCol({
            title: "date",
            data: "date",
            min_width: 150,
            class: "codeClas",
          }),
          new TablePagingCol({
            title: "name",
            data: "name",
            min_width: 200,
          }),

          new TablePagingCol({
            title: "",
            data: "button",
            min_width: 100,
            sortable: false,
          }),
        ],
      }),

      tableData1: [
        {
          id: "1",
          date: "2016-05-02",
          name: "wangxiaohu",
        },
        {
          id: "2",
          date: "2016-05-04",
          name: "wangxiaohu",
        },
        {
          id: "3",
          date: "2016-05-01",
          name: "wangxiaohu",
          children: [
            {
              id: "31",
              date: "2016-05-01",
              name: "wangxiaohu",
            },
            {
              id: "32",
              date: "2016-05-01",
              name: "wangxiaohu",
            },
          ],
        },
        {
          id: "4",
          date: "2016-05-03",
          name: "wangxiaohu",
        },
      ],

      expandedRows: [], // Array to hold the IDs of expanded rows
    };
  },
  mounted() {
    // this.initAutocomplete();
  },
  methods: {
    handleRowClick(row) {
      const index = this.tp.expandRowKeys.indexOf(row.id);
      if (index > -1) {
        // Collapse if already expanded
        this.tp.expandRowKeys.splice(index, 1);
      } else {
        // Expand
        this.tp.expandRowKeys.push(row.id);
      }
      console.log(this.tp.expandRowKeys);
    },
    handleRowClick1(row) {
      const index = this.expandedRows.indexOf(row.id);
      if (index > -1) {
        // Collapse if already expanded
        this.expandedRows.splice(index, 1);
      } else {
        // Expand
        this.expandedRows.push(row.id);
      }
      console.log(this);
    },
    initAutocomplete() {
      // Get the actual <input> element inside el-input
      const input = this.$refs.autocompleteInput.$el.querySelector("input");

      this.autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["geocode"],
      });

      this.autocomplete.addListener("place_changed", () => {
        const place = this.autocomplete.getPlace();
        this.address = place.formatted_address || "";
        console.log("Selected place:", this.address);
      });
    },

    handleEnter() {
      if (this.isSimulating) return;

      const input = this.$refs.autocompleteInput.$el.querySelector("input");
      this.isSimulating = true;

      const downArrow = new KeyboardEvent("keydown", {
        key: "ArrowDown",
        keyCode: 40,
        which: 40,
        bubbles: true,
      });
      input.dispatchEvent(downArrow);

      this.$nextTick(() => {
        const enterKey = new KeyboardEvent("keydown", {
          key: "Enter",
          keyCode: 13,
          which: 13,
          bubbles: true,
        });
        input.dispatchEvent(enterKey);
        this.isSimulating = false;
      });
      // setTimeout(() => {

      // }, 100);
    },
  },
};
</script>
