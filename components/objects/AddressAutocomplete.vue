<template>
  <el-input
    ref="autocompleteInput"
    id="autocomplete"
    v-model="address"
    placeholder=""
    @keydown.enter.native.prevent="handleEnter"
    @input.native="handleChange"
    @blur="handleBlur"
  />
</template>

<script>
import { EventBus } from "~/assets/scripts/EventBus";

export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    // propLocation: {},
  },
  watch: {
    value(newValue) {
      this.address = newValue;
    },
    address(newValue) {
      console.log("newValue", newValue);
      this.$nextTick(() => {
        this.$emit("input", newValue);
      });
    },
  },
  data() {
    return {
      address: "",
      autocomplete: null,
      isSimulating: false,
    };
  },
  mounted() {
    // console.log(this.value);
    if (this.value) {
      this.address = this.value;
    }
    // this.address = this.value;
    this.initAutocomplete();
    setTimeout(() => {
      this.observePacItems();
    }, 500);
  },
  methods: {
    handleChange() {
      this.observePacItems();
    },
    handleBlur() {},
    changePosition(address) {
      // console.log("changePO", address);
      this.address = address;
    },
    initAutocomplete() {
      // Get the actual <input> element inside el-input
      const input = this.$refs.autocompleteInput.$el.querySelector("input");

      this.autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["geocode"],
      });

      this.autocomplete.addListener("place_changed", () => {
        // console.log("place_changed");
        const place = this.autocomplete.getPlace();
        console.log("place", place);
        let pos = {
          lat: place.geometry?.location.lat(),
          lng: place.geometry?.location.lng(),
        };

        // console.log("pos", pos);
        EventBus.$emit("placeChange", pos);
        this.address = place.formatted_address || "";
        // console.log("Selected place:", this.address);
      });
    },
    /**
    Auto select first on enter
     * 1. Simulate ArrowDown key press to open the dropdown
     * 2. Wait for the dropdown to open (using $nextTick)
     * 3. Simulate Enter key press to select the first item in the dropdown
     */
    handleEnter() {
      if (this.isSimulating) return;

      const input = this.$refs.autocompleteInput.$el.querySelector("input");
      this.isSimulating = true;

      const downArrow = new KeyboardEvent("keydown", {
        key: "ArrowDown",
        keyCode: 40,
        which: 40,
        bubbles: true,
      });
      input.dispatchEvent(downArrow);

      this.$nextTick(() => {
        const enterKey = new KeyboardEvent("keydown", {
          key: "Enter",
          keyCode: 13,
          which: 13,
          bubbles: true,
        });
        input.dispatchEvent(enterKey);
        this.isSimulating = false;
      });
      // setTimeout(() => {

      // }, 100);
    },

    // UI select first of dropdown
    observePacItems() {
      const pacContainer = document.querySelectorAll(".pac-container");
      const visiblePacContainers = Array.from(pacContainer).filter((el) => {
        return window.getComputedStyle(el).display !== "none";
      });

      const currentContainer = visiblePacContainers[0];
      // console.log("currentContainer", currentContainer);
      if (pacContainer.length === 0) {
        // console.log9;
        console.log("No pac-container found");
        return;
      }
      const observer = new MutationObserver(() => {
        const pacItems = currentContainer.querySelector(".pac-item");
        // console.log("pacItems", pacItems);
        if (pacItems) {
          pacItems.classList.add("my-custom-class");
        }
      });

      // const currentContainer = document.querySelector(".pac-container");
      if (currentContainer) {
        observer.observe(currentContainer, {
          childList: true,
          subtree: true,
        });
      }
      // else {
      //   // Retry until the container exists
      //   const interval = setInterval(() => {
      //     const pacContainer = document.querySelectorAll(".pac-container");
      //     const currentContainer = pacContainer[pacContainer.length - 1];
      //     if (currentContainer) {
      //       clearInterval(interval);
      //       observer.observe(currentContainer, {
      //         childList: true,
      //         subtree: true,
      //       });
      //     }
      //   }, 100);
      // }
    },
  },

  beforeMount() {
    EventBus.$on("changePosition", this.changePosition);
  },
  beforeDestroy() {
    EventBus.$off("changePosition", this.changePosition);
  },
};
</script>
