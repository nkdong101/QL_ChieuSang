<template>
  <GmapMap
    :center="{ lat: 40.7128, lng: -74.006 }"
    :zoom="12"
    style="width: 100%; height: 400px"
  >
    <GmapMarker :position="{ lat: 40.7128, lng: -74.006 }" />
  </GmapMap>
</template>

<script>
export default {
  name: "MapView",
};
</script>
