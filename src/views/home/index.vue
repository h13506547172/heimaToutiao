<template>
  <div class="home-page">
    <!--  顶部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button type="default" round @click="goSearch">
          <i class="iconfont icon-sousuo"></i>
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 标签页选择项 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in userChannel" :key="item.id" :title="item.name"
        ><articleList :id="item.id"></articleList
      ></van-tab>
      <!-- 汉堡按钮 -->
      <span class="iconfont icon-gengduo" @click="isShowFn"></span>
    </van-tabs>
    <!-- 汉堡弹出层 -->
    <morePopup
      ref="popup"
      :myChannel="userChannel"
      @filterArr="filterArrFn"
      @changeCur="changeCurFn"
      @addChannel="addChannelFn"
    ></morePopup>
  </div>
</template>

<script>
import articleList from './articleList.vue'
import { getChannelsAPI, delChannelsAPI, addChannelAPI } from '@/api/index'
import morePopup from './morePopup.vue'
// 引入存储频道到本地的方法
import { getChannelByLocal, setChannelByLocal } from '@/api/channels'

export default {
  computed: {
    isLogin() {
      return !!this.$store.state.userToken.token
    }
  },
  components: {
    articleList,
    morePopup
  },
  data() {
    return {
      active: 0,
      userChannel: []
    }
  },
  methods: {
    // 跳转到search
    goSearch() {
      this.$router.push('/search')
    },
    // 添加用户频道
    async addChannel(id, seq) {
      try {
        await addChannelAPI(id, seq)
      } catch (error) {
        this.$toast.fail('添加频道失败')
      }
    },
    // 删除用户频道
    async delChannel(id) {
      try {
        await delChannelsAPI(id)
      } catch (error) {
        this.$toast.fail('删除频道失败')
      }
    },
    // 获取用户频道
    async getUserChannel() {
      try {
        const res = await getChannelsAPI()
        this.userChannel = res.data.data.channels
      } catch (err) {
        this.$toast.fail('获取用户列表失败')
      }
    },
    // 显示弹出层
    isShowFn() {
      this.$refs.popup.show = true
    },
    // 筛选数组删除我的频道
    filterArrFn(id) {
      this.userChannel = this.userChannel.filter((item) => {
        return item.id !== id
      })
      // 如果处于离线状态就存到本地
      if (!this.isLogin) {
        setChannelByLocal(this.userChannel)
      } else {
        // 登录状态发请求删除
        this.delChannel(id)
      }
      this.$toast.success('删除频道成功')
    },
    // 添加我的频道
    addChannelFn(channel) {
      console.log(channel)
      this.userChannel.push(channel)
      // 如果处于离线状态就存到本地
      if (!this.isLogin) {
        setChannelByLocal(this.userChannel)
      } else {
        // 登录状态就添加
        this.addChannel(channel.id, this.userChannel.length)
      }
      this.$toast.success('添加频道成功')
    },
    // 点击汉堡中的按钮改变
    changeCurFn(index) {
      this.active = index
    }
  },
  // 第一次axios请求数据
  created() {
    // 如果本地没有数据就请求数据
    if (!this.isLogin) {
      // 本地取不到数据就发请求
      if (!getChannelByLocal()) {
        this.getUserChannel()
      } else {
        // console.log(getChannelByLocal())
        this.userChannel = getChannelByLocal()
      }
    } else {
      this.getUserChannel()
    }
  }
}
</script>

<style lang="less" scoped>
// 设置一个最小的高
.van-tab__pane {
  min-height: 1000px;
}
.home-page {
  // 头部搜索
  .navbar {
    background-color: #3296fa;
    color: #fff;
    .van-button {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
    }
    :deep(.van-nav-bar__title) {
      max-width: unset;
    }
    .van-button__text {
      color: #fff;
    }
    .van-icon-search {
      color: #fff;
    }
    .van-button--default {
      border: 0.02667rem solid #5babfb;
    }
  }
  // tab样式
  //tabs选项卡
  :deep(.van-tabs__wrap) {
    padding-right: 66px;

    .van-tabs__nav {
      padding-left: 0;
      padding-right: 0;

      /* tab标签 */
      .van-tab {
        border: 1px solid #eee;
        width: 200px;
        height: 82px;
      }

      /* tab标签下划线 */
      .van-tabs__line {
        width: 31px;
        height: 6px;
        background-color: #3296fa;
        bottom: 40px;
      }
    }
  }

  /* 字体图标 */
  .icon-gengduo {
    // 提高层级 不然触发不了点击事件
    z-index: 99;
    position: absolute;
    top: 0;
    right: 0;
    width: 66px;
    height: 82px;
    font-size: 40px;
    line-height: 82px;
    text-align: center;
    opacity: 0.6;
    border-bottom: 1px solid #eee;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 70%;
      width: 1px;
      background-image: url('~@/assets/image/gradient-gray-line.png');
    }
  }
  // 头部固定的样式
  .navbar {
    position: sticky;
    top: 0;
    left: 0;
  }
  :deep(.van-tabs__wrap) {
    position: sticky;
    top: 92px;
    left: 0;
    z-index: 99;
  }
  .toutiao-gengduo {
    position: fixed;
    top: 92px;
  }

  :deep(.van-tabs__content) {
    max-height: calc(100vh - 92px - 82px - 100px);
    overflow: auto;
  }
}
</style>
