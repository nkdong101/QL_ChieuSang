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
    <div
      ref="containerMap"
      class="container-map"
      :class="{ expanded: isExpandedSearch }"
    >
      <div class="autocomplete">
        <GmapAutocomplete
          ref="autocomplete"
          @place_changed="setPlace"
          placeholder="Search for a place"
        />
        <i ref="search" class="el-icon-search" @click="expandInputSearch" />
      </div>

      <GmapMap
        ref="gmap"
        :center="initCenter"
        @click="updateMarkerPosition"
        :zoom="zoom"
        style="width: 100%; height: 400px"
      >
        <GmapMarker :position="position" />
        <GmapPolyline :path="polylinePath" :options="polylineOptions" />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import { EventBus } from "~/assets/scripts/EventBus";
import { ShowMessage } from "~/assets/scripts/Functions";
import Location from "~/assets/scripts/objects/menu/Location";

export default {
  props: {
    value: {},
  },
  name: "MapView",
  data() {
    return {
      isExpandedSearch: false,
      isLoaded: false,
      zoom: 8,
      position: {},
      initCenter: {},
      mapOptions: {
        mapTypeControl: false,
        // draggableCursor: "grab",
        // draggingCursor: "grabbing",
      },
      polylinePath: [
        // { lat: 37.772, lng: -122.214 },
        // { lat: -27.467, lng: 153.027 },
      ],
      polylineOptions: {
        // strokeColor: "",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      },
    };
  },

  watch: {
    position(nv, ov) {
      this.$emit("input", {
        Lat: nv.lat,
        Lng: nv.lng,
      });
      // this.reverseGeocode(nv.lat, nv.lng);
    },
  },
  methods: {
    reverseGeocode(lat, lng) {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat: lat, lng: lng };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            const address = results[0].formatted_address;
            const inputEl = this.$el.querySelector(".autocomplete input");
            inputEl.value = address;
            EventBus.$emit("changePosition", address);
          } else {
            console.warn("No results found");
          }
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    },
    expandInputSearch() {
      this.isExpandedSearch = !this.isExpandedSearch;

      this.$nextTick(() => {
        const inputEl = this.$el.querySelector(".autocomplete input");
        // inputEl.value = "";
        if (inputEl && this.isExpandedSearch) {
          inputEl.focus();
        }
      });
    },
    // directions() {
    //   const directionsService = new google.maps.DirectionsService();

    //   directionsService.route(
    //     {
    //       origin: { lat: 20.706298419442177, lng: 105.84199060712479 }, // Điểm đầu
    //       destination: { lat: 20.70385555723024, lng: 105.84651231765747 }, // Điểm cuối
    //       travelMode: "DRIVING",
    //     },
    //     (response, status) => {
    //       if (status === "OK") {
    //         const route = response.routes[0];
    //         const path = route.overview_path.map((latlng) => ({
    //           lat: latlng.lat(),
    //           lng: latlng.lng(),
    //         }));

    //         // set polyline path here
    //         this.polylinePath = path;
    //       } else {
    //         console.error("Directions request failed due to " + status);
    //       }
    //     }
    //   );
    // },
    handlePlaceChange(data) {
      // console.log("handlePlaceChange", data);
      this.position = data;
      this.initCenter = data;
    },
    updateMarkerPosition(event) {
      this.isExpandedSearch = false;
      this.position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      this.reverseGeocode(event.latLng.lat(), event.latLng.lng());
    },

    setPlace(re) {
      console.log(re);

      if (!re.geometry) return;

      this.position = {
        lat: re.geometry.location.lat(),
        lng: re.geometry.location.lng(),
      };
      this.initCenter = this.position;
    },
  },
  mounted() {
    // console.log(navigator.geolocation);
    this.$nextTick(() => {
      console.log("this.value", this.value);
      // this.directions();
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

            this.initCenter = new Location({
              lat: 21.0277644,
              lng: 105.8341598,
            });
            this.zoom = 5;
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
    this.isLoaded = true;

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
.container-map {
  position: relative;

  .autocomplete {
    position: absolute;
    z-index: 99999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: white;
    top: 9px;
    right: 60px;
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    input {
      background-color: inherit;
      outline: none !important;
      border: none !important;
      padding: 0;
      box-shadow: none;
      font-size: 16px;
      margin: 0;
      width: 0px;
      // opacity: 0;
      transition: all 0.4s ease;
    }
    i {
      cursor: pointer;
      font-size: 20px;
      margin-right: 1px;
      color: black;
      // padding: 0 8px;
    }
  }
  &.expanded {
    input {
      width: 200px;

      opacity: 1;
    }
  }
}

// .gm-style {
//   cursor: pointer !important;
// }
</style>
