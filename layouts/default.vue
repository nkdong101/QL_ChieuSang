<template>
  <div class="main-content-g" v-if="mainLoad" v-loading="loading">
    <LeftLayout />
    <div class="main-content">
      <MenuBar />
      <div class="main-content-c">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import API from "~/assets/scripts/API";
import { ShowMessage } from "~/assets/scripts/Functions";
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
        StoreManager.Setcurrency_code(""); //Clear code
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
        action: p.Action,
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
        // let GroupPermission = new Promise((rs) => {
        //   GetDataAPI({
        //     url: API.GroupPermission,
        //     action: (re) => {
        //       Para.GroupPermission.data = re;
        //       rs();
        //     },
        //   });
        // });
        let Country = new Promise((rs) => {
          GetDataAPI({
            url: API.Country_GetList,
            action: (re) => {
              Para.dm_County.data = re;
              rs();
            },
          });
        });
        let dm_Construction_Unit = new Promise((rs) => {
          GetDataAPI({
            url: API.Construction_GetList,
            action: (re) => {
              Para.dm_Construction_Unit.data = re;
              rs();
            },
          });
        });
        let dm_Lighting_Group = new Promise((rs) => {
          GetDataAPI({
            url: API.Lighting_Group_GetList,
            action: (re) => {
              Para.dm_Lighting_Group.data = re;
              rs();
            },
          });
        });
        let hangsx = new Promise((rs) => {
          GetDataAPI({
            url: API.Hangsx_GetList,
            action: (re) => {
              Para.dm_Hangsx.data = re;
              rs();
            },
          });
        });
        let dm_coulumn = new Promise((rs) => {
          GetDataAPI({
            url: API.Column_type_GetList,
            action: (re) => {
              Para.dm_Column_Type.data = re;
              rs();
            },
          });
        });
        let dm_Managem = new Promise((rs) => {
          GetDataAPI({
            url: API.Management_team_GetList,
            action: (re) => {
              Para.dm_Management_team.data = re;
              rs();
            },
          });
        });
        let dm_Route_cabinet = new Promise((rs) => {
          GetDataAPI({
            url: API.Route_cabinet_GetList,
            action: (re) => {
              Para.dm_Route_cabinet.data = re;
              rs();
            },
          });
        });
        let dm_Commune = new Promise((rs) => {
          GetDataAPI({
            url: API.Commune_GetList,
            action: (re) => {
              Para.dm_Commune.data = re;
              rs();
            },
          });
        });
        let dm_Routes = new Promise((rs) => {
          GetDataAPI({
            url: API.Routes_GetList,
            action: (re) => {
              Para.dm_Routes.data = re;
              rs();
            },
          });
        });
        let Cable_type_id = new Promise((rs) => {
          GetDataAPI({
            url: API.Cable_type_GetList,
            action: (re) => {
              Para.dm_Cable_type.data = re;
              rs();
            },
          });
        });
        let dm_Route_Cable = new Promise((rs) => {
          GetDataAPI({
            url: API.Route_Cable_GetList,
            params: {
              iRoute_Cabinet_id: "",
            },
            action: (re) => {
              Para.dm_Route_Cable.data = re;
              rs();
            },
          });
        });

        let account = new Promise((rs) => {
          GetDataAPI({
            url: API.Account_GetList,
            action: (re) => {
              Para.Para_Account.data = re;
              // Para.Para_Account_purchasing.data = re.filter(
              //     (p) => p.UserLevel_id == "2"
              // );
              // console.log(Para.Para_Account.data);
              rs();
            },
          });
        });
        Promise.all([
          dm_Lighting_Group,
          hangsx,
          dm_Route_cabinet,
          dm_Construction_Unit,
          dm_coulumn,
          Country,
          dm_Managem,
          account,
          Cable_type_id,
          dm_Route_Cable,
          dm_Routes,
          dm_Commune,
        ]).then((result) => {
          rs();
        });
      });
    },
    InitStuff() {
      return new Promise((rs) => {
        Promise.all([this.InitMenu(), this.InitPara()]).then((result) => {
          rs();
        });
      });
    },

    // checkAllowLocation() {
    //   navigator.permissions
    //     .query({ name: "geolocation" })
    //     .then(function (permissionStatus) {
    //       console.log("Quyền truy cập vị trí:", permissionStatus.state);

    //       if (permissionStatus.state != "granted") {
    //        ShowMessage("Trình duyệt")
    //       }

    //       // Theo dõi nếu quyền thay đổi
    //       permissionStatus.onchange = function () {
    //         console.log(
    //           "Quyền truy cập vị trí thay đổi thành:",
    //           permissionStatus.state
    //         );
    //       };
    //     });
    // },
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
