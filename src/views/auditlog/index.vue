<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">

      <el-button
        v-waves
        type="danger"
        class="filter-item"
        @click="handleDelete"
      >删除</el-button>

      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 240px"
        class="filter-item"
        placeholder="审计日志编码"
        v-model="listQuery.logId"
      >
      </el-input>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 250px"
        class="filter-item"
        placeholder="操作类型"
        v-model="listQuery.type"
      >
      </el-input>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 80px"
        class="filter-item"
        placeholder="调用单位"
        v-model="listQuery.name"
      >
      </el-input>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 150px"
        class="filter-item"
        placeholder="证书号"
        v-model="listQuery.certification_id"
      >
      </el-input>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px"
        class="filter-item"
        placeholder="所用接口"
        v-model="listQuery.interface_"
      >
      </el-input>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 80px"
        class="filter-item"
        placeholder="执行结果"
        v-model="listQuery.status"
      >
      </el-input>


      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="search"
        @click="handleFilter"
        >搜索</el-button
      >
    </div>

    <el-table
      :key="tableKey"
      :data="list"
      ref="multipleTable"
      @sort-change="customSort"
      @selection-change="handleSelectionChange"
      v-loading.body="listLoading"
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="selection" min-width="30px"> </el-table-column>

      <el-table-column
        align="left"
        label="审计日志编码"
        min-width="100px"
      >
        <template scope="scope">
          <span>{{ scope.row.logId}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="left"
        label="操作类型"
        min-width="160px"
      >
        <template scope="scope">
          <span>{{ scope.row.type}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="left"
        label="调用单位/应用"
        min-width="160px"
      >
        <template scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="left"
        label="证书号"
        min-width="100px"
      >
        <template scope="scope">
          <span>{{ scope.row.certification_id}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="所用接口"
        min-width="50px"
        :show-overflow-tooltip="true"
      >
        <template scope="scope">
          <span>{{ scope.row.interface}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="调用者IP"
        min-width="80px"
        :show-overflow-tooltip="true"
      >
        <template scope="scope">
          <span>{{ scope.row.ip_address}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="left"
        label="调用时间"
        min-width="80px"
      >
        <template scope="scope">
          <span>{{ scope.row.date | parseTime("{y}-{m}-{d} {h}:{i}")}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="执行结果"
        width="100px"
        :show-overflow-tooltip="true"
      >
        <template scope="scope">
          <span>{{ scope.row.status}}</span>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as outboxAPI from "api/outbox";
import * as auditLogAPI from "api/auditlog";
import * as labelAPI from "api/mail_label";
import { getType } from "utils/validate";
import { parseTime } from "utils";

export default {
  name: "outbox",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,

        logId: undefined,
        type: undefined,
        name: undefined,
        certification_id: undefined,
        interface_: undefined,
        status: undefined, 

        title: undefined,
        receciveName: undefined,
        receciveMail: undefined,
        sort: "",
        order: "",
      },
      multipleSelection: [],
      tableKey: 0,
      labelList: [],
    };
  },
  created() {
    this.initPage();
  },
  filters: {
    showReceiveName(receiveList) {
      let nameStr = "";
      receiveList.forEach((item) => (nameStr += item.name + ";"));
      return nameStr;
    },
  },
  methods: {
    initPage() {
      this.getList();
      this.getLabelList();
    },
    getList() {
      this.listLoading = true;
      auditLogAPI.fetchList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    getLabelList() {
      labelAPI.fetchList().then((res) => {
        this.labelList = res.data.labelList;
      });
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    customSort(sortObj) {
      this.listQuery.sort = sortObj.prop;
      this.listQuery.order = sortObj.order;
      this.getList();
    },
    timeFilter(time) {
      if (!time[0]) {
        this.listQuery.start = undefined;
        this.listQuery.end = undefined;
        return;
      }
      this.listQuery.start = parseInt(+time[0] / 1000);
      this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000);
    },
    goToDetail(id, date) {
      console.log(id);
      this.$store.commit("SET_DATE", date);
      this.$store.commit("SET_CERTIFICATIONID", id);
      this.$router.push({ path: "/certification_detail/index" });
    },
    edit() {
      const selectedLen = this.multipleSelection.length || 0;
      if (selectedLen !== 1) {
        this.$message("请选择一封邮件进行编辑");
        return;
      }
      this.$store.commit("SET_MAIL_ID", this.multipleSelection[0].id);
      this.$store.commit("SET_PAGE_TYPE", "edit");
      this.$store.commit("SET_MAIL_TYPE", "send");
      this.$router.push({ path: "/mail_send/index" });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete() {
      const selectedLen = this.multipleSelection.length || 0;
      if (selectedLen == 0) {
        this.$message("请选择一条审计日志");
        return;
      }
      this.$confirm("是否删除这" + selectedLen + "条审计日志?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const idArr = [];
          this.multipleSelection.forEach((item) => idArr.push(item.logId));
          auditLogAPI.delSendMail(idArr).subscribe({
            next: () => {
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 2000,
              });
              this.getList();
            },
            error: () =>
              this.$message({
                showClose: true,
                message: "删除失败,请稍后再试",
                type: "error",
              }),
          });
        })
        .catch(() => {
          this.$message("操作已取消");
        });
    },
    handleDownload() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("vendor/Export2Excel");
        const tHeader = ["收件人", "主题", "发送时间"];
        const filterVal = ["receiveList", "title", "sendDate"];
        const data = this.formatJson(filterVal, this.list);
        export_json_to_excel(
          tHeader,
          data,
          parseTime(Date.now()) + "发件箱数据"
        );
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (~j.indexOf("Date")) {
            return parseTime(v[j]);
          } else if (getType(v[j]) === "Array") {
            let str = "";
            v[j].forEach((item) => (str += item.name + "<" + item.mail + ">;"));
            return str;
          } else {
            return v[j];
          }
        })
      );
    },
    toggleStar(row) {
      const idArr = [];
      if (row) {
        idArr.push(row.id);
      } else {
        const selectedLen = this.multipleSelection.length || 0;
        if (selectedLen < 1) {
          this.$message("请选择邮件进行标记");
          return;
        }
        this.multipleSelection.forEach((item) => idArr.push(item.id));
      }
      labelAPI.toggleStar(idArr).subscribe({
        next: () => {
          if (row) {
            row.isStar = !row.isStar;
          } else {
            this.multipleSelection.forEach((item) => (item.isStar = true));
          }
        },
      });
    },
    handleMark(labelId) {
      if (labelId === "star") {
        this.toggleStar();
      } else {
        const selectedLen = this.multipleSelection.length || 0;
        if (selectedLen < 1) {
          this.$message("请选择邮件进行标记");
          return;
        }
        const idArr = [];
        this.multipleSelection.forEach((item) => idArr.push(item.id));
        labelAPI.markLabel(labelId, idArr).subscribe({
          next: () => this.getList(),
        });
      }
    },
  },
};
</script>

<style>
</style>
