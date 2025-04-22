<template>
  <div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="Id"
      ref="tree"
      highlight-current
      :props="defaultProps"
      @node-click="nodeClick"
      @check-change="checkChange"
    >
      <!-- <template #default="{ node, data }">
        <span :class="{ 'no-checkbox': node.level === 1 }">
          {{ node.level === 2 ? data.Name : data.Commune_Name }}
        </span>
      </template> -->
    </el-tree>
  </div>
</template>

<script>
import API from "~/assets/scripts/API";
import GetDataAPI from "~/assets/scripts/GetDataAPI";

export default {
  props: {
    isCabinet: {},
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: "Routes",
        disabled: (data, node) => {
          return node.level == 1;
        },
        label: (data, node) => {
          // console.log(data, node);
          if (node.level == 2) {
            return data.Name;
          }
          return data.Commune_Name;
        },
      },
    };
  },
  methods: {
    clickNode(node, data) {
      // console.log("click", node, data);
    },
    nodeClick(data, node, refHtml) {
      // console.log(data, node);
      const tree = this.$refs.tree;
      if (node.level == 2) {
        tree.setChecked(data, !node.checked, false);
        const checkedNodes = tree.getCheckedNodes(true);
        // console.log("checkedNodes", checkedNodes);
        checkedNodes.forEach((item) => {
          if (item !== data) {
            tree.setChecked(item, false, false);
          }
        });
      }
    },
    checkChange(checkedNode, isChecked) {
      if (isChecked) {
        // console.log("checkedNode", checkedNode);
        this.$emit("checkChange", checkedNode, isChecked);
      }
    },
  },

  mounted() {
    GetDataAPI({
      url: this.isCabinet ? API.Get_Cabinet_Tree : API.Get_Route_Tree,
      action: (re) => {
        // console.log(re);
        this.data = re;
      },
    });
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-tree {
  .el-tree-node {
    // background-color: blue;
    .el-tree-node__content {
      .el-checkbox.is-disabled {
        display: none !important;
      }
    }
  }
}
</style>
