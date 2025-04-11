<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import PrintCfg from "~/assets/scripts/base/PrintCfg";
export default {
  props: {
    model: {
      type: PrintCfg,
    },
  },
  data() {
    return {};
  },
  methods: {
    clear() {
      // this.dataprint = [];
      // localStorage.dataprint = JSON.stringify(this.dataprint);
      localStorage.removeItem("dataprint");
    },
    print() {
      //portait - landscape
      var css = `@page { size: ${this.model.layout}; }`,
        head = document.head || document.getElementsByTagName("head")[0];

      let style = document.getElementById("print-size");
      if (!style) {
        style = document.createElement("style");
        head.appendChild(style);
      }
      style.id = "print-size";
      style.type = "text/css";
      style.media = "print";

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.innerText = css;
      }
      console.log(head);
      window.onafterprint = () => {
        console.log("Print done");
        localStorage.removeItem("dataprint");
        localStorage.removeItem("dataphieu");
        window.close();
      };
      window.print();
    },
  },
  watch: {
    model(newValue, oldValue) {
      if (this.model)
        this.$nextTick(() => {
          setTimeout(() => {
            this.print();
          }, 20);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
