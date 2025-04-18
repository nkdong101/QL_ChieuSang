vueI
<template>
  <div>
    <div v-if="!isMultiLocation" class="position">
      <div class="point From-point">
        <el-tooltip class="item" content="Vĩ độ" placement="top-start">
          <el-input
            clearable
            v-model="FromPoint.lat"
            placeholder="Vĩ độ"
          ></el-input>
        </el-tooltip>
        <el-tooltip class="item" content="Kinh độ" placement="top-start">
          <el-input
            clearable
            v-model="FromPoint.lng"
            placeholder="Kinh độ"
          ></el-input>
        </el-tooltip>
      </div>
      <i class="el-icon-right" style="font-size: 18px"></i>
      <div class="point To-point">
        <el-tooltip class="item" content="Vĩ độ" placement="top-start">
          <el-input
            clearable
            v-model="ToPoint.lat"
            placeholder="Vĩ độ"
          ></el-input>
        </el-tooltip>
        <el-tooltip class="item" content="Kinh độ" placement="top-start">
          <el-input
            clearable
            v-model="ToPoint.lng"
            placeholder="Kinh độ"
          ></el-input>
        </el-tooltip>
      </div>
    </div>

    <GmapMap
      ref="gmap"
      :center="initCenter"
      @click="updateMarkerPosition"
      :options="mapOptions"
      :zoom="10"
      style="width: 100%; height: 400px"
    >
      <GmapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        @rightclick="removeMarker(index)"
      />
      <GmapMarker
        v-if="!isMultiLocation"
        :position="FromPoint"
        :draggable="true"
        @dragend="onMarkerDragEnd('FromPoint', $event)"
        :icon="{ url: 'http://maps.google.com/mapfiles/kml/paddle/A.png' }"
      />
      <GmapMarker
        v-if="!isMultiLocation"
        :position="ToPoint"
        :draggable="true"
        @dragend="onMarkerDragEnd('ToPoint', $event)"
        :icon="{ url: 'http://maps.google.com/mapfiles/kml/paddle/B.png' }"
      />
      <!-- <GmapPolyline :path="[FromPoint, ToPoint]" :options="polylineOptions" /> -->
    </GmapMap>
    <div style="width: 100%; text-align: right" v-if="isMultiLocation">
      <i style="font-size: 10px">Kích chuột phải để xóa điểm đã chọn</i>
    </div>
  </div>
</template>

<script>
import { EventBus } from "~/assets/scripts/EventBus";
import Location from "~/assets/scripts/objects/menu/Location";

export default {
  props: {
    p_Obj: {},
    isMultiLocation: {},
  },
  name: "MapView",
  data() {
    return {
      clickStep: 1,
      FromPoint: {
        lat: 0,
        lng: 0,
      },
      ToPoint: { lat: 0, lng: 0 },
      initCenter: { lat: 0, lng: 0 },
      mapOptions: {
        draggableCursor: "pointer", // Default cursor
        draggingCursor: "grabbing",
      },
      polylinePath: [
        // { lat: 37.772, lng: -122.214 },
        // { lat: -27.467, lng: 153.027 },
      ],
      polylineOptions: {
        // strokeColor: "",
        strokeOpacity: 1.0,
        strokeWeight: 5,
      },

      markers: [],
    };
  },

  watch: {
    FromPoint: {
      handler(newVal) {
        this.p_Obj.From_Point.Lat = newVal.lat;
        this.p_Obj.From_Point.Lng = newVal.lng;
      },
    },
    ToPoint: {
      handler(newVal) {
        this.p_Obj.To_Point.Lat = newVal.lat;
        this.p_Obj.To_Point.Lng = newVal.lng;
      },
    },
    markers: {
      handler(newVal) {
        this.p_Obj.Locations = newVal.map((marker) => {
          return {
            Lat: marker.position.lat,
            Lng: marker.position.lng,
          };
        });
      },
      // immediate: true,
    },
  },
  methods: {
    removeMarker(index) {
      this.markers.splice(index, 1);
    },

    onMarkerDragEnd(pointKey, event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this[pointKey] = { lat, lng };

      //   console.log(`📍 Marker ${pointKey} đã được kéo đến:`, this[pointKey]);
    },
    updateMarkerPosition(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      if (this.isMultiLocation) {
        if (
          this.markers.some(
            (marker) =>
              marker.position.lat === lat && marker.position.lng === lng
          )
        ) {
          return; // Nếu đã có marker tại vị trí này, không thêm nữa
        }
        this.markers.push({
          position: { lat, lng },
        });
      } else {
        if (this.clickStep == 1) {
          this.FromPoint = { lat, lng };
          this.clickStep = 2;
        } else if (this.clickStep == 2) {
          this.ToPoint = { lat, lng };
          this.clickStep = 1;
        }
      }

      //   console.log(event);

      //   // Ví dụ: cập nhật FromPoint
      //   console.log("Updated FromPoint to:", this.FromPoint);
    },

    setPoint(key, point) {
      if (point?.Lat && point?.Lng) {
        this[key] = { lat: point.Lat, lng: point.Lng };
      }
    },
    setCurrentLocationAsInitCenter() {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.initCenter = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
        },
        (err) => {
          // Optional: handle geolocation error
          // console.error("Geolocation error:", err);
        }
      );
    },
  },
  mounted() {
    this.$nextTick(() => {
      console.log("this.value", this.p_Obj);

      if (!this.isMultiLocation) {
        this.setPoint("FromPoint", this.p_Obj?.From_Point);
        this.setPoint("ToPoint", this.p_Obj?.To_Point);

        if (
          navigator.geolocation &&
          !this.FromPoint?.lat &&
          !this.FromPoint?.lng
        ) {
          this.setCurrentLocationAsInitCenter();
        } else if (this.FromPoint?.lat && this.FromPoint?.lng) {
          this.initCenter = this.FromPoint;
        }
      } else {
        this.markers = (this.p_Obj?.Locations || []).map((location) => ({
          position: {
            lat: location.Lat,
            lng: location.Lng,
          },
        }));

        if (!this.markers.length) {
          this.setCurrentLocationAsInitCenter();
        } else {
          this.initCenter = { ...this.markers[0].position };
        }
      }
    });
  },
};
</script>

<style scoped lang="scss">
.position {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;

  .point {
    display: flex;
    // justify-content: space-between;
    gap: 10px;
  }
}
// .gm-style {
//   cursor: pointer !important;
// }
</style>
