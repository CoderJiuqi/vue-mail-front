<template>
  <div class="app-container">
    <div class="wrapper">
      <el-row>
        <el-col :span="12" :offset="6">
          <p>这是一个基于Vue的业务信息交换系统</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="6">
          <img
            class="welcome-img"
            src="https://rulifun.oss-cn-hangzhou.aliyuncs.com/vue-mail/welcome.gif"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped>
.app-container {
  color: #fff;
  background-color: rgb(97, 195, 248);
}
</style>
