<template>
  <div v-loading.body="loading" class="app-container calendar-list-container">
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">基本信息</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">机构名称</div></el-col>
      <el-col :span="20"><div class="grid-content bg-purple-light"><span>{{ detail.name }}</span></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">机构地址</div></el-col>
      <el-col :span="20"><div class="grid-content bg-purple-light"><span>{{ detail.address }}</span></div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">联系人</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"><span>{{ detail.contact }}</span></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">联系电话</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">{{ detail.phone }}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">传真</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">{{ detail.fax_num }}</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">email</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">{{ detail.email }} </div></el-col>
    </el-row>
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple">行业</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">{{ detail.industry }}</div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple">邮编</div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">{{detail.mail_num}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">资质信息</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple">证书号</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">证书有效日期</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">资质认定部门</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">证书状态</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><div class="grid-content bg-purple-light">{{detail.certification_id}}</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">{{date | parseTime(('{y}-{m}-{d} {h}:{i}'))}}</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">{{detail.certification_ins}}</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">{{detail.status}}</div></el-col>
    </el-row>
  </div>
</template>

<script>
import * as certification_detailAPI from 'api/certification_detail';
import * as labelAPI from 'api/mail_label';
import { parseTime } from 'utils/index';

export default {
  name: "certification_detail",
  data() {
    return  {
      // detail: {
      //   name: 'xx'
      // },
      date: null,
      detail: null,
      detailLoading: true,
      detailQuery: {
        certificationId: undefined,
      }
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      this.getDetail();
    },
    getDetail() {
      this.detailLoading = true;
      this.detailQuery.certificationId = this.$store.getters.certificationId;
      this.date = this.$store.getters.date;
      certification_detailAPI.fetchDetail(this.detailQuery).then((response) => {
        this.detail = response.data.detail;
        console.log(response.data.detail);
        this.detailLoading = false
      });
    }
  }

};
</script>


<style>
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  /* .el-col {
    border-radius: 4px;
  } */
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align: center;
    line-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .align-center{ 
    margin:0 auto; /* 居中 这个是必须的，，其它的属性非必须 */ 
    text-align:center; /* 文字等内容居中 */ 
  } 
</style>