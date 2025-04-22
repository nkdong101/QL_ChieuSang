<template>
  <div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
    >
    </el-tree>
  </div>
</template>

<script>
import API from "~/assets/scripts/API";
import GetDataAPI from "~/assets/scripts/GetDataAPI";

export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "Routes",
        label: "Name",
      },
    };
  },
  methods: {
    // changeData(re) {
    //   return re.map((p) => {
    //     return {
    //       ...p,
    //       Name: p.Commune_Name,
    //     };
    //   });
    // },
  },

  mounted() {
    //console.log(this.pagePermission);
    GetDataAPI({
      url: API.Get_Cabinet_Tree,
      action: (re) => {
        console.log(re);
        this.data = re.map((p) => {
          return {
            ...p,
            Name: p.Commune_Name,
          };
        });
      },
    });
  },
};
</script>

<style scoped lang="scss"></style>
