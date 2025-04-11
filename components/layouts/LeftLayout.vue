<template>
  <div class="ll-main">
    <div class="menu-Logo">
      <img src="/Image/iconWebManageNau.png" alt="" />
    </div>
    <!-- .slice(0, amountItem) -->
    <el-scrollbar ref="scrl" wrap-class="scrollbar-wrapper" style="flex: 1">
      <NuxtLink
        v-for="item in menu.slice(0, amountItem)"
        :key="item.index"
        :to="item.path ? item.path : '/Menu/' + item.index"
        :class="{ 'menu-link': true, active: active == item.index }"
      >
        <div @click="Hanlde(item.index)" class="menu-c">
          <div class="menu-c-i">
            <img v-if="item.image" :src="Para.MenuImage.getImage(item.image)" />
            <i v-else :class="item.icon || 'fa fa-server'"></i>
          </div>
          <div class="menu-c-t">{{ item.title }}</div>
        </div>
      </NuxtLink>

      <el-popover
        v-show="amountItem < menu.length"
        placement="right"
        width="400"
        trigger="hover"
        popper-class="more-link-pp"
      >
        <div class="more-link">
          <NuxtLink
            v-for="item in menu.slice(amountItem, menu.length)"
            :key="item.index"
            :to="item.path ? item.path : '/Menu/' + item.index"
            :class="{ 'menu-link': true, active: active == item.index }"
          >
            <div @click="Hanlde(item.index)" class="menu-c">
              <div class="menu-c-i">
                <img
                  v-if="item.image"
                  :src="Para.MenuImage.getImage(item.image)"
                />
                <i v-else :class="item.icon || 'fa fa-server'"></i>
              </div>
              <div class="menu-c-t">{{ item.title }}</div>
            </div>
          </NuxtLink>
        </div>
        <div slot="reference" class="menu-link more">
          <div class="menu-c">
            <div class="menu-c-i">
              <i :class="'el-icon-more'"></i>
            </div>
            <!-- <div class="menu-c-t">{{ "" }}</div> -->
          </div>
        </div>
      </el-popover>

      <!-- <div>{{ menu }}</div> -->
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amountItem: 0,
      active: 0,
    };
  },
  computed: {
    menu() {
      return this.$store.state.menu;
    },
  },
  methods: {
    Hanlde(i) {
      this.active = i;
      console.log(this.active, i);
    },
    childrenHeight() {
      let t = 0;
      var app = this;
      this.amountItem = 0;

      for (let i = 0; i < this.menu.length; i++) {
        t += 83;

        if (t < app.$refs.scrl.$el.offsetHeight - 43) {
          this.amountItem++;
        } else {
          break;
        }
      }

      console.log("this.amountItem", this.amountItem);
    },
  },
  mounted() {
    this.childrenHeight(); // Tính chiều cao ban đầu
  },
  beforeMount() {
    window.addEventListener("resize", this.childrenHeight);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.childrenHeight);
  },
};
</script>

<style lang="scss" scoped>
// @import "@/assets/css/variable.scss";
.ll-main {
  flex: 0 0 90px;
  overflow: hidden;
  background: #f0f0f0;
  // border-right: 1px solid #ddd;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .menu-Logo {
    display: flex;
    justify-content: center;
    // border-bottom: 1px solid #ddd;
    height: 45px;
    img {
      height: 100%;
    }
  }
  ::v-deep .scrollbar-wrapper {
    overflow: hidden;
    margin: 0 !important;
    .el-scrollbar__view {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
  }

  .menu-link.active {
    .menu-c {
      background: rgb(255, 255, 255);
      // transition: all 0.3s ease;
      .menu-c-i {
        padding-bottom: 5px;
        height: 29px;
        line-height: 29px;
        i {
          font-size: 22px;
          width: 20px;
          height: 20px;
          // background: linear-gradient(to right, #0000ff, #ff0000);
          // -webkit-background-clip: text;
          // -moz-background-clip: text;
          // background-clip: text;
          // -webkit-text-fill-color: transparent;
          // ::before {
          //   display: inline;
          // }
        }
      }
    }
    &::before {
      width: 3px;

      background-color: rgb(20, 148, 246);
    }
  }
  .menu-link {
    box-sizing: border-box;
    text-decoration: unset;
    color: black;
    // text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 0;
      height: 30%;
      background-color: black;
      left: 2px;
      border-radius: 50px;
    }

    &:hover::before {
      width: 3px;
      transition: all 0.3s ease;
    }
    .menu-c {
      display: flex;
      justify-content: center;
      justify-items: center;
      flex-direction: column;
      text-align: center;
      // height: 55px;
      border-radius: 15px;
      // border: 1px solid gray;
      width: 90%;
      padding: 5px 0;
      cursor: pointer;
      &:hover {
        background: rgb(255, 255, 255);
      }

      .menu-c-i {
        padding-bottom: 5px;
        height: 29px;
        line-height: 29px;
        i {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }
        img {
          width: 24px;
          height: 24px;
        }
      }
      .menu-c-t {
        height: 34px;
        font-size: 13px;
      }
    }
  }
}

.more-link-pp {
  .more-link {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 5px;
    .menu-link.active {
      .menu-c {
        outline: 1px solid rgb(20, 148, 246);
        // background-color: ;
      }
    }
    .menu-link {
      box-sizing: border-box;
      text-decoration: unset;
      color: black;
      justify-content: center;
      align-items: center;
      width: 80px;
      position: relative;
      // &::before {
      //   content: "";
      //   position: absolute;
      //   width: 0;
      //   height: 30%;
      //   background-color: black;
      //   left: 2px;
      //   border-radius: 50px;
      // }

      // &:hover::before {
      //   width: 3px;
      //   transition: all 0.3s ease;
      // }
      .menu-c {
        border-radius: 10px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        // height: 55px;
        padding: 10px 0px;
        cursor: pointer;
        &:hover {
          background: rgb(242, 242, 242);
        }

        .menu-c-i {
          padding-bottom: 5px;
          height: 29px;
          line-height: 29px;
          i {
            font-size: 20px;
            width: 20px;
            height: 20px;
          }
          img {
            width: 24px;
            height: 24px;
          }
        }
        .menu-c-t {
          height: 34px;
          font-size: 13px;
          word-break: break-word;
        }
      }
    }
  }
}

::v-deep .el-scrollbar .el-scrollbar__bar {
  display: none;
}
</style>
