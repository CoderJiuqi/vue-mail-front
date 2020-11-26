<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button
        v-waves
        type="danger"
        icon="delete"
        class="tool-item filter-item btn-del"
        v-on:click="handleDelete()"
      ></el-button>
      <el-button
        v-waves
        type="primary"
        class="tool-item filter-item btn-reply-all"
        v-on:click="handleModify()"
        >修改</el-button
      >
      <el-button
        v-waves
        type="primary"
        class="tool-item filter-item btn-reply-all"
        v-on:click="handleAdd()"
        >新增</el-button
      >
      <el-button
        v-waves
        type="primary"
        class="tool-item filter-item btn-reload"
        v-on:click="initPage"
      >
        <icon-svg icon-class="reload4" />
      </el-button>

      <!-- <el-dropdown
        @command="handleMark"
        split-button
        type="primary"
        menu-align="start"
        class="tool-item filter-item"
      >
        标记为
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="star">
            <icon-svg
              icon-class="favourite"
              class="download-icon"
            />星标邮件</el-dropdown-item
          >
          <el-dropdown-item
            v-for="label in labelList"
            :key="label.id"
            :command="label.id + ''"
          >
            <icon-svg icon-class="label1" class="download-icon" />{{
              label.name
            }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown> -->
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 300px"
        class="filter-item"
        placeholder="接口类型"
        v-model="listQuery.inType"
      >
      </el-input>

      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 300px"
        class="filter-item"
        placeholder="接口名称"
        v-model="listQuery.name"
      >
      </el-input>

      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 300px"
        class="filter-item"
        placeholder="返回参数"
        v-model="listQuery.return_params"
      >
      </el-input>

      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 300px"
        class="filter-item"
        placeholder="接口简介"
        v-model="listQuery.type"
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
        prop="sendName"
        sortable="custom"
        align="center"
        label="接口类型"
      >
        <template scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.sendMail"
            placement="top"
          >
            <span>{{ scope.row.sendName }}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column
        prop="title"
        sortable="custom"
        label="接口名称"
        :show-overflow-tooltip="true"
        min-width="400px"
      >
        <template scope="scope">
          <span class="link-type" @click="goToDetail(scope.row.id)">{{
            scope.row.title
          }}</span>
          <!-- <el-tag v-for="label in scope.row.labelList" :key="label.guid">{{
            label.name
          }}</el-tag> -->
        </template>
      </el-table-column>

      <el-table-column
        prop="receiveDate"
        sortable="custom"
        align="center"
        label="返回参数"
        width="150px"
      >
        <template scope="scope">
          <span>{{ scope.row.target[0].mail }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="readDate"
        sortable="custom"
        align="center"
        label="接口简介"
        width="150px"
      >
        <template scope="scope">
          <span>{{ scope.row.receiveDate }}</span>
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
import * as inboxAPI from "api/inbox";
import * as labelAPI from "api/mail_label";
import { parseTime } from "utils";

export default {
  name: "inbox",
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,

        title: undefined,
        status: undefined,
        sort: "",
        order: "",
      },
      statusOptions: [
        {
          value: "POST",
          showValue: "POST"
        },
        {
          value: "GET",
          showValue: "GET"
        },
        {
          value: "",
          showValue: "空"
        }
      ],
      typeOptions: [
        {
          value: "推送文件",
          showValue: "推送文件",
        },
        {
          value: "读取文件",
          showValue: "读取文件",
        },
        {
          value: "写入文件",
          showValue: "写入文件",
        },
        {
          value: "拉取文件",
          showValue: "拉取文件",
        },
        {
          value: "检查状态",
          showValue: "检查状态",
        },
        {
          value: "",
          showValue: "空",
        }
      ],
      multipleSelection: [],
      tableKey: 0,
      labelList: [],
    };
  },
  created() {
    this.initPage();
  },
  filters: {
    statusTypeFilter(status) {
      const statusMap = {
        0: "danger",
        1: "primary",
        2: "success",
        3: "gray",
      };
      return statusMap[status];
    },
    statusShowFilter(status) {
      const statusMap = {
        0: "未接收",
        1: "已接收",
        2: "已回复",
        3: "已接收",
      };
      return statusMap[status];
    },
  },
  methods: {
    initPage() {
      this.getList();
      this.getLabelList();
    },
    getList() {
      this.listLoading = true;
      inboxAPI.fetchList(this.listQuery).then((response) => {
        console.log(this.listQuery)
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
    goToDetail(id) {
      this.$store.commit("SET_MAIL_ID", id);
      this.$store.commit("SET_MAIL_TYPE", "receive");
      this.$router.push({ path: "/inbox_add_modify/index" });
    },
    reply(isALL) {
      const selectedLen = this.multipleSelection.length || 0;
      if (selectedLen !== 1) {
        this.$message("请选择一封邮件进行回复");
        return;
      }
      this.$store.commit("SET_MAIL_ID", this.multipleSelection[0].id);
      if (isALL) {
        this.$store.commit("SET_PAGE_TYPE", "replyAll");
      } else {
        this.$store.commit("SET_PAGE_TYPE", "reply");
      }
      this.$store.commit("SET_MAIL_TYPE", "receive");
      this.$router.push({ path: "/mail_send/index" });
    },
    forward() {
      const selectedLen = this.multipleSelection.length || 0;
      if (selectedLen !== 1) {
        this.$message("请选择一封邮件进行转发");
        return;
      }
      this.$store.commit("SET_MAIL_ID", this.multipleSelection[0].id);
      this.$store.commit("SET_PAGE_TYPE", "forward");
      this.$store.commit("SET_MAIL_TYPE", "receive");
      this.$router.push({ path: "/mail_send/index" });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDelete() {
      const selectedLen = this.multipleSelection.length || 0;
      if (selectedLen < 1) {
        this.$message("请选择邮件进行删除");
        return;
      }
      this.$confirm("是否删除这" + selectedLen + "封邮件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const idArr = [];
          this.multipleSelection.forEach((item) => idArr.push(item.id));
          inboxAPI.delReceiveMail(idArr).subscribe({
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
                message: "删除失败",
                type: "error",
              }),
          });
        })
        .catch(() => {
          this.$message("操作已取消");
        });
    },
    handleModify() {
      this.$store.commit("SET_MAIL_ID", this.multipleSelection[0].id);
      this.$router.push({ path: "/inbox_add_modify/index" });
    },
    handleAdd() {
      this.$store.commit("SET_MAIL_ID", -1);
      this.$router.push({ path: "/inbox_add_modify/index" });
    },
    handleDownload() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("vendor/Export2Excel");
        const tHeader = ["发件人", "发件邮箱", "主题", "接收时间", "阅读时间"];
        const filterVal = [
          "sendName",
          "sendMail",
          "title",
          "receiveDate",
          "readDate",
        ];
        const data = this.formatJson(filterVal, this.list);
        export_json_to_excel(
          tHeader,
          data,
          parseTime(Date.now()) + "收件箱数据"
        );
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          if (~j.indexOf("Date")) {
            return parseTime(v[j]);
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
