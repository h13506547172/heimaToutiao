<template>
  <div class="search-page">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        class="searchIpt"
        background="#3296fa"
        v-model="iptVal"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="showSearchSuggest"
      />
    </form>
    <!-- 搜索历史/建议/结果 -->
    <component
      :is="componentName"
      :iptVal="iptVal"
      :ResultList="ResultList"
      :q="iptVal"
      @clickSearch="clickSearchFn"
    ></component>
  </div>
</template>

<script>
import searchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'
import searchSuggest from './components/searchSuggest.vue'
import { resultAPI } from '@/api/index'
import { setItem, getItem } from '@/utils/localStorage'

export default {
  computed: {
    componentName() {
      // 如果里面内容为空就显示历史
      if (this.iptVal.trim() === '') {
        return 'searchHistory'
      }
      // 变量控制搜索结果
      if (this.searchResultShow) {
        return 'searchResult'
      }
      return 'searchSuggest'
    }
  },
  components: {
    searchHistory,
    searchResult,
    searchSuggest
  },
  data() {
    return {
      iptVal: '',
      searchResultShow: false,
      // 搜索结果列表
      ResultList: [],
      historyList: getItem() || []
    }
  },
  methods: {
    // resultAPI 获取搜索结果
    async getResult(q) {
      try {
        const res = await resultAPI(q)
        // console.log(res)
        this.ResultList = res.data.data.results
      } catch (error) {
        this.$toast.fail('获取搜索结果失败')
      }
    },
    // 按下回车触发搜索事件，还有手机小键盘中的搜索
    async onSearch() {
      await this.getResult(this.iptVal)
      this.searchResultShow = true
      // 存储历史到本地,并进行去重
      this.historyList.unshift(this.iptVal)
      // console.log(this.historyList)
      this.historyList = [...new Set(this.historyList)]
      setItem('SEARCH_HIS', this.historyList)
    },
    onCancel() {
      this.$router.go(-1)
    },
    // 当选中输入框时如果结果不为空就显示搜索建议
    showSearchSuggest() {
      // 让结果不显示，那就是历史和建议二选一
      this.searchResultShow = false
    },
    // 点击搜索建议触发
    clickSearchFn(val) {
      this.iptVal = val
      this.onSearch()
    }
  }
}
</script>

<style lang="less" scoped>
.search-page {
  background-color: #f5f5f9;
  height: 1334px;
}
.searchIpt {
  .van-search__action {
    color: #fff;
  }
}
</style>
