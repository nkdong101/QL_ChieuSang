<template>
  <div class="login-container">
    <el-card class="login-card" shadow="always">
      <div class="login-header">Hệ thống Chiếu sáng</div>

      <el-form
        :model="form"
        ref="loginForm"
        label-position="top"
        :rules="rules"
      >
        <el-form-item label="Tên tài khoản" prop="username">
          <el-input
            v-model="form.username"
            placeholder="Nhập tên tài khoản"
            size="small"
            clearable
          />
        </el-form-item>

        <el-form-item label="Mật khẩu" prop="password">
          <el-input
            v-model="form.password"
            placeholder="Nhập mật khẩu"
            size="small"
            show-password
            clearable
          />
        </el-form-item>

        <div class="forgot-password">
          <el-link type="primary" @click="onForgotPassword"
            >Quên mật khẩu?</el-link
          >
        </div>

        <el-button
          type="primary"
          @click="onLogin"
          size="small"
          class="login-btn"
          block
        >
          Đăng Nhập
        </el-button>

        <div class="divider"><span>hoặc</span></div>
        <div class="btn-social-login">
          <el-button type="danger" block size="small" @click="onGoogleLogin">
            <img
              src="/icons8-google-240.png"
              alt="Google"
              width="30"
              height="30"
              style="margin-right: 4px"
            />
            Google
          </el-button>

          <el-button type="primary" block size="small" @click="onZaloLogin">
            <img
              src="/icons8-zalo-480.png"
              alt="Google"
              width="30"
              height="30"
              style="margin-right: 4px"
            />

            Zalo
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import API from "~/assets/scripts/API";
import GetDataAPI from "~/assets/scripts/GetDataAPI";
import StoreManager from "~/assets/scripts/StoreManager";

export default {
  layout: "blank",

  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "Vui lòng nhập tài khoản",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log("Đăng nhập với:", this.form);
          // Xử lý đăng nhập ở đây
          GetDataAPI({
            url: API.Login_User,
            params: {
              username: this.form.username,
              password: this.form.password,
            },
            method: "POST",
            action: (re) => {
              // console.log(re);

              localStorage.setItem("user", JSON.stringify(re));
              console.log(re);
              localStorage.setItem("access_token", re.AccessToken);

              // StoreManager.SetHeaders({
              //   Authorization: `Bearer ${re.AccessToken}`,
              // });

              console.log(
                "Access Token:",
                localStorage.getItem("access_token")
              );

              this.$router.push("/");
            },
          });
        }
      });
    },
    onForgotPassword() {
      // this.$message.info("Tính năng này đang được cập nhật!");
    },
    onGoogleLogin() {
      location.href = "/Auth/GoogleLogin";
    },
    onZaloLogin() {
      // this.$message.success("Đăng nhập Zalo (demo)");
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px;

  .el-form {
    ::v-deep .el-form-item {
      margin-bottom: 14px;
      .el-form-item__label {
        padding: 0;
        color: black;
      }
    }
  }
}

.login-card {
  width: 100%;
  max-width: 360px;
  border-radius: 10px;
  padding: 24px 28px;
}

.login-header {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}

.forgot-password {
  text-align: right;
  margin-top: -8px;
  margin-bottom: 16px;
}

.login-btn {
  margin-bottom: 12px;
  width: 100%;

  ::v-deep span {
    /* align-items: center; */
    display: block;
    font-size: 16px;
  }
}

.divider {
  text-align: center;
  position: relative;
  margin: 10px 0;
  font-size: 13px;
  color: #999;
}

.divider::before,
.divider::after {
  content: "";
  height: 1px;
  background: #ddd;
  width: 40%;
  position: absolute;
  top: 50%;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background: #fff;
  padding: 0 10px;
  position: relative;
  z-index: 1;
}

.btn-social-login {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  /* flex-direction: column; */
  gap: 10px;
  .el-button {
    margin: 0;
    flex: 1 1 100%;
    ::v-deep span {
      /* justify-content: center; */
      align-items: center;
      font-size: 16px;
    }
  }
}
</style>
