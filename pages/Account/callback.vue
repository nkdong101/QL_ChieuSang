<template>
  <div class="loading-overlay">
    <div class="loading-box">
      <div class="spinner"></div>
      <p>Đang đăng nhập...</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.loading-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  font-size: 1.2rem;
}

.spinner {
  width: 100px;
  height: 100px;
  border: 12px solid #ccc;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
import API from "~/assets/scripts/API";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
import StoreManager from "~/assets/scripts/StoreManager";
import { $auth } from "~/plugins/auth";
export default {
  layout: "blank",
  mounted() {
    let code = new URLSearchParams(location.search).get("code");
    let error = new URLSearchParams(location.search).get("error");
    if (code) {
      console.log(code);
      StoreManager.SetHeaders({
        redirect_uri: location.origin + location.pathname,
        // Authorization: `Bearer ${re.access_token || this.access_token}`,
        // Identity: this.user.email,
        // SourceAuth: location.origin,
      });
      GetDataAPI({
        url: API.Login_Email,
        method: "post",
        params: {
          code: code,
        },
        action: (re) => {
          $auth.access_token = re.access_token;
          $auth.identity = re.email;
          StoreManager.SetHeaders({
            Authorization: `Bearer ${re.access_token}`,
            Identity: re.email,
            SourceAuth: location.origin,
          });
          // $auth.userinfo().then(() => {
          this.$router.push("/");
          // });
        },
        error: (error) => {
          localStorage.err_message = error;
          this.$router.push("/Account/Unauthorized");
        },
      });
      // $auth.processCallback(code).then(() => {
      //   // this.$router.push("/");
      // });
    } else if (error) {
      localStorage.err_message = error;
      this.$router.push("/Account/Unauthorized");
    } else {
      this.$router.push("/");
    }
  },
};
</script>
