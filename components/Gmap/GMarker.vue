<template>
  <GmapMarker
    :position="{
      lat: Location.Lat,
      lng: Location.Lng,
    }"
  />
</template>

<script>
export default {
  props: {
    Location: {},
  },
  name: "MapView",
  data() {
    return {};
  },

  watch: {
    Location: {
      handler(newVal) {
        this.position = newVal;
      },
    },
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped lang="scss"></style>
