<template>
  <div class="home-page">
    <!--  顶部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button type="default" round>
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
      <span class="iconfont icon-gengduo"></span>
    </van-tabs>
  </div>
</template>

<script>
import articleList from './articleList.vue'
import { getChannelsAPI } from '@/api/index'
export default {
  components: {
    articleList
  },
  data() {
    return {
      active: 0,
      userChannel: []
    }
  },
  methods: {
    async getUserChannel() {
      try {
        const res = await getChannelsAPI()
        this.userChannel = res.data.data.channels
      } catch (err) {
        this.$toast.fail('获取用户列表失败')
      }
    }
  },
  created() {
    this.getUserChannel()
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
}
</style>
