<!-- components/CustomMarker.vue -->
<template>
  <GmapMarker
    :position="position"
    @click="handleClick"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <GmapInfoWindow
      v-if="hover || active"
      :options="{
        pixelOffset: { width: 0, height: -5 },
        disableAutoPan: true,
      }"
      @closeclick="$emit('close')"
    >
      <div>
        <strong> Loại: {{ Para.Container_Type.getName(typeId) }} </strong
        ><br /><br />
        Lat: {{ position.lat }}<br />
        Lng: {{ position.lng }}
      </div>
    </GmapInfoWindow>
  </GmapMarker>
</template>

<script>
export default {
  props: {
    position: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    typeId: {},
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    handleClick() {
      this.$emit("click", this.index ?? "type1");
    },
  },
};
</script>
