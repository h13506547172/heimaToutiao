<template>
  <div class="suggest-page">
    <van-cell
      v-for="(item, index) in curSuggestionList"
      :key="index"
      @click="passFn(item)"
    >
      <template #icon>
        <van-icon name="search" />
      </template>
      <template #title>
        <span v-html="item" ref="text"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { suggestionAPI } from '@/api/index'
export default {
  data() {
    return {
      suggestionList: [],
      // 防抖
      timer: null
    }
  },
  props: {
    iptVal: {
      type: String || Number,
      require: true
    }
  },
  watch: {
    // 当输入的值发生变化就获取搜索建议
    iptVal: {
      // 创建组件的时候就要监视变化
      immediate: true,
      handler() {
        window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          this.getSuggestion(this.iptVal)
        }, 500)
      }
    }
  },
  methods: {
    async getSuggestion(val) {
      try {
        const res = await suggestionAPI(val)
        // console.log(res)
        this.suggestionList = res.data.data.options
        if (this.suggestionList[0] === null) {
          this.suggestionList = []
        }
      } catch (error) {
        console.log(error)
      }
    },
    passFn(val) {
      // 通过正则匹配去掉html标签
      val = val.replace(/<[^>]*>|<\/[^>]*>/gm, '')
      console.log(val)
      this.$emit('clickSearch', val)
    }
  },
  computed: {
    // 关键词高亮的数组
    curSuggestionList() {
      // map返回一个新数组
      return this.suggestionList.map((item) => {
        // 利用正则 + replace实现替换
        const reg = new RegExp(this.iptVal, 'gi')
        return item.replace(reg, (val) => {
          return `<span style="color: red">${val}</span>`
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.suggest-page {
  .van-icon {
    padding-top: 10px;
  }
}
</style>
