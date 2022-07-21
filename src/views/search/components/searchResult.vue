<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in ResultList" :key="item.art_id">
        <template #title>
          <span>{{ item.title }}</span>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { resultAPI } from '@/api/index'
export default {
  props: {
    ResultList: {
      type: Array,
      require: true
    },
    q: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    // resultAPI 获取搜索结果
    async getResult(q, num) {
      try {
        const res = await resultAPI(q, num)
        // console.log(res)
        if (!res.data.data.results || res.data.data.results.length === 0) {
          return (this.finished = true)
        }
        this.$parent.ResultList.push(...res.data.data.results)
        this.loading = false
      } catch (error) {
        this.$toast.fail('获取搜索结果失败')
      }
    },
    onLoad() {
      // console.log(11)
      this.page += 1
      this.getResult(this.q, this.page)
    }
  }
}
</script>

<style></style>
