<template>
  <div class="dashboard-container">
    <div class="clearfix">
      <PanThumb style="float: left" :image="avatar">
        你的权限:
        <span class="pan-info-roles" v-for="item in roles">{{ item }}</span>
      </PanThumb>
        
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style="transform-origin: 130px 106px"
            class="octo-arm"
          ></path>
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            class="octo-body"
          ></path>
        </svg>
      </a>
      <div class="info-container">
        <span class="display_name">欢迎来到电子文件共享支撑平台</span>
        <div class="info-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PanThumb from "components/PanThumb";
import WeeklyUsing from "./weekly_using";
import { fetchUnReadList } from "api/inbox";
import countTo from "vue-count-to";
import { parseTime } from "utils/index";
export default {
  name: "dashboard",
  components: { PanThumb, WeeklyUsing, countTo },
  data() {
    return {
      chart: null,
      statisticsData: {
        inbox_count: 512,
        outbox_count: 256,
        draft_count: 128,
        month_inbox_count: 28,
        unread_mail: [],
        weekly_using: [
          { receiveCount: 40, sendCount: 21, week: "201701" },
          { receiveCount: 48, sendCount: 19, week: "201702" },
          { receiveCount: 55, sendCount: 23, week: "201703" },
          { receiveCount: 68, sendCount: 26, week: "201704" },
          { receiveCount: 52, sendCount: 21, week: "201705" },
          { receiveCount: 64, sendCount: 23, week: "201706" },
          { receiveCount: 69, sendCount: 20, week: "201707" },
          { receiveCount: 61, sendCount: 26, week: "201708" },
          { receiveCount: 78, sendCount: 32, week: "201709" },
          { receiveCount: 73, sendCount: 22, week: "2017010" },
          { receiveCount: 62, sendCount: 20, week: "2017011" },
          { receiveCount: 66, sendCount: 23, week: "2017012" },
        ],
        frequertContacts: [
          {
            name: "撸力",
            mail: "ruli@snh48.com",
            avatarUrl: "http://or7rpa0sk.bkt.clouddn.com/avatar.jpg",
          },
          {
            name: "小鞠",
            mail: "xiaoju@snh48.com",
            avatarUrl: "http://or7rpa0sk.bkt.clouddn.com/avatar.jpg",
          },
          {
            name: "啊黄",
            mail: "ahuang@snh48.com",
            avatarUrl: "http://or7rpa0sk.bkt.clouddn.com/avatar.jpg",
          },
          {
            name: "二狗",
            mail: "ergou@snh48.com",
            avatarUrl: "http://or7rpa0sk.bkt.clouddn.com/avatar.jpg",
          },
          {
            name: "大哥",
            mail: "dage@snh48.com",
            avatarUrl: "http://or7rpa0sk.bkt.clouddn.com/avatar.jpg",
          },
          {
            name: "小四",
            mail: "xiaosi@snh48.com",
            avatarUrl: "http://or7rpa0sk.bkt.clouddn.com/avatar.jpg",
          },
          {
            name: "十七",
            mail: "shiqi@snh48.com",
            avatarUrl: "http://or7rpa0sk.bkt.clouddn.com/avatar.jpg",
          },
          {
            name: "爱总",
            mail: "aizong@snh48.com",
            avatarUrl: "http://or7rpa0sk.bkt.clouddn.com/avatar.jpg",
          },
        ],
      },
      unreadList: [],
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(["name", "avatar", "email", "uid", "introduction", "roles"]),
    unreadMails() {
      return this.unreadList.slice(0, 6);
    },
  },
  methods: {
    fetchData() {
      fetchUnReadList().then((res) => {
        this.unreadList = res.data.items;
      });
    },
    toUnreadMail(id) {
      this.$store.commit("SET_MAIL_TYPE", "receive");
      this.$router.push({ path: "/mail_detail/index/" + id });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.unread-mail-emptyTitle {
  font-size: 16px;
  color: #f38181;
  padding-top: 20px;
  text-align: center;
}

.dashboard-container {
  padding: 20px 50px;
  .pan-info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }
  .info-container {
    position: relative;
    margin-left: 190px;
    height: 150px;
    line-height: 200px;
    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
    .info-wrapper {
      line-height: 40px;
      position: absolute;
      bottom: 0px;
      .info-item {
        display: inline-block;
        margin-right: 95px;
        .info-item-num {
          color: #212121;
          font-size: 24px;
          display: inline-block;
          padding-right: 5px;
        }
        .info-item-text {
          color: #727272;
          font-size: 14px;
          padding-right: 5px;
          display: inline-block;
        }
      }
    }
    .dashboard-icon {
      width: 22px;
      height: 22px;
    }
  }
  .btn-group {
    margin: 30px 36px 30px 0;
  }
  .main-dashboard-container {
    width: 100%;
    position: relative;
    border: 1px solid #dee1e2;
    padding: 0 10px;
  }
  .chart-container {
    float: left;
    position: relative;
    padding-right: 10px;
    width: 40%;
    border-right: 1px solid #dee1e2;
  }
  .unread-mail-container {
    padding: 12px 12px 0px;
    float: left;
    width: 60%;
    height: 380px;
    position: relative;
    .unread-mail- {
      &title {
        font-size: 16px;
        color: #f38181;
        letter-spacing: 1px;
        padding-left: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #dee1e2;
      }
      &more {
        color: #2c3e50;
        font-size: 12px;
        float: right;
        margin-right: 25px;
        line-height: 40px;
        &:hover {
          color: #3a71a8;
        }
      }
      &wrapper {
        padding: 0 20px 0 22px;
        .unread-mail- {
          &item {
            cursor: pointer;
            padding: 16px 8px 16px 16px;
            border-bottom: 1px solid #dee1e2;
            position: relative;
            .el-tag {
              margin: 0 3px;
            }
            &:before {
              content: "";
              height: 104%;
              width: 0px;
              background: #30b08f;
              display: inline-block;
              position: absolute;
              opacity: 0;
              left: 0px;
              top: -2px;
              transition: 0.3s ease all;
            }
            &:hover {
              &:before {
                opacity: 1;
                width: 3px;
              }
            }
          }
          &status {
            font-size: 12px;
            display: inline-block;
            color: #9b9b9b;
            padding-right: 6px;
          }
          &content {
            font-size: 13px;
            color: #2c3e50;
            &:hover {
              color: #3a71a8;
            }
          }
          &time {
            position: absolute;
            right: 16px;
            top: 16px;
            color: #9b9b9b;
          }
        }
      }
    }
  }
}
</style>
