<template>
  <div class="error-wrapper">
    <div class="error-card">
      <div class="error-circle">
        <span>401</span>
      </div>
      <h2>Unauthorized Access</h2>
      <p class="error-message" v-html="err_message"></p>
      <a href="/" class="home-button">
        <i class="fa fa-arrow-left"></i>
        Quay về trang chủ
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$bg-color: #1e1e2f;
$accent-color: #ff6b6b;
$text-light: #f1f1f1;
$text-muted: #ccc;

.error-wrapper {
  background-color: $bg-color;
  color: $text-light;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.error-card {
  background-color: #2c2c3e;
  border-radius: 16px;
  padding: 40px 30px;
  max-width: 700px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.error-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: $accent-color;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  font-weight: bold;
  margin: 0 auto 20px;
  color: #fff;
}

h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

.error-message {
  font-size: 18px;
  color: $text-muted;
  margin-bottom: 30px;
}

.home-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: $accent-color;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darken($accent-color, 10%);
  }
}
</style>

<script>
import { $auth } from "~/plugins/auth";
export default {
  layout: "blank",
  data() {
    return {
      err_message: localStorage.err_message,
    };
  },
  mounted() {
    // debugger;
    this.err_message = localStorage.err_message;
    if (localStorage.err_message) {
      $auth.logout();
    } else {
      this.$router.push("/");
    }
  },
};
</script>
