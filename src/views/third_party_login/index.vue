<template>
  <div class="login-container">
    <el-form
      autoComplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="card-box login-form"
    >
      <h3 class="title">第三方应用证书认证</h3>
      <el-form-item prop="email1">
        <el-input
          name="email1"
          type="text"
          v-model="loginForm.email1"
          placeholder="请输入单位名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email2">
        <el-input
          name="email2"
          type="text"
          v-model="loginForm.email2"
          placeholder="请输入第三方应用名称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email3">
        <el-input
          name="email3"
          type="text"
          v-model="loginForm.email3"
          placeholder="请输入认证证书名称"
        ></el-input>
      </el-form-item>
      <el-steps
        :active="active"
        process-status="error"
        finish-status="success"
        align-center="true"
      >
        <el-step title="已有信息，未插入key"></el-step>
        <el-step title="已检测到相应key"></el-step>
      </el-steps>
      <el-button
        style="margin-top: 12px; text-align: center; margin-bottom: 20px"
        @click="next"
        >检测</el-button
      >
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100%"
          :loading="loading"
          @click.native.prevent="handleLogin"
        >
          提交认证
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { isEmail } from "utils/validate";
// import { getQueryObject } from 'utils';
import socialSign from "./socialsignin";

export default {
  components: { socialSign },
  name: "login",
  data() {
    return {
      loginForm: {
        email1: "",
        email2: "",
        email3: "",
        password: "",
      },
      active: 1,
      loading: false,
      showDialog: false,
    };
  },
  computed: {
    ...mapGetters(["auth_type"]),
  },
  methods: {
    next() {
      if (this.active++ > 1) this.active = 0;
    },
    handleLogin() {
      this.$message("你的认证请求正在被处理，请稍候");
      setTimeout(function () {
        alert("你的证书认证结果： 有效");
        location.reload();
      }, 3000);
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1);
      // const hashObj = getQueryObject(hash);
      // const originUrl = window.location.origin;
      // history.replaceState({}, '', originUrl);
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // };
      // const codeName = hashObj[codeMap[this.auth_type]];
      // if (!codeName) {
      //   alert('第三方登录失败');
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' });
      //   });
      // }
    },
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan);
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan);
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}
.login-container {
  @include relative;
  height: 100vh;
  background-color: #2d3a4b;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: #eeeeee;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: #eeeeee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .forget-pwd {
    color: #fff;
  }
}
</style>
