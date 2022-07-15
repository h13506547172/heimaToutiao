<template>
  <div>
    <router-view></router-view>
    <!-- 底部tabbar  route路由模式，按to属性来实现高亮 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/ ">
        <template #icon>
          <i class="iconfont icon-shouye"></i>
        </template>
        <p>首页</p>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video">
        <template #icon>
          <i class="iconfont icon-shipin"></i>
        </template>
        <p>视频</p>
      </van-tabbar-item>
      <van-tabbar-item replace to="/qa">
        <template #icon>
          <i class="iconfont icon-wenda"></i>
        </template>
        <p>问答</p>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my">
        <template #icon>
          <i class="iconfont icon-wode"></i>
        </template>
        <p>我的</p>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
}
/deep/ .van-tabbar {
  .iconfont {
    font-size: 40px;
  }
}
</style>
