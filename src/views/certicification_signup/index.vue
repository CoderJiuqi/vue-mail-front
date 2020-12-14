<template>
  <div class="login-container">
    <div class="wrapper">
      <el-form ref="vform" :model="form" label-width="100px">
        <el-col :span="24" style="margin-bottom: 14px">
          <div class="grid-content bg-purple-dark">基本信息</div>
        </el-col>
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="机构地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="联系人">
              <el-input v-model="form.contact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系电话">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="传真">
              <el-input v-model="form.fax_num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="行业">
              <el-input v-model="form.industry"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="邮编">
              <el-input v-model="form.mail_num"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选择上传认证客户端</el-button
            >
          </el-upload>
        </el-row>

        <el-col :span="24" style="margin-bottom: 14px">
          <div class="grid-content bg-purple-dark">资质信息</div>
        </el-col>
        <el-row>
          <el-col :span="11">
            <el-form-item label="证书号">
              <el-input v-model="form.cnum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="证书截止日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="资质认定部门">
          <el-input v-model="form.cname"></el-input>
        </el-form-item>

        <el-form-item label="证书状态">
          <el-checkbox-group v-model="form.status">
            <el-checkbox label="有效" name="type"></el-checkbox>
            <el-checkbox label="过期" name="type"></el-checkbox>
            <el-checkbox label="审核中" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交申请</el-button>
          <el-button @click="cancle">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      form: {
        name: "",
        address: "",
        contact: "",
        phone: "",
        fax_num: "",
        email: "",
        industry: "",
        mail_num: "",
        cnum: "",
        cname: "",
        date1: "",
        status: [],
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      isRouterAlive: true,
      timer: undefined,
      fileList: [],
    };
  },
  methods: {
    handleChange() {
      this.fileList;
    },
    clearForm() {
      (this.form.name = ""),
        (this.form.address = ""),
        (this.form.contact = ""),
        (this.form.phone = ""),
        (this.form.fax_num = ""),
        (this.form.email = ""),
        (this.form.industry = ""),
        (this.form.mail_num = ""),
        (this.form.cnum = ""),
        (this.form.cname = ""),
        (this.form.date1 = ""),
        (this.form.status = []);
    },
    onSubmit() {
      this.$confirm("是否提交这条申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            message: "申请提交成功",
            type: "success",
            duration: 2000,
          });
          this.clearForm();
        })
        .catch(() => {
          this.$message("操作已取消");
        });
    },
    cancle() {
      this.$message({
        message: "已清空表单",
        type: "warning",
        duration: 2000,
      });
      this.clearForm();
    },
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
.wrapper {
  padding: 20px;
  background: white;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 5px;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  line-height: 36px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.login-container {
  @include relative;
  height: 100vh;
  background-color: #2d3a4b;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  // input {
  //   background: transparent;
  //   border: 0px;
  //   -webkit-appearance: none;
  //   border-radius: 0px;
  //   padding: 12px 5px 12px 15px;
  //   color: #eeeeee;
  //   height: 47px;
  // }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
  }

  // .el-form-item {
  //   border: 1px solid rgba(255, 255, 255, 0.1);
  //   background: rgba(0, 0, 0, 0.1);
  //   border-radius: 5px;
  //   color: #454545;
  // }

  .forget-pwd {
    color: #fff;
  }
}
</style>
