<template>
  <Nuxt v-if="mainLoad" style="height: 100vh" />
</template>

<script>
import API from "~/assets/scripts/API";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
import MenuItem from "~/assets/scripts/objects/MenuItem";
import { Para } from "~/assets/scripts/Para";
import StoreManager from "~/assets/scripts/StoreManager";
export default {
  middleware: "auth",
  data() {
    return {
      mainLoad: false,
    };
  },

  computed: {
    loading: function () {
      return StoreManager.IsShowLoading();
    },
  },
  watch: {
    "$route.params.search": {
      handler: function (search) {
        // StoreManager.Setcurrency_code(""); //Clear code
        StoreManager.SetMenuButton([]); //Clear button menu
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    ToButton(p) {
      return new MenuItem({
        index: p.Id,
        title: !p.Stt ? p.Title : "",
        banner: p.Action,
        path: p.LiClass,
        icon: p.Icon,
      });
    },
    ToMenuItem(p) {
      return new MenuItem({
        index: p.Id,
        title: p.Title,
        path: p.Href,
        icon: p.Icon,
        image: p.Image,
        note: p.Note,
        type_id: p.Type_id,
        banner: p.LiClass || p.Title,
        children: (p.Child || []).map((p1) => this.ToMenuItem(p1)),
        permission: (p.ListButton || []).map((p1) => this.ToButton(p1)),
      });
    },
    InitMenu() {
      return new Promise((rs) => {
        GetDataAPI({
          url: API.Menu,
          action: (re) => {
            let menu = re.map((p) => this.ToMenuItem(p));
            StoreManager.store.commit("InitRawMenu", menu);
            StoreManager.InitMenu(menu);
            rs();
          },
        });
      });
    },
    InitPara() {
      return new Promise((rs) => {
        let fixed_asset_state_Get_List = new Promise((rs) => {
          GetDataAPI({
            url: API.fixed_asset_state_Get_List,
            action: (re) => {
              Para.fixed_asset_state_Get_List.data = re;
              rs();
            },
          });
        });
        let account = new Promise((rs) => {
          GetDataAPI({
            url: API.Account,
            action: (re) => {
              Para.Para_Account.data = re;

              rs();
            },
          });
        });
        Promise.all([
          fixed_asset_state_Get_List,
          // account,
        ]).then((result) => {
          rs();
        });
      });
    },
    InitStuff() {
      return new Promise((rs) => {
        GetDataAPI({
          method: "post",
          url: API.GetUserInfo,
          action: (re) => {
            StoreManager.SetUser(re);
            Promise.all([this.InitMenu(), this.InitPara()]).then((result) => {
              rs();
            });
          },
        });
      });
    },
  },
  mounted() {
    // console.log("default", this);
    if (location.href.indexOf("localhost") == -1) {
      console.log = () => {};
      console.error = () => {};
    }
    this.InitStuff().then(() => {
      this.mainLoad = true;
    });

    console.log(this);
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/variable.scss";
.main-content-g {
  display: flex;
  > .main-content {
    flex: 1;
    overflow: hidden;
    height: calc(100vh);
    display: flex;
    flex-direction: column;
    .main-content-c {
      flex: 1;
      overflow: auto; // padding: 10px;
      background: $bg_color;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 2px 0px,
        rgba(0, 0, 0, 0.14) 0px 2px 4px 0px;
    }
  }
}
</style>
