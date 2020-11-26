<template>
  <div v-loading.body="loading" class="app-container calendar-list-container">
    接口名称：<el-input
      v-model="input_name"
      placeholder="请输入内容"
    ></el-input>
    请求类型：<el-input
      v-model="input_type"
      placeholder="请输入内容"
    ></el-input>
    请求参数：<el-input
      v-model="input_para"
      placeholder="请输入内容"
    ></el-input>
    返回参数：<el-input
      v-model="return_para"
      placeholder="请输入内容"
    ></el-input>
    接口简介：<el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea"
    >
    </el-input>
    <el-button type="primary" v-on:click="handleSubmit()">提交</el-button>
  </div>
</template>

<script>
import * as mailDetailAPI from "api/mail_detail";
import * as labelAPI from "api/mail_label";
import { parseTime } from "utils/index";
import * as inboxAPI from "api/inbox";

export default {
  data() {
    return {
      textarea: "",
      input_name: "",
      input_type: "",
      return_para: "",
      input_para: "",
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      this.getList();
    },
    getList() {
      this.loading = true;
      this.mailId = this.$route.params.mailId || this.$store.getters.mailId;
      if (!this.mailId) {
        this.$router.push("/");
      }
      if (this.mailId != -1) {
        this.mailType = this.$store.getters.mailType;
        const query = { mailId: this.mailId, mailType: this.mailType };
        mailDetailAPI.fetchDetail(query).then((res) => {
          console.log(res.data);
          for (var i in res.data) {
            if (i.id == this.mailId) {
              var current = i;
            }
            console.log(i.id);
          }

          this.loading = false;
          this.input_name = res.data.title;
          this.input_type = res.data.sendName;
          this.input_para = res.data.target[0].mail;
          this.return_para = res.data.target[0].name;
          this.textarea = res.data.receiveDate;
        });
      } else {
        this.loading = false;
      }
    },
    handleSubmit() {
      inboxAPI
        .modify(
          this.mailId,
          this.input_name,
          this.input_type,
          this.input_para,
          this.return_para,
          this.textarea
        )

        .then(() => {
          this.$router.push({ path: "/inbox/index" });
        });
    },
  },
};
</script>

<style>
.tool-bar {
  margin-top: -20px;
  margin-left: -20px;
}

.mail-info {
  background-color: #eff2f7;
}

.mail-info div {
  font-size: 14px;
  margin: 4px;
}

.mail-info .el-tag {
  margin-right: 6px;
}

.title-info {
  padding: 2px 5px;
}

.mail-title {
  font-size: 18px;
  vertical-align: -3px;
}

.detail-mark-star {
  font-size: 18px;
  vertical-align: -3px;
  color: #f08a5d;
  cursor: pointer;
}

.label-item {
  margin-left: 5px;
}

.info-tag {
  margin-left: inherit;
}

.target-board {
  display: inline-block;
}

.send-name,
.target-name {
  color: #1fab89;
  font-weight: 600;
}

.el-collapse-item__header {
  height: 30px;
  line-height: 30px;
  padding-left: 0;
  color: #20a0ff;
  font-size: 13px;
}

.el-collapse-item__content {
  padding: 2px;
}
</style>
