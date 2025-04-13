import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA27Sthxj_Y5mbC2A4XpxUWHa7hn84NO1k",
    libraries: "places", // or other libraries if needed
  },
});
