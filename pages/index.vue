<template>
  <div ref="autocompleteContainer" class="autocomplete-wrapper"></div>
</template>

<script>
export default {
  name: "PlaceAutocomplete",
  mounted() {
    this.initAutocomplete();
  },
  methods: {
    async initAutocomplete() {
      // Kiểm tra xem Google Maps đã sẵn sàng chưa
      if (!window.google || !google.maps || !google.maps.importLibrary) {
        console.error("Google Maps chưa được load hoặc thiếu API key");
        return;
      }

      // Import thư viện "places" mới
      const { PlaceAutocompleteElement } = await google.maps.importLibrary(
        "places"
      );

      // Tạo Web Component
      const autocomplete = new PlaceAutocompleteElement();

      // Đặt placeholder hoặc các thuộc tính khác
      autocomplete.setAttribute("placeholder", "Nhập địa chỉ...");

      // Gắn vào DOM
      this.$refs.autocompleteContainer.appendChild(autocomplete);

      // Lắng nghe sự kiện chọn địa điểm
      autocomplete.addEventListener(
        "gmpx-placeautocomplete-placechange",
        () => {
          const place = autocomplete.value;
          console.log("Địa điểm được chọn:", place);

          // Emit dữ liệu ra ngoài nếu cần
          this.$emit("place-selected", place);
        }
      );
    },
  },
};
</script>

<style scoped>
.autocomplete-wrapper {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
}
</style>
