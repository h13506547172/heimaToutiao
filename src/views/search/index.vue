<template>
  <div>
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
    <component :is="componentName" :iptVal="iptVal"></component>
  </div>
</template>

<script>
import searchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'
import searchSuggest from './components/searchSuggest.vue'

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
      searchResultShow: false
    }
  },
  methods: {
    // 按下回车触发搜索事件，还有手机小键盘中的搜索
    onSearch(val) {
      console.log(val)
      this.searchResultShow = true
    },
    onCancel() {
      this.$router.go(-1)
    },
    // 当选中输入框时如果结果不为空就显示搜索建议
    showSearchSuggest() {
      // 让结果不显示，那就是历史和建议二选一
      this.searchResultShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.searchIpt {
  .van-search__action {
    color: #fff;
  }
}
</style>
