<template>
  <van-popup
    v-model="show"
    position="bottom"
    :style="{ height: '95%' }"
    :closeable="true"
    close-icon-position="top-left"
  >
    <div class="main">
      <!-- 我的频道 -->
      <div class="top-box">
        <!-- 我的频道标题 -->
        <van-cell title="我的频道">
          <template>
            <van-button
              round
              size="small"
              class="redact-btn"
              @click="iconShow = !iconShow"
              >编辑</van-button
            >
          </template>
        </van-cell>
        <!-- 我的频道主体部分 -->
        <van-grid :gutter="10">
          <van-grid-item
            :text="item.name"
            v-for="(item, index) in myChannel"
            :key="item.id"
            :class="{ cur: item.name === '推荐' }"
            @click="passId(item, index)"
          >
            <template #icon>
              <van-icon name="cross" v-if="iconShow && item.name !== '推荐'" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <!-- 推荐频道标题 -->
        <van-cell title="推荐频道"></van-cell>
        <!-- 推荐频道主体部分 -->
        <van-grid :gutter="10">
          <van-grid-item
            :text="item.name"
            icon="plus"
            v-for="item in elseChannels"
            :key="item.id"
            @click="passChannel(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { AllChannelsAPI } from '@/api/index'
export default {
  computed: {
    // filter返回一个新数组，return true的item会push到新数组中
    elseChannels() {
      return this.allChannels.filter((obj) => {
        // some：只要有这一项存在在myChannel数组中就返回true
        const tf = this.myChannel.some((item) => {
          return obj.id === item.id
        })
        return !tf
      })
    }
  },
  data() {
    return {
      // 控制弹出层
      show: false,
      iconShow: false,
      allChannels: []
    }
  },
  props: {
    myChannel: {
      type: Array,
      require: true
    }
  },
  methods: {
    // 获取其他频道列表
    async getAllChannels() {
      const res = await AllChannelsAPI()
      // console.log(res)
      this.allChannels = res.data.data.channels
    },
    // 子向父传值，并移除项
    passId(item, index) {
      // 处于编辑状态
      if (this.iconShow && item.name !== '推荐') {
        this.$emit('filterArr', item.id)
        this.getAllChannels()
      } else if (!this.iconShow) {
        // 不处于编辑状态就跳转到这个标签
        this.$emit('changeCur', index)
        const closeBtn = document.querySelector(
          '.van-popup__close-icon--top-left'
        )
        closeBtn.click()
      }
    },
    // 点击推荐频道按钮，添加到我的频道
    passChannel(channel) {
      // 传递频道最好先进行浅拷贝
      this.$emit('addChannel', { ...channel })
      // this.getAllChannels()
    }
  },
  created() {
    this.getAllChannels()
  }
}
</script>

<style lang="less" scoped>
.cur {
  /deep/ .van-grid-item__text {
    color: red !important;
  }
}

.main {
  padding-top: 100px;
  .top-box {
    .redact-btn {
      border-color: red;
      width: 1.38667rem;
      height: 0.64rem;
    }
    /deep/ .van-grid-item__content {
      background-color: #eee;
    }
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          z-index: 2;
          width: 30px;
          height: 30px;
          font-size: 30px;
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 30px;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    /deep/ .van-grid-item__content {
      background-color: #eee;
    }
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
