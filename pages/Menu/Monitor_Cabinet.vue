<template>
  <div class="container-contro">
    <div class="container-contro__tab">
      <el-tabs type="card" @tab-click="handleClick">
        <el-tab-pane label="Tủ điều khiển"
          ><CabinetTab @checkChange="treeCheckChange" :isCabinet="true"
        /></el-tab-pane>
        <el-tab-pane label="Tuyến đường"
          ><CabinetTab @checkChange="treeCheckChange" :isCabinet="false"
        /></el-tab-pane>
      </el-tabs>
    </div>
    <div class="container-contro__content">
      <GmapMap
        ref="gmap"
        :center="initCenter"
        @click="updateMarkerPosition"
        :options="mapOptions"
        :zoom="zoom"
        style="width: 100%; height: 100%"
      >
        <Marker_Info
          :position="{
            lat: resultMap.Cabinet.Location.Lat,
            lng: resultMap.Cabinet.Location.Lng,
          }"
          :active="activeInfoWindow === 'type1'"
          :type-id="resultMap.Cabinet.Type_id"
          :iconUrl="'/tudienIcon.png'"
          @click="activeInfoWindow = 'type1'"
          @close="activeInfoWindow = null"
        />

        <GmapPolyline
          :path="polylinePath_Cables.map((p) => p.Location)"
          :options="polylineOptions"
        />
        <!-- <GmapPolyline :path="polylinePath_Points" :options="polylineOptions" /> -->
        <Marker_Info
          v-for="(marker, index) in polylinePath_Points"
          :key="marker.Id"
          :position="{
            lat: marker.Location.Lat,
            lng: marker.Location.Lng,
          }"
          :type-id="marker.Type_id"
          :active="activeInfoWindow === marker.Id"
          @click="openInfoWindow(marker.Id)"
          @close="activeInfoWindow = null"
          :iconUrl="'/cotdienIcon.png'"
        />
        <Marker_Info
          v-for="(marker, index) in polylinePath_Cables"
          :key="marker.Id"
          :position="marker.Location"
          :type-id="marker.Type_id"
          :active="activeInfoWindow === marker.Id"
          @click="openInfoWindow(marker.Id)"
          :iconUrl="'/cotdienIcon.png'"
          @close="activeInfoWindow = null"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import API from "~/assets/scripts/API";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
import { Para } from "~/assets/scripts/Para";

export default {
  data() {
    return {
      zoom: 10,
      activeInfoWindow: "",
      resultMap: {
        Cabinet: {
          Location: { lat: 0, lng: 0 },
          Name: "",
          Id: 0,
        },
      },
      ToPoint: { lat: 0, lng: 0 },
      initCenter: { lat: 0, lng: 0 },
      mapOptions: {
        draggableCursor: "pointer", // Default cursor
        draggingCursor: "grabbing",
      },

      polylineOptions: {
        // strokeColor: "",
        strokeOpacity: 1.0,
        strokeWeight: 3,
        // geodesic: true,
      },

      markers: [],
    };
  },
  computed: {
    polylinePath_Cables() {
      return (this.resultMap?.Cables ?? []).flatMap((cable) => {
        return (cable.Locations ?? []).map((point, index) => ({
          Id: `${index + 1}cable`,
          Type_id: cable.Type_id,
          Location: {
            lat: point.Lat,
            lng: point.Lng,
          },
        }));
      });
    },
    polylinePath_Points() {
      if (!this.resultMap) return [];
      //   console.log("polylinePath_Points", this.polylinePath_Points);
      return this.resultMap?.Points;
    },
  },

  methods: {
    smoothZoomAndCenter(targetLatLng, finalZoom = 12) {
      const map = this.$refs.gmap.$mapObject;
      const stepDelay = 160; // ms
      const currentZoom = map.getZoom();

      // Di chuyển tới vị trí mới
      map.panTo(targetLatLng);

      // Zoom dần
      const zoomIn = () => {
        let zoom = map.getZoom();
        if (zoom < finalZoom) {
          map.setZoom(zoom + 1);
          setTimeout(zoomIn, stepDelay);
        }
      };

      if (currentZoom < finalZoom) {
        zoomIn();
      } else {
        map.setZoom(finalZoom);
        this.zoom = finalZoom;
      }
    },
    openInfoWindow(index) {
      this.activeInfoWindow = index;
    },
    resetState() {
      this.activeInfoWindow = null;
      this.resultMap = {
        Cabinet: {
          Location: { Lat: 0, Lng: 0 },
          Name: "",
          Id: 0,
        },
      };

      this.zoom = 5;
    },
    handleClick() {
      this.resetState();
    },
    GetCabinet_Map_Data(value, Id) {
      GetDataAPI({
        url: API.Get_Cabinet_Map_Data,
        params: {
          iRoute_Cabinet_id: Id,
        },
        isWait: false,
        action: (re) => {
          this.resultMap = re;
          console.log("resultMap", this.resultMap);

          this.smoothZoomAndCenter(
            { lat: re.Cabinet.Location.Lat, lng: re.Cabinet.Location.Lng },
            12
          );
        },
      });
    },
    treeCheckChange(value) {
      //   this.zoom = 7;

      this.GetCabinet_Map_Data(value, value.Id);
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

      this.activeInfoWindow = "";
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
          this.initCenter = {
            lat: 14.0583,
            lng: 108.2772,
          };

          this.zoom = 5;
        }
      );
    },
  },
  mounted() {
    this.setCurrentLocationAsInitCenter();
  },
};
</script>

<style scoped lang="scss">
.container-contro {
  display: flex;
  height: 100%;
  width: 100%;
  .container-contro__tab {
    border: 1px solid #e0e0e0;
    width: 20%;
    min-width: 300px;
    height: 100%;
    overflow: hidden;
    // height: fit-content;
    // background-color: #f5f5f5;
    // border-bottom: 1px solid #e0e0e0;
    ::v-deep .el-tabs {
      display: flex;
      height: 100%;
      flex-direction: column;
      .el-tabs__header {
        .el-tabs__nav {
          //   background-color: blue;
          width: 100%;
          display: flex;
          div {
            flex: 1;
            text-align: center;
          }
        }
      }

      .el-tabs__content {
        flex: 1;
        overflow-y: auto;
      }
    }
  }

  .container-contro__content {
    flex: 1;
  }
}
</style>
