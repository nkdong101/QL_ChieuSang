<template>
  <div>
    <input
      type="text"
      ref="autocompleteInput"
      placeholder="Enter address"
      class="autocomplete-input"
    />
  </div>
</template>

<script>
export default {
  name: "AddressAutocomplete",
  mounted() {
    // Wait until Google Maps is loaded
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        this.$refs.autocompleteInput,
        {
          types: ["geocode"], // or ['address']
          componentRestrictions: { country: "vn" }, // optional
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Selected place:", place);
        // You can emit or set data here
      });
    }
  },
};
</script>

<style scoped>
.autocomplete-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.autocomplete-input:focus {
  border-color: #4f46e5; /* Indigo-600 (like Tailwind) */
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}
</style>
