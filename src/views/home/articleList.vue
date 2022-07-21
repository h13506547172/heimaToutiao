<template>
  <div class="article-page">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <!-- offset 表示触底距离 -->
      <van-list
        :immediate-check="false"
        offset="0"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <articleItem
          v-for="item in newsList"
          :key="item.art_id"
          :obj="item"
        ></articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { newsListAPI } from '@/api/index'
import articleItem from './articleItem.vue'
export default {
  components: {
    articleItem
  },
  data() {
    return {
      newsList: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  props: {
    id: {
      type: [Number, String]
    }
  },
  async created() {
    try {
      // 发送请求获取最新的文章列表数据
      const res = await newsListAPI(this.id, +new Date())
      // console.log(res)
      // 获取上一组数据的时间戳
      this.pre_timestamp = res.data.data.pre_timestamp
      this.newsList = res.data.data.results
      // console.log(this.pre_timestamp)
    } catch (error) {
      const status = error.response.status
      if (status === 400) {
        console.log(error.response.data.message)
      } else {
        this.$toast.fail('请求失败，请刷新重试')
      }
    }
  },
  methods: {
    async onLoad() {
      try {
        // 模拟错误
        // if (Math.random() < 0.5) {
        //   throw new Error('xxxx')
        // }
        // 发送请求获取最新的文章列表数据
        const res = await newsListAPI(this.id, this.pre_timestamp)
        // console.log(res)
        // 如果后端返回null时间戳就结束
        if (!res.data.data.pre_timestamp) {
          this.finished = true
        }
        // 获取上一组数据的时间戳
        this.pre_timestamp = res.data.data.pre_timestamp
        this.newsList.push(...res.data.data.results)
      } catch (error) {
        // 发生错误就设置底部错误语句
        this.error = true
      } finally {
        // finally不管是成功还是失败都会触发里面的语句
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        // 模拟错误
        // if (Math.random() < 0.5) {
        //   throw new Error('xxxx')
        // }
        // 发送请求获取最新的文章列表数据
        const res = await newsListAPI(this.id, this.pre_timestamp)
        // console.log(res)
        // 获取上一组数据的时间戳
        this.pre_timestamp = res.data.data.pre_timestamp
        this.newsList.unshift(...res.data.data.results)
      } catch (error) {
        // 发生错误就设置顶部刷新语句
        this.error = true
      } finally {
        this.refreshing = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-page {
  padding-bottom: 100px;
}
</style>
