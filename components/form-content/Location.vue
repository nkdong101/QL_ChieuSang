<template>
  <div>
    <div class="position">
      <el-tooltip class="item" content="Vĩ độ" placement="top-start">
        <el-input
          v-model="position.lat"
          placeholder="Vĩ độ"
          disabled
        ></el-input>
      </el-tooltip>
      <el-tooltip class="item" content="Kinh độ" placement="top-start">
        <el-input
          v-model="position.lng"
          placeholder="Kinh độ"
          disabled
        ></el-input>
      </el-tooltip>
    </div>

    <GmapMap
      ref="gmap"
      :center="initCenter"
      @click="updateMarkerPosition"
      :zoom="8"
      style="width: 100%; height: 400px"
    >
      <GmapMarker :position="position" />
    </GmapMap>
  </div>
</template>

<script>
import { EventBus } from "~/assets/scripts/EventBus";
import Location from "~/assets/scripts/objects/menu/Location";

export default {
  props: {
    value: {},
  },
  name: "MapView",
  data() {
    return {
      position: {},
      initCenter: {},
      mapOptions: {
        mapTypeControl: false,
        // draggableCursor: "grab",
        // draggingCursor: "grabbing",
      },
    };
  },

  watch: {
    position(nv, ov) {
      this.$emit("input", {
        Lat: nv.lat,
        Lng: nv.lng,
      });
    },
  },
  methods: {
    handlePlaceChange(data) {
      console.log("handlePlaceChange", data);
      this.position = data;
      this.initCenter = data;
    },
    updateMarkerPosition(event) {
      this.position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    },
  },
  mounted() {
    // console.log(navigator.geolocation);
    this.$nextTick(() => {
      console.log("this.value", this.value);
      if (navigator.geolocation && !(this.value?.Lng || this.value?.Lat)) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            this.initCenter = new Location({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
            this.position = new Location({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });

            //   console.log("MapView mounted", this.position);
          },
          (err) => {
            //   console.error("Geolocation error:", err);
          }
        );
      } else {
        // alert("Geolocation is not supported by this browser.");
        this.initCenter = new Location({
          lat: this.value.Lat,
          lng: this.value.Lng,
        });
        this.position = new Location({
          lat: this.value.Lat,
          lng: this.value.Lng,
        });
      }
    });

    // this.$nextTick(() => {
    //   this.$emit("input", this.value);
    // });
  },

  beforeMount() {
    EventBus.$on("placeChange", this.handlePlaceChange);
  },
  beforeDestroy() {
    EventBus.$off("placeChange", this.handlePlaceChange);
  },
};
</script>

<style scoped lang="scss">
.position {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}
// .gm-style {
//   cursor: pointer !important;
// }
</style>
