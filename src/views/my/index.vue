<template>
  <div class="my-page">
    <div class="head">
      <!-- 登录的盒子 -->
      <div class="user-info banner" v-if="isLogin">
        <!-- 占位 -->
        <van-row></van-row>
        <!-- 展示用户信息 -->
        <van-row class="row2">
          <!-- 头像手机号 -->
          <van-col span="12">
            <van-row type="flex" justify="space-around" align="center">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />
              <span class="mob">13911111111</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row type="flex" justify="end" align="center">
              <van-button round class="codeBtn">编辑信息</van-button>
            </van-row>
          </van-col>
        </van-row>
        <!-- 头条粉丝关注获赞 -->
        <van-row class="row3">
          <van-grid :border="false">
            <van-grid-item text="头条">
              <template #icon>
                <span class="icon-num">0</span>
              </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>
                <span class="icon-num">0</span>
              </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>
                <span class="icon-num">0</span>
              </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>
                <span class="icon-num">0</span>
              </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div class="login-register banner" v-else>
        <div class="goLogin" @click="goLoginFn">
          <img src="../../assets/image/mobile.png" alt="" />
          <span>登录 / 注册</span>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- 宫格收藏历史 -->
      <van-grid column-num="2" :clickable="true">
        <van-grid-item text="收藏" class="grid">
          <template #icon>
            <span class="iconfont icon-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史" class="grid">
          <template #icon>
            <span class="iconfont icon-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 消息通知，小智同学 -->
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
      <van-button block v-if="isLogin" @click="exit">退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      // 两个取反，变成他状态的布尔值
      return !!this.$store.state.userToken.token
    }
  },
  methods: {
    exit() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否退出登录'
        })
        .then(() => {
          this.$store.commit('setUserToken', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    goLoginFn() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.my-page {
  background-color: #f5f5f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/image/banner.png') no-repeat 0 0 / cover;
}
// 用户信息的样式
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row2 {
    .van-col {
      // 因为没有高度侧轴不能居中
      height: 100%;
      .van-row {
        height: 100%;
      }
    }
  }
  .mob {
    font-size: 0.4rem;
    color: #fff;
  }
  .codeBtn {
    width: 152px;
    height: 46px;
    background-color: #ededed;
    border-radius: 23px;
    font-size: 22px;
    padding: 0;
    color: #666666;
  }
  .row3 {
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
    .van-grid-item {
      color: #fff;
      :deep(.van-grid-item__text) {
        color: #fff;
      }
    }
    .icon-num {
      font-size: 0.34667rem;
    }
  }
}
// 未登录
.login-register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .goLogin {
    width: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 132px;
    margin-bottom: 5px;
  }
  span {
    font-size: 0.37333rem;
    color: #fff;
    margin-top: 0.13333rem;
  }
}
// 主体区域
.main {
  .grid {
    color: #646566;
    // 字体图标
    .iconfont {
      font-size: 0.6rem;

      &.icon-lishi {
        color: #ffb31d;
      }
      &.icon-shoucang {
        color: #ed5253;
      }
    }
  }
  .link {
    margin: 10px 0;
  }
  /deep/ .van-button {
    color: red;
  }
}
</style>
